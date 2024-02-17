const express = require('express');
const router = express.Router();

const {User} = require("../../database/models");

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;