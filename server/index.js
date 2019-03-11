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
import * as Constants from './helpers/Constants';
import path from 'path';

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use((req, res, next) => { // https://enable-cors.org/server_expressjs.html
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
  next();
});
app.use(express.static(`${__dirname}/doc`));

Routes(app);
// GET /api/v1/doc
app.get(`${Constants.API_BASE_URL}/doc`, (req, res) => {
  res.sendFile(path.join(`${__dirname}/doc/index.html`));
});
app.get(`/*`, (req, res) => {
  res.redirect(`${Constants.API_BASE_URL}/doc`);
});
app.listen(port, () => {
  console.log(`Live on ${port}`);
});

export default app; // for testing
