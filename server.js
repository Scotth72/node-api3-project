const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use('/users', userRouter);
server.use('/posts', postRouter);

//custom middleware

function logger(req, res, next) {
	console.log(`Log, ${req.method} to ${req.orginalUrl} on ${new Date()}`);
	next();
}

module.exports = server;
