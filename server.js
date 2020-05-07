const express = require('express');

const server = express();
server.use(logger);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(`Log, ${req.method} to ${req.orginalUrl} on ${(uuid.v4(), msg)}`);
	next();
}

module.exports = server;
