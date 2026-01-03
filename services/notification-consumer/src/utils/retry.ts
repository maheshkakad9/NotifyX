import { redis } from "./redis.js";
import { getChannel } from "../config/rabbitmq.js";
import { logger } from "./logger.js";

export const handleRetry = async (msg: any) => {
    const channel = getChannel();
    const data = JSON.parse(msg.content.toString());
    const retryKey = `retry:${data.id || data.userId}`;

    let attempts = Number(await redis.get(retryKey)) || 0;
    attempts++;

    const retryDelays = [5, 30, 120];

    if (attempts > retryDelays.length) {
        logger("Moving message to DLQ", data);
        channel.sendToQueue(process.env.DLQ_QUEUE!, Buffer.from(JSON.stringify(data)));
        await redis.del(retryKey);
        return channel.ack(msg);
    }

    const delay = retryDelays[attempts - 1];
    await redis.set(retryKey, attempts, "EX", delay * 2);

    logger(`Retry attempt ${attempts}, retry after ${delay}s`, data);

    setTimeout(() => {
        channel.sendToQueue(process.env.NOTIFY_QUEUE!, Buffer.from(JSON.stringify(data)));
        channel.ack(msg);
    }, delay * 1000);
};