import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, UserResponse } from '../models/User';
import { testCPF, testEmail, testPhone } from '../utils/validators';

class UserController {
  async get(req: Request, res: Response) {
    const repository = getRepository(User);

    try {
      const users = await repository.find({
        select: ['id', 'cpf', 'email', 'phone', 'createdAt'],
        relations: ['tasks'],
      });
      return res.json(users);
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }

  async getById(req: Request, res: Response) {
    const repository = getRepository(User);

    try {
      const user = await repository.findOne({
        select: ['id', 'cpf', 'email', 'phone', 'createdAt'],
        relations: ['tasks'],
        where: [{ id: req.params.id }],
      });

      if (user) {
        return res.json(user);
      }
      {
        return res.status(404).send({ message: 'User not found.' });
      }
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }

  async create(req: Request, res: Response) {
    const repository = getRepository(User);
    const { cpf, email, phone, password } = req.body;

    if (!testCPF(cpf.replace('.', '').trim()))
      return res.status(400).json({ message: 'CPF invalid.' });
    if (!testEmail(email))
      return res.status(400).json({ message: 'Email invalid.' });
    if (!testPhone(phone))
      return res.status(400).json({ message: 'Phone invalid.' });

    try {
      const userExists = await repository.findOne({
        where: [{ cpf }, { email }, { phone }],
      });

      if (userExists) {
        return res.sendStatus(409);
      }

      const user = repository.create({ cpf, email, phone, password });
      await repository.save(user);

      const userResponse: UserResponse = user;
      delete userResponse.password;
      return res.status(201).json(userResponse);
    } catch {
      return res.sendStatus(400);
    }
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(User);
    const { id, cpf, email, phone } = req.body;

    try {
      const userExists = await repository.findOne({
        where: [{ id }, { cpf }, { email }, { phone }],
      });

      if (!userExists) {
        return res.status(404).send({ message: 'User not found.' });
      }

      if (!testCPF(cpf.replace('.', '').trim()))
        return res.status(400).json({ message: 'CPF invalid.' });
      if (!testEmail(email))
        return res.status(400).json({ message: 'Email invalid.' });
      if (!testPhone(phone))
        return res.status(400).json({ message: 'Phone invalid.' });

      userExists.cpf = cpf;
      userExists.email = email;
      userExists.phone = phone;

      const update = await repository.update({ id: userExists.id }, userExists);

      if (update.affected === 1) {
        const updatedUser = await repository.findOne(userExists.id);
        const userResponse: UserResponse = updatedUser as User;
        delete userResponse.password;
        return res.status(202).json(updatedUser);
      }

      return res.sendStatus(400);
    } catch {
      return res.sendStatus(400);
    }
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(User);
    const { id, cpf, email, phone } = req.body;

    try {
      const userExists = await repository.findOne({
        where: [{ id }, { cpf }, { email }, { phone }],
      });

      if (!userExists) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const user = await repository.remove(userExists);
      const userResponse: UserResponse = user;
      delete userResponse.password;
      return res.status(200).json(userResponse);
    } catch {
      return res.sendStatus(400);
    }
  }
}

export default new UserController();
