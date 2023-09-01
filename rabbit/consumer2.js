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
      const request = JSON.parse(message.content.toString());
      console.log('Received message:', request );

      // Process the received request as needed
      processrequest (request,queueName );
    }, { noAck: true });
  });
});

// Function to process the received request
function processrequest(request,queueName) {
  // Implement your logic to process the request  here
  // For example, you can save the request  to a database, perform analytics, etc.
  console.log(queueName,'Processing Request:', request );
}
