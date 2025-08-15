import * as url from "url";
import http from "http";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { initializeRedis } from "./helpers/redis.js";
import { initializeDatabaseMongo } from "./helpers/mongo.js";
import { initializeDatabaseMySQL } from "./helpers/mysql.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
global.__basedir = __dirname;

dotenv.config();
(async () => {
  await initializeRedis();
  await initializeDatabaseMongo();
  await initializeDatabaseMySQL();
})();

const app = express();
const port = process.env.PORT || 5226;
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);

// View engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
});

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

export default app;
