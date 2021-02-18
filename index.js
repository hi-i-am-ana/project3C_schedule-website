const express = require('express');

const path = require('path');
const crypto = require('crypto');
const querystring = require('querystring');

const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const database = require('./database');

const app = express();
const PORT = process.env.port || 4000;

// Use http request logger
app.use(morgan('dev'));
// Serve static files using express.static middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
// Use body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use express ejs layouts
app.use(expressLayouts);

// Set to use ejs templates
app.set('views', './views');
app.set('view engine', 'ejs');
// Set script blocks extraction (to put script blocks in <%- script %>)
app.set("layout extractScripts", true);

// Get list of schedules (home route)
app.get('/', (req, res) => {
  // Use 'each' method for query to execute callback function to convert day from number to string
  database.each('SELECT * FROM schedule ORDER BY username ASC, day ASC, start_time ASC, end_time ASC;', [], row => {
    const days = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday'
    }
    row.day = days[row.day];
  })
  .then((schedules) => res.render('pages/index', {schedules: schedules, title: 'Schedule management - Schedule list | Mr.Coffee'}))
  .catch((err) => res.render('pages/error', {err: err, title: 'Schedule management - Error | Mr.Coffee'}));
});

// Display form for adding new schedule
app.get('/new', (req, res) => res.render('pages/new_schedule', {title: 'Schedule management - New schedule | Mr.Coffee', modal: req.query.modal}));

// Post new schedule
// TODO: Check if pair username + day already exists in database
app.post('/new', (req, res) => {  
  // The second parameter in database.query() can be:
  // 1) an array of values - to replace all $1, $2, ... variables:
  // const newSchedule = [req.body.username, Number(req.body.day), req.body.start_time, req.body.end_time];
  // database.none('INSERT INTO schedule(username, day, start_time, end_time) VALUES ($1, $2, $3, $4);', newSchedule)
  // 2) an object -> query has to use the Named Parameter syntax:
  newSchedule = {
    username: req.body.username,
    day: +req.body.day,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  };
  database.none('INSERT INTO schedule(username, day, start_time, end_time) VALUES (${newSchedule.username}, ${newSchedule.day}, ${newSchedule.start_time}, ${newSchedule.end_time});', {newSchedule})
  // Redirect back to new schedule form, but passing {modal: 'opened'} as a query string to get route -> form will be rendered considering this additional info (with modal opened)
  // Another way to show modal is to redirect to a new get route which displays form with modal always opened. Close modal button will be a link back to new schedule form.
  .then(() => {
    const query = querystring.stringify({modal: 'opened'});
    res.redirect(`/new?${query}`);
  })
  .catch((err) => res.render('pages/error', {err: err, title: 'Schedule management - Error | Mr.Coffee'}));
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));