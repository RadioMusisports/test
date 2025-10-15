// Connexion
document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('login-btn');
  const loginError = document.getElementById('login-error');
  const loginContainer = document.getElementById('login-container');
  const mainContent = document.getElementById('main-content');
  const welcomeUsername = document.getElementById('welcome-username');

  if (loginBtn) {
    loginBtn.addEventListener('click', async function() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
          welcomeUsername.textContent = username;
          localStorage.setItem('username', username);
          loginContainer.style.display = 'none';
          mainContent.style.display = 'block';
        } else {
          loginError.style.display = 'block';
        }
      } catch (error) {
        loginError.style.display = 'block';
      }
    });
  }

  // Quiz Spotify (charge les données via l'API)
  if (document.getElementById('quiz-container') && !document.getElementById('quiz-anglais') && !document.getElementById('quiz-quebecois')) {
    loadSpotifyQuiz();
  }

  // Vérification des réponses
  function checkAnswer(correctAnswer) {
    const userAnswer = document.getElementById('quiz-answer').value;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      alert('Bonne réponse ! 🎉');
    } else {
      alert(`Mauvaise réponse ! La réponse était : ${correctAnswer}`);
    }
  }
});

// Charger les données Spotify pour le quiz
async function loadSpotifyQuiz() {
  try {
    const response = await fetch('/api/track');
    const track = await response.json();
    document.getElementById('quiz-container').innerHTML = `
      <h2>Devine le titre de cette chanson :</h2>
      <audio src="${track.preview_url}" controls></audio>
      <p>Titre caché: ${track.name.replace(/[a-z]/gi, '_')}</p>
      <input type="text" id="quiz-answer">
      <button onclick="checkAnswer('${track.name}')">Valider</button>
    `;
  } catch (error) {
    document.getElementById('quiz-container').innerHTML = '<p>Erreur de chargement</p>';
  }
}