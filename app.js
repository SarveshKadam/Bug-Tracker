
const landingRouter = require('./routers/landing')
const loginRouter = require('./routers/login')
const express = require('express')
const helmet = require('helmet')
const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(helmet())

const port = process.argv.PORT || 3000

app.use('/',landingRouter)
app.use('/',loginRouter)

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})