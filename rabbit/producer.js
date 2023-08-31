const amqp = require("amqplib");
const queueIds = ["products", "orders", "notifications"]; // Add more queue IDs as needed

const items = [
  {
    item_id: "rabitmq",
    text: "This is a sample message to send receiver to check the ordered Item Availability",
  },
  {
    item_id: "item2",
    text: "This is a sample message for item 2",
  },
  {
    item_id: "item1",
    text: "This is a sample message for item 1",
  },
];

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost:5672");

    for (const id of queueIds) {
      const channel = await connection.createChannel();
      await channel.assertQueue(id, { durable: false });

      for (const item of items) {
        channel.sendToQueue(id, Buffer.from(JSON.stringify(item)));
        console.log(` [x] Sent '${JSON.stringify(item)}' to queue '${id}'`);
      }

      await channel.close();
    }
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();