module.exports = (req, res, next) => {
  if (!isValid(req.body))
    return res.status(400).json({
      message: 'You should atleast provide one high priority item',
    });
  next();
};

function isValid(body) {
  const { essentials, less_essentials, non_essentials } = body;
  if (!essentials.length) return false;
  return essentials.length || less_essentials.length || non_essentials.length;
}
