const http = require('http');
const { startLoading, stopLoading, log, clear, post } = require('./utilitys.js');

const history = [];

const apiEndpoint = new URL('http://localhost:11434/api/chat'); // local host
const model = 'Xeoxaz'; // custom ai

const AI = async (_data) => {
  const { username, message, channel } = _data;
  const icon = channel ? '🗨️' : '📦';
  log(`${username} -> ${message}`);

  const postData = {
    model,
    stream: false,
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  };

  history.forEach((message) => {
    postData.messages.push(message);
  });

  startLoading('Generating: ');

  const options = {
    hostname: apiEndpoint.hostname,
    port: apiEndpoint.port,
    path: apiEndpoint.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, async (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', async () => {
      stopLoading('[✅] Transaction complete.\n'); // stop loading.
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        const reply = response.message.content; // generated text
        log(`Server <- ${reply}`);
        if (reply) {
          history.push(response.message); // log history
          return reply;
        } else {
          history = [];
          const payload = { username: 'Server', message: 'You apologize for not understanding.' };
          return await lol(payload);
        }
      } else {
        log(`Server <- ${res.statusMessage}`);
        return 'I was unable to compute that.';
      }
    });
  });

  req.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
  });

  req.write(JSON.stringify(postData));
  req.end();
};

module.exports = { AI };