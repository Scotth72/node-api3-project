const express = require('express');
const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
	// do your magic!
});

router.get('/:id', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
	db
		.getById(req.params.id)
		.then(() => {
			next();
		})
		.catch((err) => {
			res.status(404).json({ message: 'Error with validating the inforamtion' });
		});
}

module.exports = router;
