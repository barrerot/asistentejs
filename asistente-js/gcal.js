const { google } = require('googleapis');
const key = require('./credentials.json'); // Import your service account key JSON file

// Define the scope for the calendar API
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Create a new JWT client using the key file
const auth = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: SCOPES,
});

// Set up the Google Calendar API with the authenticated client
const calendar = google.calendar({ version: 'v3', auth });

// Example: List the user's calendar events
async function listEvents() {
  try {
    const response = await calendar.events.list({
      calendarId: '43ab978299b61e1eab8bfab739d56b9670c75082638fd695d2c58b6569a349dc@group.calendar.google.com', // or the specific calendar ID
      timeMin: new Date().toISOString(),

      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = response.data.items;
    console.log('Events:', events);
  } catch (err) {
    console.error('Error fetching calendar events:', err);
  }
}

// Call the function to list events
listEvents();