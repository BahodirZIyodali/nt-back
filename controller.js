import { sign } from "./utils/jwt.js";
import bcrypt from 'bcrypt'
import { AdminUser, Delete, Post, Get, userLogin, userRegister, Put } from './model.js'

const register = async (req, res) => {
  try {
    const { user_password, email, role } = req.body;

    const hashedPassword = await bcrypt.hash(user_password, 10);

    const user_id = await userRegister(email, hashedPassword, role);

    return res.json({
      token: sign({ user_id }),
      status: 'ok',
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const login = async (req, res) => {
  try {
    const { email, user_password } = req.body;
    const allUser = await userLogin(email);
    const foundUser = allUser.find((e) => e.email === email);

    if (foundUser) {
      const match = await bcrypt.compare(user_password, foundUser.user_password);
      if (match) {
        return res.json({
          token: sign({
            user_id: foundUser.user_id,
          }),
          status: "ok",
        });
      }
    }
    res.status(401).send("Unauthorized");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createCourse = async (req, res) => {
  try {
    const { category, davomiylik, darslarSoni, title, description, imageSrc, admin_id } = req.body;

    const result = await Post(category, davomiylik, darslarSoni, title, description, imageSrc, admin_id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const coursePut = async (req, res) => {
  try {
    const { category, davomiylik, darslarSoni, title, description, imageSrc, admin_id } = req.body;

    const insertedCourse = await Put(category, davomiylik, darslarSoni, title, description, imageSrc, admin_id);

    res.status(201).json({ message: 'Course created successfully', insertedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const courseDelete = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await Delete(id))
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const allCourse = async (_, res) => {
  try {
    res.json(await Get());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export { login, register, coursePut, allCourse, courseDelete, createCourse };
