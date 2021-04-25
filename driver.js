'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
const { Producer } = require('sqs-producer');
const { Consumer } = require('sqs-consumer');

AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/228842016694/vendor',
  region: 'us-west-1'
});

setInterval( async() => {

  try {
    const message = {
      id: uuid(),
      body: 'In-Transit'
    }
    
    await producer.send(message)
  } catch(e) {
    console.error(e);
  }
}, 5000);

setInterval( async() => {

  try {
    const message = {
      id: uuid(),
      body: 'Delivered'
    }
    
    await producer.send(message)
  } catch(e) {
    console.error(e);
  }
}, 6000);

 
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/228842016694/packages',
  handleMessage: async (message) => {
    console.log(message.Body);
  }
});
 
app.on('error', (err) => {
  console.error(err.message);
});
 
app.on('processing_error', (err) => {
  console.error(err.message);
});
 
app.start();