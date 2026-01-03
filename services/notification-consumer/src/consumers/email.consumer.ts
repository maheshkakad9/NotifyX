import type { Channel, ConsumeMessage, GetMessage } from "amqplib";
import { sendEmail } from "../providers/email.provider.js";
import { logger } from "../utils/logger.js";
import { handleRetry } from "../utils/retry.js";

export const startEmailConsumer = async (channel: Channel) => {

    const processMessage = async (msg: ConsumeMessage | GetMessage | null) => {
        if (!msg) return;

        const data = JSON.parse(msg.content.toString());
        logger(`Processing Job | Priority: ${data.priority}`);

        try {
            await sendEmail("maheshkakad5678@gmail.com", data.content);

            channel.ack(msg as any);
            logger("Notification sent successfully");
        } catch (err: any) {
            logger("Job Failed -> Retrying...", err.message);
            await handleRetry(msg);
        }
    };

    channel.consume(process.env.HIGH_QUEUE!, (msg) => processMessage(msg as ConsumeMessage));

    setInterval(async () => {
        const msg = await channel.get(process.env.LOW_QUEUE!, {});
        if (msg) processMessage(msg as GetMessage);
    }, 200);
};