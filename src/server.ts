import express from 'express';
import './database';
import { routes } from './router';


const app = express();

app.use(express.json())
app.use(routes);

app.listen(3333, () => console.log("Server has been initializated 🚀"));