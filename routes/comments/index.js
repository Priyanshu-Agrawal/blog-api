const express = require('express');
const { Comment} = require("../../database/models");
const router = express.Router();

// Add a new comment

router.get('/', async (req, res) => {
	try {
		const comments = await Comment.find({ blogId: req.query.blogId});
		res.status(200).json(comments);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
})
router.post('/', async (req, res) => {
	try {
		const comment = new Comment(req.body);
		await comment.save();
		res.status(201).json(comment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update a comment
router.put('/:id', async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!comment) {
			return res.status(404).json({ error: 'Comment not found' });
		}
		res.status(200).json(comment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete a comment
router.delete('/:id', async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.id);
		if (!comment) {
			return res.status(404).json({ error: 'Comment not found' });
		}
		res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;