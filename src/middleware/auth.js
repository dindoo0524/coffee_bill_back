const jwt = require('../modules/jwt');

const isLogin = async (req, res, next) => {
  // const token = req.headers['access-token']
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const { decode  , message } = jwt.verify(token)
  if (message) {
    res.status(401).json({ message })
    return
  }
  next()
}

module.exports = {
  isLogin
}