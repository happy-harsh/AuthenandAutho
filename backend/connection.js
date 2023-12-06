const mongoose = require("mongoose");

const ConnectToMongoDB = (uri,port) => {
    mongoose.connect(uri).then(()=>{
        console.log(`Connected to Mongodb ${port}`)
      }).catch((error)=>{
        console.log(error);
      })
}

module.exports={
    ConnectToMongoDB
}