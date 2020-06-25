const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store response in variable
    const from = 'Akinwale';
    const text = 'some message';
    const message = generateMessage(from, text);
    //assert from matches
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });

    //assert that createdAt is      a number
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location', () => {
    const from = 'Lagos';
    const latitude = 15;
    const longitude = 19;
    const url = 'https://www.google.com/maps?q=15,19';
    const message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, url });
  });
});
