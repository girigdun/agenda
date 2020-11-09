import { Router } from 'express';
import AuthController from './app/controllers/AuthController';
import TasksController from './app/controllers/TasksController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/authMiddleware';

const router = Router();

// Auth Router
router.post('/auth', AuthController.authenticate);
// User Routeres
router.post('/users', UserController.create);
router.get('/users', authMiddleware, UserController.get);
router.get('/users/:id', authMiddleware, UserController.getById);
router.put('/users/:id', authMiddleware, UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);
// Task Routeres
router.post('/tasks', authMiddleware, TasksController.create);
router.get('/tasks', authMiddleware, TasksController.get);
router.get('/tasks/:id', authMiddleware, TasksController.getById);
router.put('/tasks/:id', authMiddleware, TasksController.update);
router.delete('/tasks/:id', authMiddleware, TasksController.delete);

export default router;
