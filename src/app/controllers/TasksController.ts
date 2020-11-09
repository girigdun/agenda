import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Task } from '../models/Task';

class TaskController {
  async get(req: Request, res: Response) {
    const repository = getRepository(Task);
    const userId = req.userId;
    try {
      const tasks = await repository.find({
        select: ['id', 'name', 'startAt', 'finished', 'createdAt'],
        where: [{ userId }],
      });
      return res.json(tasks);
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }

  async getById(req: Request, res: Response) {
    const repository = getRepository(Task);
    const userId = req.userId;
    try {
      const task = await repository.findOne({
        select: ['id', 'name', 'startAt', 'finished', 'createdAt'],
        relations: ['user'],
        where: [{ id: req.params.id, userId }],
      });

      if (task) {
        return res.json(task);
      }
      {
        return res.status(404).send({ message: 'Task not found.' });
      }
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }

  async create(req: Request, res: Response) {
    const repository = getRepository(Task);
    const { name, startAt } = req.body;
    const userId = req.userId;

    try {
      const taskExists = await repository.findOne({
        where: [{ name: Like('%' + name + '%'), userId }],
      });

      if (taskExists) {
        return res.sendStatus(409);
      }

      const task = repository.create({ name, startAt, userId });
      await repository.save(task);

      const createdTask = await repository.findOne({
        select: ['id', 'name', 'startAt', 'finished', 'createdAt'],
        where: [{ id: task.id }],
      });

      return res.status(201).json(createdTask);
    } catch {
      return res.sendStatus(400);
    }
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(Task);
    const id = req.params.id;
    const { name, startAt, finished } = req.body;
    const userId = req.userId;
    try {
      const taskExists = await repository.findOne({
        where: [{ id, userId }],
      });

      if (!taskExists) {
        return res.status(404).send({ message: 'Task not found.' });
      }

      if (name) taskExists.name = name;
      if (startAt) taskExists.startAt = startAt;
      if (finished !== undefined) taskExists.finished = finished;

      const update = await repository.update({ id: taskExists.id }, taskExists);

      if (update.affected === 1) {
        const updatedTask = await repository.findOne(taskExists.id);
        return res.status(202).json(updatedTask);
      }

      return res.sendStatus(400);
    } catch {
      return res.sendStatus(400);
    }
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(Task);
    const userId = req.userId;

    try {
      const taskExists = await repository.findOne({
        where: [{ id: req.params.id, userId }],
      });

      if (!taskExists) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const task = await repository.remove(taskExists);
      return res.status(200).json(task);
    } catch {
      return res.sendStatus(400);
    }
  }
}

export default new TaskController();
