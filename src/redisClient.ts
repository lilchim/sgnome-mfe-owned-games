// src/redisClient.ts
import Redis from 'ioredis';

// Client for publish usage
export const redisPub = new Redis({
    host: 'localhost', // Your Redis server host
    port: 6379,        // Your Redis server port
    // password: 'your_password', // Uncomment if your Redis server requires authentication
});

// Client for subscription usage
export const redisSub = new Redis({
    host: 'localhost', // Your Redis server host
    port: 6379,        // Your Redis server port
    // password: 'your_password', // Uncomment if your Redis server requires authentication
});

// Client for normal redis usage
export const redis = new Redis({
    host: 'localhost', // Your Redis server host
    port: 6379,        // Your Redis server port
    // password: 'your_password', // Uncomment if your Redis server requires authentication
});


export default redis;