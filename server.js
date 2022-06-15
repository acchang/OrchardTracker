const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

const dotenv = require('dotenv') // .env file
dotenv.config() // using .env
const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PW}@cluster0.sgg7p.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('my-trees')
    const treesCollection = db.collection('trees')
    
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/tree-record', (req, res) => {
        treesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

      app.get('/', (req, res) => {
        db.collection('trees').find().toArray()
          .then(results => {
            res.render('index.ejs', { trees: results })
          })
          .catch(error => console.error(error))
          res.render('index.ejs', {})
      })


    app.get('/', (req, res) => {
        res.sendFile('/Users/andrewchang/the_odin_project/OrchardTracker' + '/index.html')
        })

    app.listen(3000, function() {
        console.log('listening on 3000')
        })

  })
  .catch(error => console.error(error))
