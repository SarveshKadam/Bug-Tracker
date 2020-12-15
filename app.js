
const landingRouter = require('./routers/landing')
const loginRouter = require('./routers/login')
const dashboardRouter = require('./routers/dashboard')
const memberRouter = require('./routers/member')
const defectRouter = require('./routers/defect')
const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.use(express.static('public'))
require('dotenv').config({path: './config.env'})
app.use(helmet())
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
const router = require('./routers/member')
mongoose.connect(process.env.DATABASE ,{useUnifiedTopology : true , useNewUrlParser : true})

const db = mongoose.connection

db.on('error',error => console.error(error))
db.once('open',()=>{console.log('Database is connected')})


function routerCheck(routePath,routerimp){
    if(routerimp === loginRouter || routerimp == landingRouter){
        app.use(`${routePath}`,routerimp)
    }else{
        app.set('layout','layouts/layout')
        app.use(expressLayouts)
        app.use(`${routePath}`,routerimp)
    }
}   
routerCheck('/',landingRouter)
routerCheck('/login',loginRouter)
routerCheck('/dashboard',dashboardRouter)
routerCheck('/members',memberRouter)
routerCheck('/defects',defectRouter)


app.listen(process.env.PORT || 3000)