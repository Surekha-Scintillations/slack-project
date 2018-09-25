const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');

const app = express();

const config = {
  app: {
    instanceLocator: 'v1:us1:c887f7ef-f46b-4b9c-a92d-5baed5338505',
    key: 'd7dca43b-a94d-408b-86f6-e4f83f23cef3:mNf5r5/48fIBlSrZ4ittjWRqtB1QjrCB8nqsSdFeurY=',
  },
  base_url: 'http://localhost:3001/',
  DEFAULT_ROOM_ID: 17038228,
};

const chatkit = new Chatkit.default(config.app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.post('/create/user', (req, res) => {
  chatkit.createUser(req.body)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post('/users', (req, res) => {
  const { username, name } = req.body;
  chatkit.createUser({
    id: username,
    name,
  })
    .then(() => res.sendStatus(201))
    .catch((error) => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});


const PORT = 3001;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
