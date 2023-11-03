import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors({origin: ['http://localhost:3000', 'http://localhost:8080'], credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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