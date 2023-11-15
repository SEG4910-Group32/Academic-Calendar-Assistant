const CLIENT_ID = "592411707654-ejtpn4fvhtq6467p3aafcavqf5i3irjn.apps.googleusercontent.com";
const API_KEY = "AIzaSyAyBdYusMor3VC1nmVfzaogu6mObWu-Gag";
const DISCOVERY_DOC = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";
let tokenClient;
let gapiInited = false;
let gisInited = false;


function gapiLoaded() {
    console.log("gapiLoading!!!!!!!!!")
    gapi.load('client', initializeGapiClient);
}
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    console.log("gapiLoaded!!!!!!!!!")
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    console.log("gisLoading!!!!!!!!")
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    console.log("gisLoaded!!!!!!!!!")
}

function createGoogleEvent(eventDetails) {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        await scheduleEvent(eventDetails);
    };
    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

function scheduleEvent(event) {
    const request = gapi.client.calendar.events.insert({
        'calendarId': 'primary', // Use 'primary' for the user's primary calendar.
        'resource': {
            summary: event.type,
            location: event.location,
            description: event.description,
            start: {
                dateTime: event.startTime,
                timeZone: 'America/New_York',
            },
            end: {
                dateTime: event.endTime,
                timeZone: 'America/New_York',
            },
        },
    });
    request.execute(function (event) {
        console.log("Event Created:" + event.htmlLink);
    })
}