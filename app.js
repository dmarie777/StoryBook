const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use( express.json() )

//loggins
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { 
  formatDate, 
  truncate,
  scriptTags
} = require('./helpers/hbs')
//const moment = require('moment')

//Handlebars
app.engine(
    '.hbs',
    exphbs.engine({
      helpers: {
        formatDate: formatDate,
        truncate,
        scriptTags
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
app.set('view engine', '.hbs');

// Sessions middleware
app.use(
  session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "example-db",
  })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/' , require('./routes/index.js'))
app.use('/auth' , require('./routes/auth.js'))
app.use('/stories' , require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
)

