import { createClient } from "redis";
import { promisify } from "util";
import { redisConf } from "../config/config.js";

export const redisClient = createClient({
  url: redisConf.host,
  password: redisConf.pass,
  legacyMode: true,
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

export const initializeRedis = async () => {
  redisClient.on("connect", function () {
    console.log("Redis Server Connected");
  });
  redisClient.on("error", function (err) {
    console.log("Redis Connection Error " + err);
  });

  try {
    await redisClient.connect();
    console.log("Redis AUTH successful");
  } catch (err) {
    console.error("Redis AUTH failed:", err);
    process.exit(1); // Exit the application if authentication fails
  }
};

export const getValue = async (key) => {
  try {
    const value = await getAsync(key);
    return value;
  } catch (error) {
    console.error("Error getting value from Redis:", error);
    throw error;
  }
};

export const setValue = async (key, value) => {
  try {
    await setAsync(key, value);
  } catch (error) {
    console.error("Error setting value in Redis:", error);
    throw error;
  }
};

export const deleteValue = async (key) => {
  try {
    await delAsync(key);
  } catch (error) {
    console.error("Error deleting value from Redis:", error);
    throw error;
  }
};
