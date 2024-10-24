require('../backend/src/db/db')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./src/routes/user_routes')
const verifyToken = require('./src/middleware/VerifyRoutes')

app.use(cors())
app.use(bodyParser.json())


app.get('/' , (req,res)=>{
    res.send("welcome to my app")
})

app.use('/user', userRoutes)

app.use((req,res,next)=>{
    let error = {}
    error.status = 400
    error.message = "api not found"
    next(error)
})

app.use((err,req,res,next) => {
    console.log(err)
    res.json({
        error:err
    })
})

app.listen(5050, () => {
    console.log("running on port 5050")
})