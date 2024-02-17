const express = require('express');
const router = express.Router();
const {Blog} = require("../../database/models");

// Fetch all blogs
router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.find();
		res.status(200).json(blogs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Fetch a blog by ID
router.get('/:id', async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		if (!blog) {
			return res.status(404).json({ error: 'Blog not found' });
		}
		res.status(200).json(blog);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Add a new blog
router.post('/', async (req, res) => {
	try {
		const blog = new Blog(req.body);
		await blog.save();
		res.status(201).json(blog);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update a blog
router.put('/:id', async (req, res) => {
	try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!blog) {
			return res.status(404).json({ error: 'Blog not found' });
		}
		res.status(200).json(blog);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;