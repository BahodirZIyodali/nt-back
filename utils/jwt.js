import jwt from "jsonwebtoken";

const sign = (payload) => jwt.sign(payload, "efif");

const verify = (token) => jwt.verify(token, "efif");

export { sign, verify };