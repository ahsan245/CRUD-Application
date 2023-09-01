const amqp = require('amqplib/callback_api');

exports.producer = (request) => {
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

      // Publish the request message to the queue
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(request)));
      console.log('User creation Request sent to queue:', request);

      // Close the connection after a timeout (adjust as needed)
      setTimeout(() => {
        connection.close();
        
      }, 1000);
    });
  });
};
