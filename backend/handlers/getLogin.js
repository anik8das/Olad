const getLogin = (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      userInfo: req.session.user.info,
      userRole: req.session.user.role,
    });
  } else {
    res.send({ loggedIn: false });
  }
};

module.exports = getLogin;
