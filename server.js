// server.js

const express = require('express')
const next = require('next')
const {parse} =require('url')
const port = parseInt(process.env.PORT, 10) || 3000
const hostname='localhost'
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,hostname,port
})
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.all('*',(req, res) => {
            handle(req, res)
    })
    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log("err:", err)
  })


