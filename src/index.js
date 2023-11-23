import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import axios from "axios";
import userRouter from "./routers/userRouter.js";
import dataRouter from "./routers/dataRouter.js";

dotenv.config();

const app = express();
app.use(cors({origin: ['*'], credentials: true}));
// app.use(cors({origin: ['http://localhost:3000', 'http://localhost:8080'], credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/data', dataRouter);

app.get('/', async (req, res) => {
    res.send('macha-server!');
})

app.listen(process.env.PORT || 5001, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: ${process.env.PORT || 5001}🛡️
  ################################################
`);
});