import amqp from "amqplib";
import { startEmailConsumer } from "../consumers/email.consumer.js";
import { logger } from "../utils/logger.js";


let channel: amqp.Channel;

export const connectQueue = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL!);
        channel = await connection.createChannel();

        await channel.assertQueue(process.env.HIGH_QUEUE!, { durable: true});
        await channel.assertQueue(process.env.LOW_QUEUE!, { durable: true });
        await channel.assertQueue(process.env.DLQ_QUEUE!, { durable: true });

        logger("Consumer connected to RabbitMQ");
        logger("Queues Created:");
        logger(`High Queue: ${process.env.HIGH_QUEUE}`);
        logger(`Low Queue: ${process.env.LOW_QUEUE}`);
        logger(`DLQ : ${process.env.DLQ_QUEUE}`);
        startEmailConsumer(channel);

    } catch (error) {
        logger("RabbitMQ Consumer Connection Failed");
        setTimeout(connectQueue, 5000);
    }
};

export const getChannel = () => channel;