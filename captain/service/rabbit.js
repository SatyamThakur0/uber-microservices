import amqp from "amqplib";
let connection, channel;
import dotenv from "dotenv";
dotenv.config();
const RABBITMQ_URL = process.env.RABBIT_MQ_URL;

export const connectToRabbitMQ = async () => {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
};

export const subscribeToQueue = async (queue, callback) => {
    if (!channel) await connectToRabbitMQ();
    await channel.assertQueue(queue);
    channel.consume(queue, async (msg) => {
        await callback(msg.content.toString());
        channel.ack(msg);
    });
};

export const publishToQueue = async (queue, data) => {
    if (!channel) await connectToRabbitMQ();
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
};
