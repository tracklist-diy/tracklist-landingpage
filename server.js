const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1', 'us2', etc.
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and email are required' 
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Please enter a valid email address' 
    });
  }

  try {
    // Add subscriber to Mailchimp list
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name.split(' ')[0], // First name
        LNAME: name.split(' ').slice(1).join(' ') || '', // Last name (if provided)
      },
      tags: ['tracklist-landing-page'] // Optional: tag subscribers from this source
    });

    console.log(`Successfully subscribed ${email} to Mailchimp list`);
    
    res.json({ 
      success: true, 
      message: `Thanks ${name.split(' ')[0]}! You've been subscribed to updates.`,
      id: response.id
    });

  } catch (error) {
    console.error('Mailchimp error:', error.response?.body || error.message);
    
    // Handle specific Mailchimp errors
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return res.status(400).json({ 
        success: false, 
        error: 'This email is already subscribed to updates!' 
      });
    }
    
    if (error.status === 400) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email address or subscription data' 
      });
    }

    // Generic server error
    res.status(500).json({ 
      success: false, 
      error: 'Something went wrong. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Make sure to set your Mailchimp credentials in .env file');
});