/**
* @author Eneh, James Erozonachi
*
* @description entry-point (Server) of Politico Applicaction
*
* */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Routes from './routes/Routes';

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use((req, res, next) => { // https://enable-cors.org/server_expressjs.html
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
  next();
});

Routes(app);
app.listen(port, () => {
  console.log(`Live on ${port}`);
});

export default app; // for testing
