const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../../../database/models");
const router = express.Router();

router.post('/', async (req, res, next) => {
	try {
		const user = await User.findOne({email: req.body.email});
		
		if(!user) {
			return res.status(401).json({error: 'Invalid Credentials'});
		}
		const ifPasswordMatches = await bcrypt.compare(req.body.password, user.password);
		if (!ifPasswordMatches) {
			return res.status(401).json({error: 'Invalid Credentials'});
		}
		const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'}) // token expires in 30 days remove options to make it never expire
			/* TODO - Add more security to token*/
		res.status(200).json({ user, token });
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: 'Internal Server Error' });
	}
})

module.exports = router;