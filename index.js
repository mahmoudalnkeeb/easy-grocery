const path = require('path');
const ws = require('ws');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const validateListMw = require('./mws/validate-list.mw');
const errorMw = require('./mws/error.mw');
const loggerMw = require('./mws/logger.mw');
const List = require('./db');

require('dotenv').config();
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || '*';
const apiURL = process.env.API_URL || `http://127.0.0.1:${port}`;

const app = express();

// TODO: make list checking updates in realtime
const wss = new ws.Server({ server: app });

app.set('view engine', 'ejs');

// mws
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(helmet());
app.use(cors({ origin }));
app.use(loggerMw);

app.get('/', (req, res, next) => {
  try {
    res.status(200).render('index');
  } catch (error) {
    console.error(error);
    next(new Error('Failed to get home page'));
  }
});

app.post('/create', validateListMw, async (req, res, next) => {
  try {
    const { essentials, less_essentials, non_essentials } = req.body;

    const doc = new List({ essentials, less_essentials, non_essentials });
    const { ID } = await doc.save();

    res.status(201).json({
      message: 'Grocery list created successfully',
      data: { url: `${apiURL}/${ID}` },
    });
  } catch (error) {
    console.error(error);
    next(new Error('Failed to create list'));
  }
});

app.get('/:ID', async (req, res, next) => {
  try {
    const { ID } = req.params;

    const doc = await List.findOne({ ID });

    if (!doc)
      return res.status(404).render('404');
    const { essentials, less_essentials, non_essentials } = doc;
    res.status(200).render(
      'list',
      {
        essentials,
        less_essentials,
        non_essentials,
      }
    );
  } catch (error) {
    console.error(error);
    next(new Error('Failed to get url'));
  }
});

// error handling
app.use(errorMw);

app.listen(port, () => {
  console.log(`server running on port > ${port}`);
});
