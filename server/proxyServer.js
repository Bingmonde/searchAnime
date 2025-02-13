const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import the cors package
const app = express();

app.use(cors());

app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    try {
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error fetching image');
    }
});

app.listen(3001, () => console.log('Proxy server running on port 3001'));
