const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Webhook endpoint for Twilio WhatsApp
app.post('/whatsapp-webhook', (req, res) => {
    const { Body, From } = req.body;
    console.log(`Message from ${From}: ${Body}`);

    const responseMessage = `Hello! You sent: ${Body}`;

    res.set('Content-Type', 'text/xml');
    res.send(`
        <Response>
            <Message>${responseMessage}</Message>
        </Response>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
