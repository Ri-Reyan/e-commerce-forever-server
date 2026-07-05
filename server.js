import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import DBconnection from "./src/Database/Dbconnection.js";

const port = process.env.PORT || 5000;
const server = http.createServer(app);
DBconnection();

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
