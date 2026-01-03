import amqp from "amqplib";

let channel: amqp.Channel;

export const connectQueue = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL!);
        channel = await connection.createChannel();
        // await channel.assertQueue(process.env.NOTIFY_QUEUE!);
        await channel.assertQueue(process.env.HIGH_QUEUE!, { durable: true });
        await channel.assertQueue(process.env.LOW_QUEUE!, { durable: true });
        await channel.assertQueue(process.env.DLQ_QUEUE!,{ durable: true });

        console.log("RabbitMQ Producer connected with priority queues");
    } catch (err) {
        console.log("Waiting for RabbitMQ (Producer)...");
        setTimeout(connectQueue, 5000);
    }
};

export const getChannel = () => channel;

export const publishPriorityMessage = async (msg: object, priority: "high" | "low") => {
    const queue = priority === "high" ? process.env.HIGH_QUEUE! : process.env.LOW_QUEUE!;
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent to ${queue}`);
};