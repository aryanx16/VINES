const jwt = require("jsonwebtoken")

    module.exports = async(req,res,next)=>{
    try{

        console.log("inside middleware...")
        // console.log(req.headers.authorization.split(" ")[1])
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            console.log("TOKEN NOT FOUND...")
            return res.status(401).json({message:"Please Log in "})
        }
        const verify = jwt.verify(token,process.env.jwtSecret)
        if(!verify){
            console.log("TOKEN VERIFICATION FAILED...")
            return res.status(401).json({message:"Invalid User !"})
        }
        next()
    }catch(e){
        console.log("TOKEN VERIFACTION FAILED ..."+e)
        return res.status(401).json({message:"Invalid User"}    )
    }
}