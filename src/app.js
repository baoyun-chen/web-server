const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')

const app = express();
const publicDirPath = path.join(__dirname,'../public')
const templateDirPath = path.join(__dirname,'../template/views')
const partialsDirPath = path.join(__dirname,'../template/partials')
const Port = process.env.PORT||3000;

app.set('view engine','hbs')
app.set('views',templateDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'name',
        title:'home'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'name',
        title:'about'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'this is a help message',
        title:'help'
    });
})

app.get('/weather',(req,res)=>{
    if((!req.query.longtitude||(!req.query.latitude))){
        return res.send({
            error:"please enter the data"
        })
    }
    forcast(req.query.latitude,req.query.longtitude,(error,{temperature,precipProbability}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            temperature,
            precipProbability
        })
    });
   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'help text not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'not found'
    })
})
app.listen(Port,()=>{
    console.log('up')
})