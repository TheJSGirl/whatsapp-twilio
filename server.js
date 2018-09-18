const express = require('express');
const twilio = require('twilio');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const accountSid = 'AC4a995acfd2580d1aecc3940181821034';
const authToken = '07e580a25d06793666955b5263f3d3eb';
const client = require('twilio')(accountSid, authToken);


app.post('/', async(req, res) => {
  const { mobile, text} = req.body;
  await client.messages
      .create({
        body: text,
        from:'whatsapp:+14155238886',
        to: `whatsapp:${mobile}`
      })
      .then(message => {
        res.status(200).json({
          success: true,
          data: message,
          message: 'send successfully'
        })
      })
      .catch((e) => console.log('error', e))
      .done();
})
      

app.listen(port, () => {
  console.log('running at port', port);
})