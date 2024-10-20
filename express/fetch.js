const express = require('express');
const axios = require('axios');
const router = express.Router();

// This is an example, replace with a real API that provides skill data.
const API_URL = 'https://api.example.com/skills';

router.get('/skills/:jobTitle', async (req, res) => {
  const { jobTitle } = req.params;

  try {
    const skillResponse = await axios.get(`${API_URL}?job=${jobTitle}`);

    const skills = skillResponse.data.skills.map(skill => ({
      name: skill.name,
      demandLevel: skill.demand_level,
    }));

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch skills data' });
  }
});

module.exports = router;
<div id="skills">
  <h2>In-Demand Skills</h2>
  <div id="skill-listings"></div>
</div>

<script>
  const jobTitle = 'Data Scientist'; // Replace with dynamic job title

  axios.get(`/skills/${jobTitle}`)
    .then(response => {
      const skillListings = document.getElementById('skill-listings');
      response.data.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.innerHTML = `
          <h3>${skill.name}</h3>
          <p>Demand Level: ${skill.demandLevel}</p>
        `;
        skillListings.appendChild(skillDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching skills', error);
    });
</script>
