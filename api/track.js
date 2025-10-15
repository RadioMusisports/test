const axios = require('axios');

export default async function handler(req, res) {
  try {
    const token = await getAccessToken();
    const playlistId = "37i9dQZF1DXcBWIGoYBM5M"; // Playlist "Top 50 France"
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const tracks = response.data.items;
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

    res.status(200).json({
      name: randomTrack.track.name,
      artist: randomTrack.track.artists[0].name,
      album: randomTrack.track.album.name,
      preview_url: randomTrack.track.preview_url,
      image: randomTrack.track.album.images[0].url
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur API Spotify" });
  }
}

async function getAccessToken() {
  const authParams = new URLSearchParams();
  authParams.append('grant_type', 'client_credentials');
  authParams.append('client_id', process.env.CLIENT_ID);
  authParams.append('client_secret', process.env.CLIENT_SECRET);

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    authParams,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data.access_token;
}