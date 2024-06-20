import express from "express";
import router from "./router/bookingRouter.js";
import cors from "cors";
import { ConnectDb } from "./db/connection.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

ConnectDb();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port} ✅`);
});
