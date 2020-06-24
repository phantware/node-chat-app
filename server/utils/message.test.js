const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store response in variable
    const from = 'Jamiu';
    const text = 'some message';
    const message = generateMessage(from, text);
    //assert from matches
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });

    //assert that createdAt is      a number
  });
});
