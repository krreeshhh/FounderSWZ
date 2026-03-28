import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * This script helps you generate a Spotify Refresh Token.
 */

// Simple .env parser
function getEnv() {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) return {};

    const content = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    content.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.join('=').trim();
        }
    });
    return env;
}

const env = getEnv();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('\n--- Spotify Refresh Token Generator ---\n');

    let clientId = env.SPOTIFY_CLIENT_ID;
    let clientSecret = env.SPOTIFY_CLIENT_SECRET;

    if (clientId && clientSecret) {
        console.log('Using Client ID and Client Secret from .env.local\n');
    } else {
        if (!clientId) clientId = await question('Enter your Spotify Client ID: ');
        if (!clientSecret) clientSecret = await question('Enter your Spotify Client Secret: ');
    }

    const redirectUri = 'http://localhost:3000'; // Match what you set in Spotify Dashboard

    const scopes = [
        'user-read-currently-playing',
        'user-read-recently-played'
    ].join('%20');

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}`;

    console.log('1. Open this URL in your browser and log in:');
    console.log(`\n${authUrl}\n`);

    console.log('2. After logging in, you will be redirected to a URL like:');
    console.log('   http://localhost:3000/?code=AQ...#_=_');

    const code = await question('\n3. Paste the "code" parameter here (everything after "code="): ');

    if (!code) {
        console.error('No code provided. Exiting.');
        process.exit(1);
    }

    console.log('\nExchanging code for Refresh Token...');

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error('\nError exchanging code:', data.error_description || data.error);
        } else {
            console.log('\n--- SUCCESS! ---');
            console.log('\nRefresh Token:', data.refresh_token);
            console.log('Access Token:', data.access_token);
            console.log('\nAdd your Refresh Token to your .env.local as:');
            console.log('SPOTIFY_REFRESH_TOKEN=' + data.refresh_token);
        }
    } catch (err) {
        console.error('\nAn error occurred:', err.message);
    } finally {
        rl.close();
    }
}

main();
