const { Producer } = require('sqs-producer');
const uuid = require('uuid').v4;
const faker = require('faker');
 
const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/228842016694/packages',
  region: 'us-west-1'
});

let entry = {
  orderId: uuid(),
  customer: faker.name.findName(),
  vendorId: 'https://sqs.us-west-2.amazonaws.com/228842016694/vendor',
}

setInterval( async() => {

  try {
    const message = {
      id: uuid(),
      body: JSON.stringify(entry),
    }
    
    const response = await producer.send(message)
    console.log(response);
  } catch(e) {
    console.error(e);
  }
}, 5000);