import express from 'express';
import { register, login, createCourse, courseDelete, coursePut, allCourse } from './controller.js';

const router = express.Router();

router.post('/register', register)
      .post('/login', login)
      .post('/create',  createCourse)
      .delete('/delete/:id',  courseDelete)
      .put('/put/:id',  coursePut)
      .get('/get', allCourse);

export default router;
