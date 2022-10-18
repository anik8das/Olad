const getLogin = (req, res) => {
	if (req.session.user) {
		console.log("session", req.session.user);
		res.send({ loggedIn: true, userInfo: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
}

module.exports = getLogin