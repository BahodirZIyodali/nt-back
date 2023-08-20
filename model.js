import { dataFetcher } from "./utils/db.js";

const login = `SELECT * FROM users WHERE email = $1;`;
const register = `INSERT INTO users( email,user_password,role) VALUES ($1, $2, $3 );`;
const userRoleQuery = 'SELECT role FROM users WHERE user_id = $1';
const putCourse = `
INSERT INTO courses (category, davomiylik, darslar_soni, title, description, image_src, admin_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
`;
const deleteCourse = 'DELETE FROM courses WHERE id = $1';
const getAllCourses = 'SELECT * FROM courses';
const insertCourse = `
INSERT INTO courses (category, davomiylik, darslar_soni, title, description, image_src, admin_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
`;

const userLogin = (...params) => dataFetcher(login, params);
const userRegister = (...params) => dataFetcher(register, params);
const AdminUser = (...params) => dataFetcher(userRoleQuery, params);
const Post = (...params) => dataFetcher(insertCourse, params);
const Put = (...params) => dataFetcher(putCourse, params);
const Delete = (id) => dataFetcher(deleteCourse, [id]);
const Get = () => dataFetcher(getAllCourses);

export {
    userLogin,
    userRegister,
    AdminUser,
    Put,
    Get,
    Delete,
    Post
};
