const { Response, Request, NextFunction } = require('express');
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports = (req, res, next) => {
  res.on('finish', () => {
    const requestBody = Object.keys(req.body).length ? `Body: ${JSON.stringify(req.body)}` : 'nil';
    const requestQuery = req.query ? `Query: ${JSON.stringify(req.query)}` : 'No query';

    console.log(
      `[${new Date().toLocaleString()}]`,
      res.statusCode,
      req.method,
      req.path,
      requestBody,
      requestQuery,
      `IP: ${req.ip}`,
      `User-Agent: ${req.headers['user-agent']}`,
      '\n-----'
    );
  });
  next();
};
