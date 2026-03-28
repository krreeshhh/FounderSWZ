import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export interface Song {
  title: string;
  artists: string[];
  albumName: string;
  imageUrl: string;
  duration: number;
  progress?: number;
  externalLink: string;
  preview: string | null;
  timestamp?: number;
}

interface SpotifyTrackData {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  external_urls: { spotify: string };
  preview_url: string | null;
};

const formatSong = (songData: SpotifyTrackData): Song => {
  return {
    title: songData.name,
    artists: songData.artists.map((a: { name: string }) => a.name),
    albumName: songData.album.name,
    imageUrl: songData.album.images[1]?.url ?? songData.album.images[0]?.url,
    duration: songData.duration_ms,
    externalLink: songData.external_urls.spotify,
    preview: songData.preview_url
  }
}

export const getCurrentOrLastPlayed = async () => {
  const { access_token } = await getAccessToken();

  // First, try to get currently playing
  const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 30 }
  });

  // If something is currently playing (status 200), return it
  if (nowPlayingResponse.status === 200) {
    const data = await nowPlayingResponse.json();

    // Check if expected data exists, sometimes 200 OK doesn't mean playing track is valid in expected key
    if (data.item) {
      return {
        isPlaying: true,
        song: formatSong(data.item),
      };
    }
  }

  // Otherwise, get the last played track
  const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 30 }
  });

  if (recentlyPlayedResponse.status === 403) {
    console.error("Spotify API returned 403 Forbidden for Recently Played endpoint. This usually means your Refresh Token is missing the 'user-read-recently-played' scope. Please regenerate your token with this scope.");
  } else if (recentlyPlayedResponse.status !== 200) {
    console.error("Recently Played Error:", recentlyPlayedResponse.status, await recentlyPlayedResponse.text());
  }

  if (recentlyPlayedResponse.status === 200) {
    const data = await recentlyPlayedResponse.json();
    if (data.items && data.items.length > 0) {
      const lastTrack = data.items[0];
      return {
        isPlaying: false,
        song: formatSong(lastTrack.track),
      };
    }
  }

  return { isPlaying: false, song: null };
};

// Alias for backward compatibility if needed
export const getSpotifyStatus = getCurrentOrLastPlayed;