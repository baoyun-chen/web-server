const request = require('request');

const getforcast = (latitude,longlitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/049dde0a00b98f930b5bc28073f1c931/'+latitude+','+longlitude;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect")
        }else if(response.body.error){
            callback("404")
        }else{

            const {precipProbability,temperature} = response.body.currently;
            const data ={
                precipProbability,
                temperature
            }
            callback(undefined,data)
        }

    })
}

module.exports=getforcast;