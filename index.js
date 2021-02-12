const express = require('express');
const crypto = require('crypto');
const path = require('path');
const morgan = require('morgan');

const database = require('./database');

const app = express();
const PORT = process.env.port || 3000;

// Use http request logger
app.use(morgan('dev'));
// Serve static files using express.static built-in middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
// Use body-parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set to use ejs templates
app.set('views', './views');
app.set('view engine', 'ejs');

// Get list of schedules (home route)
app.get('/', (req, res) => {
  database.any('SELECT * from schedule;')
  .then((schedules) => {
    console.log(schedules)
    res.render('pages/index', {schedules: schedules});
  })
  .catch((err) => {
    console.error(err)
    res.render('pages/error', {
      err: err
    })
  })
console.log('i happened')
});

// Display form for new schedule
// app.get('/new', (req, res) => res.render('new_schedule', { users: data.users }));

// Post new schedule
// app.post('/', (req, res) => {
//   const newSchedule = {
//     'user_id': Number(req.body.user_id),
//     'day': Number(req.body.day),
//     'start_at': req.body.start_at,
//     'end_at': req.body.end_at
//   };
//   data.schedules.push(newSchedule);
//   res.render('content_schedules', { schedules: data.schedules });
// });

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))