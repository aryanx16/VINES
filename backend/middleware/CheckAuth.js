const jwt = require("jsonwebtoken")

    module.exports = async(req,res,next)=>{
    try{

        console.log("inside middleware...")
        // console.log(req.headers.authorization.split(" ")[1])
        const token = req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token,process.env.jwtSecret)
        if(!verify){
            return res.status(401).json({message:"Token not found"})
        }
        next()
    }catch(e){
        console.log("ERROR IN AUTHORIZATION ..."+e)
        return res.status(401).json({message:"ERROR IN AUTHORIZATION"})
    }
}