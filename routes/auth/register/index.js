const express = require('express');
const router = express.Router();
const axios = require('axios');
const {User} = require("../../../database/models");
const jwt = require("jsonwebtoken");

router.post('/', async (req, res) => {
	try {
		const existingUserByEmail = await User.findOne({ email: req.body.email }, {}, {});
		if (existingUserByEmail) {
			console.log("Email Already in use")
			return res.status(409).json({error: 'Email Already in use'});
		}
		
		/*const existingUserByUsername = await User.findOne({ username: req.body.username }, {}, {});
		if (existingUserByUsername) {
			return res.status(400).send('Username Already in use');
		}*/
		
		const user = new User(req.body);
		await user.save();
		const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'}) // token expires in 30 days remove options to make it never expire
		res.status(201).json({...user, token});
		console.group("User Registered")
		/*axios.post(`${process.env.FULL_URL}/auth/login`, req.body)
			.then(response => {
				// console.log(response.data);
				res.send(response.data);
			})
			.catch(error => {
				console.log(error);
				res.status(400).send(error);
			});*/
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;