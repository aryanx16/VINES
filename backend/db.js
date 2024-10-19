const mongoose = require("mongoose")
 const connectWdb =async()=>{
    try{
        const res = await mongoose.connect(process.env.DATABASE_URL)
        console.log("CONNECTED TO DB...")
    }catch(e){
        console.log("ERROR IN CONNECTING TO DB...\n" + e)
    }
}

module.exports = {connectWdb}