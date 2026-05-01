const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const heimdall = require('heimdall-nodejs-sdk');

const app = express();
const PORT = 3000;

// Middleware to parse JSON payloads
app.use(cors());
app.use(bodyParser.json());
heimdall.ping(app);

// Endpoint to receive webhook data
app.post('/log', (req, res) => {
    const payload = req.body;
    
    console.log('--- NEW LOG RECEIVED ---');
    console.log('Device:', payload.device);
    console.log('Timestamp:', new Date(payload.timestamp).toLocaleString());
    console.log('Data:', payload.data);
    console.log('------------------------\n');

    res.status(200).send({ message: 'Log received successfully' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Webhook server is running on port ${PORT}`);
    console.log(`Make sure to update WEBHOOK_URL in your Android app to: http://<YOUR_COMPUTER_IP_ADDRESS>:${PORT}/log`);
});
