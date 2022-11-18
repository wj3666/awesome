
const jwt =require('jsonwebtoken')
const secret =process.env.NEXTAUTH_SECRET
const JWT={
    generate(value,expires){
        return jwt.sign(value,secret,{expiresIn:expires})
    },
    verify(token){
        try{
            return jwt.verify(token,secret)
        }catch(error){
            return false
        }
    }
}
module.exports={
    JWT:JWT
}