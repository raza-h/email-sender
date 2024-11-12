const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/', async (req, res) => {
    try {
        await axios.post(process.env.SENDER_API_URL, {
            from: {
              email: process.env.SENDER_EMAIL,
              name: req.body.from
            },
            to: req.body.to?.map(email => ({email})),
            subject: req.body.subject,
            html: req.body.html,
          }, {
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_KEY}`,  
                'Content-Type': 'application/json',
            }
          });
        return res.send('Email sent successfully');
    } 
    catch (error) {
        return res.send('Error sending email' +  error.message);
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
