const { startLoading, stopLoading, log, clear, post } = require('./utilitys.js');
const { AI } = require('./ai.js');

const message = async (_client, _message) => {
  if (_message.author.bot) return;

  const data = {
    author: _message.author,
    username: _message.author.username,
    channel: _message.channel,
  };

  const messageContent = _message.content.toLowerCase().trim();
  if (!messageContent.startsWith('locke')) {
    log(`${_message.author.username}: ${_message.content}`);
    return;
  }

  const args = messageContent.slice(6).trim().split(' ');
  data.message = args.join(' ');

  if (args.length === 0) {
    data.message = "I can't hear you!";
  } else if (args[0] === 'restart') {
    await rp(_message, data);
  } else {
    await rp(_message, data);
  }
};

async function rp(_message, _data) {
  _data.channel.sendTyping();
  const response = await AI(_data);
  if (response) {
    _message.channel.send(response);
  }
}

module.exports = { message };