# Mailchimp Integration Setup Guide

## Prerequisites
- Node.js installed on your system
- Mailchimp account with API access

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Get Your Mailchimp Credentials

### API Key
1. Log into your Mailchimp account
2. Go to **Account** → **Extras** → **API keys**
3. Create a new API key or copy an existing one
4. Note the server prefix (e.g., if your key ends with `-us1`, the prefix is `us1`)

### Audience (List) ID
1. Go to **Audience** → **All contacts**
2. Click **Settings** → **Audience name and defaults**
3. Copy the **Audience ID**

## Step 3: Configure Environment Variables
Edit the `.env` file and replace the placeholder values:

```env
MAILCHIMP_API_KEY=your_actual_api_key_here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your_actual_audience_id_here
PORT=3000
```

**Important:** Never commit the `.env` file to version control!

## Step 4: Start the Server
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## Step 5: Test the Integration
1. Visit `http://localhost:3000`
2. Click "Sign Up" button
3. Fill out the form with your email
4. Check your Mailchimp audience to confirm the subscriber was added

## Features
- ✅ Secure API key storage
- ✅ Email validation
- ✅ Duplicate subscriber handling
- ✅ Error handling and user feedback
- ✅ First/last name parsing
- ✅ Source tagging (subscribers tagged as 'tracklist-landing-page')

## Troubleshooting

### "Member Exists" Error
- This means the email is already subscribed
- The system will show a friendly message to the user

### API Key Issues
- Make sure your API key is valid and has proper permissions
- Check that the server prefix matches your API key region

### Audience ID Issues
- Verify the Audience ID is correct
- Make sure the audience exists and is active

## Security Notes
- API credentials are stored securely in `.env`
- All API calls happen server-side
- Frontend never sees sensitive credentials
- Input validation prevents common attacks

## Deployment
When deploying to production:
1. Set environment variables on your hosting platform
2. Don't deploy the `.env` file
3. Use HTTPS for secure form submissions