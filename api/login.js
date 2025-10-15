export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { username, password } = req.body;
  
  // ⚠️ POUR DÉVELOPPEMENT LOCAL SEULEMENT (dans le backend réel, utilisez une base de données)
  const users = {
    'admin': 'password123',
    'user1': 'pass123'
  };

  if (users[username] && users[username] === password) {
    res.status(200).json({ success: true, message: 'Connexion réussie' });
  } else {
    res.status(401).json({ error: 'Pseudo ou mot de passe incorrect' });
  }
}