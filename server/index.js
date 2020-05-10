const express = require('express')
const expressGraphQL = require('express-graphql')
const session = require('express-session')

const mongoose = require('mongoose')
const passport = require('passport')
const models = require('./models')
const schema = require('./schema')
const passportConfig = require('./services/auth')
const MongoStore = require('connect-mongo')(session)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const { MONGO_URI, SESSION, PORT } = process.env

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION,
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true,
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}/graphql`)
})
