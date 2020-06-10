var express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose')

const app = express()
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json())


const tokensRouter = require('./routes/token')
app.use('/tokens', tokensRouter)


app.listen(3000, function () {
    console.log('Listening on port 3000!');
});