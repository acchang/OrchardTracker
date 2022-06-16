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
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.listen(3000, function() {
      console.log('listening on 3000')
      })

    app.post('/tree-record', (req, res) => {
        treesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

      // app.post('/tree-record', (req, res) => {
      //   treesCollection.insertOne(
      //     {date: req.body.date, plot: req.body.plot, 
      //       variety: req.body.variety, yield: 0
      //     )
      //     .then(result => {
      //       console.log('plot added')
      //       res.redirect('/')
      //     })
      //     .catch(error => console.error(error))
      // })


      app.get('/', (req, res) => {
        db.collection('trees').find().toArray()
        .then(results => {
          res.render('index.ejs', { trees: results })
        })
        .catch(error => console.error(error))
      }) 

      app.put('/trees', (req, res) => {
        treesCollection.findOneAndUpdate(
          { variety: 'corn' },
          {
            $set: {
              variety: req.body.variety,
              date: req.body.date
            }
          },
          {
            upsert: true
          }
        )
        .then(result => {
          if (res.ok) return res.json()
        })
        .then(result => {
            // console.log(res)
            res.json('Success')
           })
          .catch(error => console.error(error))
      })


      app.delete('/trees', (req, res) => {
        treesCollection.deleteOne(
          { variety: req.body.variety },
          )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No cukes to delete')
            }
            res.json(`Deleted cukes`)
          })
          .catch(error => console.error(error))
      })

      app.delete('/deletePlot', (request, response) => {
        db.collection('trees').deleteOne({
          date: request.body.DateDelete,
          plot: request.body.PlotDelete,
          variety: request.body.VarietyDelete
        })
        .then(result => {
            console.log('Plot Deleted')
            response.json('Plot Deleted')
        })
        .catch(error => console.error(error))
      })

  })
  .catch(error => console.error(error))
