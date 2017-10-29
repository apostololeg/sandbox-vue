import http from 'http'
import path from 'path'
import express from 'express'
import spa from 'express-spa'

const app = express()
const PORT = process.env.PORT || 3000

app.set('port', PORT)
app.use(spa('dist/index.html'))
app.use(express.static(path.join(__dirname, 'dist')))

http.createServer(app)
    .listen(PORT, () => console.log(`App started on ${PORT}`))
