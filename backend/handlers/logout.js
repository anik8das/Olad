const logout = (req, res) => {
	if (req.session.user) {
		req.session.user = null
	}
    console.log("Logged out")
    res.send("Logged out!")
};

module.exports = logout;
