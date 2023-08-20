import express from "express";
import cors from "cors";
import router from './router.js'


const PORT = 4000;
const app = express();


app.use(express.json());
app.use(cors("/*"));
app.use(router)




app.use("/*", (_, res) => res.sendStatus(404));

app.listen(PORT, console.log(PORT));