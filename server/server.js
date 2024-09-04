import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import adminRouter from "./adminRoutes/adminRoutes.js"
import bodyParser from "body-parser";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const mongodbStore = new MongoDBStore(session);



app.use(express.json());
app.use(
  session({
    store: mongodbStore({
      uri: process.env.CONNECTION_URL,
      collection: "mySessions",
    }),
    secret: "NAEMETALPRELIOBTNAVRES",
    resave: false,
    saveUninitialized: true,
    cookie: {
      
      maxAge: 7200000,
      httpOnly: true,
    },
  })
);


app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const PORT= process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server is runnine on localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err));
