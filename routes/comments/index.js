const express = require('express');
const router = express.Router();

// Add a new comment
router.post('/comments', async (req, res) => {
	try {
		const comment = new Comment({
			userId: req.body.userId,
			blogId: req.body.blogId,
			comment: req.body.comment,
		});
		await comment.save();
		res.status(201).json(comment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update a comment
router.put('/comments/:id', async (req, res) => {
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
router.delete('/comments/:id', async (req, res) => {
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