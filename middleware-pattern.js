//Question 3

//Middleware functions are functions that have access to the request object (req),
//the response object (res), and the next middleware function in the application’s request-response cycle.
//The next middleware function is commonly denoted by a variable named next.



const express = require("express")
const app = express()

const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

//It is also called as chain of responsibility pattern
//at first the myLogger will be invoked then requestTime

app.use(myLogger, requestTime) // middleware at app level

app.get("/", (req, res) => {
    txt = req.requestTime
    res.send(`Successful at ${txt}`)
})

app.listen(3001, () => {
    console.log("Server is running")
})