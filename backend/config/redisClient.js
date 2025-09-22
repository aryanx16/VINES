const {createClient} = require('redis')
const dotenv = require('dotenv')

dotenv.config(); // load .env

const redisclient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisclient.on("error", (err) => console.error("❌ Redis client Error:", err));

async function connectRedis() {
  if (!redisclient.isOpen) {
    await redisclient.connect();
    console.log("✅ Connected to Redis Cloud");
  }
  
}

module.exports = { redisclient, connectRedis };
