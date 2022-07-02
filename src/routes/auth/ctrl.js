const Auth = require('../../models/Auth')

const login = async (req, res) => {
  const { nickname, password } = req.body
  
  try {
    const auth = await Auth.login(nickname, password)
    if (!auth) {
      res.status(400).json({ message: 'Login failed' })
      return
    }
    res.status(200).json({ message: 'Login Success!' })
    // next()
  } catch (err) {
    console.error(err)
    // next(err)
  }
}

module.exports = {
  login
}