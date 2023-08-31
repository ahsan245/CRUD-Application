const amqp = require('amqplib/callback_api');

// Create a connection to RabbitMQ server
amqp.connect('amqp://localhost', (connectError, connection) => {
  if (connectError) {
    throw connectError;
  }

  // Create a channel
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    const queueName = 'user_created_queue';

    // Declare a queue
    channel.assertQueue(queueName, { durable: false });

    console.log('Waiting for messages...');

    // Consume messages from the queue
    channel.consume(queueName, (message) => {
      const response = JSON.parse(message.content.toString());
      console.log('Received message:', response);

      // Process the received response as needed
      processResponse(response);
    }, { noAck: true });
  });
});

// Function to process the received response
function processResponse(response) {
  // Implement your logic to process the response here
  // For example, you can save the response to a database, perform analytics, etc.
  console.log('Processing response:', response);
}
