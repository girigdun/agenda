import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, UserResponse } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { cpf, email, phone, password } = req.body;

    try {
      const user = await repository.findOne({
        where: [{ cpf }, { email }, { phone }],
      });

      if (!user) {
        return res.sendStatus(401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.sendStatus(401);
      }

      const userResponse: UserResponse = user;
      delete userResponse.password;

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' }); // 'secret' apenas para teste, nao usar em PRODUCAO!!!
      return res.json({
        userResponse,
        token,
      });
    } catch {
      return res.sendStatus(400);
    }
  }
}

export default new AuthController();
