const Auth = require('../../models/Auth');
const jwt = require('../../modules/jwt');

const login = async (req, res) => {
  const { nickname, password } = req.body
  
  try {
    const auth = await Auth.login(nickname, password)
    if (!auth) {
      res.status(400).json({ message: 'Login failed' })
      return
    }
    const token = jwt.sign(nickname)
    res.status(200).json({ message: 'Login Success!', token })
    
    // next()
  } catch (err) {
    console.error(err)
    // next(err)
  }
}

const signUp = async (req, res) => {
  const { nickname, password } = req.body
  
  try {
    const result = await Auth.signUp(nickname, password)
    if (!result) {
      res.status(400).json({ message: 'SignUp failed' })
      return
    }
    res.json({ result })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  login,
  signUp
}