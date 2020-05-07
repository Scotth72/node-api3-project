const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	console.log(req.body.name);
	userDb
		.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error, Unable to save the user' });
		});
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	const info = req.body;
	if ((info.user_id = req.params.id)) {
		postDb
			.insert(info)
			.then((posts) => {
				res.status(201).json(posts);
			})
			.catch((err) => {
				res.status(500).json({ message: 'server error with saving the post' });
			});
	}
});

router.get('/', (req, res) => {
	userDb.get().then((users) => {
		res.status(200).json(users);
	});
});

router.get('/:id', validateUserId, (req, res) => {
	userDb
		.getById(req.params.id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(400).json({ message: 'invalid user id' });
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	userDb
		.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(400).json({ message: 'Error with getting the post' });
		});
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	userDb
		.getById(req.params.id)
		.then((user) => {
			//req.user
			next();
		})
		.catch((err) => {
			res.status(400).json({ message: 'invalid user id' });
		});
}

function validateUser(req, res, next) {
	const info = req.body;
	if (info) {
		if (info.name) {
			next();
		} else {
			res.status(400).json({ message: 'missing user data' });
		}
	} else {
		res.status(400).json({ message: 'missing required name field' });
		console.log(req.body);
	}
}

function validatePost(req, res, next) {
	const info = req.body;
	if (info) {
		if (info.text) {
			next();
		} else {
			res.status(400).json({ message: 'missing post data' });
		}
	} else {
		res.status(400).json({ message: 'missing required text field' });
	}
}

module.exports = router;
