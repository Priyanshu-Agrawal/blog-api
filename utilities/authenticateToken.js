import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) =>{
	const token = req.headers['authorization'];
	if (!token) return res.status(401).send('Access Denied');
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).send('Invalid Token');
		req.user = user;
		next();
	})
}
module.exports = authenticateToken;

const authenticateUserToken = (req, res, next) =>{
	const token = req.headers['authorization'];
	if (!token) return res.status(401).send('Access Denied');
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).send('Invalid Token');
		const requestingUser = req.body.userId || req.body.clientId || req.params.id;
		if (requestingUser !== user.userID) return res.status(403).send('Unauthorized Access');
		req.user = user;
		next();
	})
}

module.exports = authenticateUserToken
