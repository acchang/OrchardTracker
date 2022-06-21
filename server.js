if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv')
  dotenv.config({ debug: true })
// if process.env.NODE_ENV == production
// then we are in Heroku and dotenv is not required
// we use the config var for DATABASE_URL as the MongoClient password.
// In Node.js, use process.env to access environment variables
}

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('my-trees')
    const treesCollection = db.collection('trees')
    
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
    app.listen(port);


      app.post('/tree-record', (req, res) => {
        treesCollection.insertOne(
          {date: req.body.date, plot: req.body.plot, 
            variety: req.body.variety, yield: 0
          })
          .then(result => {
            console.log('plot added')
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
      }) 

// doesn't work past here, why?

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
            upsert: false
            // Upsert false so it doesn't just place a new one if none exists
          }
        )
        .then(result => {
          if (res.ok) return res.json()
        })
        .then(result => {
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


      app.put('/addOneYield', (request, response) => {
        db.collection('trees').updateOne({
          date: request.body.DateUpdate, 
          plot: request.body.PlotUpdate,
          variety: request.body.VarietyUpdate,
          yield: request.body.YieldUpdate},{
            $set: {
                yield:request.body.YieldUpdate + 1
              }
        },{
            sort: {_id: -1},
            upsert: true
        })
        .then(result => {
            console.log('Added One')
            response.json('Yield Added')
        })
        .catch(error => console.error(error))
      })


  })
  .catch(error => console.error(error))
