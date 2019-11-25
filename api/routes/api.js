const express = require('express');
const apiRouter = express.Router();
const haxStatsRouter = require('./haxStatsRouter.js');
const loginRouter = require('./loginRouter.js');
const registerRouter = require('./registerRouter.js');

apiRouter.use('/haxStats', haxStatsRouter);
apiRouter.use('/auth', loginRouter);
apiRouter.use('/register', registerRouter);

module.exports = apiRouter;