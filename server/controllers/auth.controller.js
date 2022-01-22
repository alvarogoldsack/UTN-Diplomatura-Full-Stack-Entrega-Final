import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret = process.env.JWT_SECRET ;

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })
    if(user.verified === false) {
      return res.status('401').send({ 
            error: "Cuenta no verificada. Revise su correo de confirmación" 
      });
    }
    if (!user)
      return res.status('401').json({
        error: "Usuario no encontrado"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email y contraseña no coinciden."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email}
    })
  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Sesión no iniciada"
    })

  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "Sesión cerrada"
  })
}

const requireSignin = expressJwt({
  secret: jwtSecret,
  userProperty: 'auth',
  algorithms : ['sha1', 'RS256', 'HS256']
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "Usuario no autorizado"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}
