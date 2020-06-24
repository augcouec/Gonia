exports.signin = (req, res) => {
  res.status(200).send(req.user);
};
