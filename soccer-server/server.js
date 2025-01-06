const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const path = require('path');

const port = process.env.PORT || 5005;

app.use(cors());


app.get('/api/competitions', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions', {
      headers: { 'X-Auth-Token': '4eb3849dda5643409b8fd3036323e316' }, 
    });

    // Send the data from the external API to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/competitions/:league/standings', async (req, res) => {
  const { league } = req.params;
  //console.log(`Getting data for https://api.football-data.org/v4/competitions/${league}/standings`);
  try {
    const response = await axios.get(`https://api.football-data.org/v4/competitions/${league}/standings`, {
      headers: { 'X-Auth-Token': '4eb3849dda5643409b8fd3036323e316' }, 
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).send('Server Error');
  }
});

// Serve static files from the React build (adjust if you're using a different build directory)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
  
    // Catch-all route to serve index.html for any other route (important for client-side routing)
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
