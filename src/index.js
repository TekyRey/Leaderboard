import './style.css';

const refresh = document.querySelector('.btn-refresh');
const form = document.getElementById('form');
const submit = document.getElementById('add-btn');
const listScore = document.getElementById('score_list');

const gameId = 'ngRRYTtqlgOlpU5S061T';

const submitScore = async (userName, userScore) => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`,
    {
      method: 'POST',
      body: JSON.stringify({
        user: userName,
        score: userScore,
      }),
      headers: {
        'Content-Type': 'application/json',
        charset: 'UTF-8',
      },
    },
  );
  const gameResult = await response.json();
  return gameResult;
};

const fetchData = async () => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`,
  );
  const getResult = await response.json();
  const resultArray = getResult.result;
  resultArray.forEach((result) => {
    const tr = document.createElement('tr');
    const tdUser = document.createElement('td');
    const tdScore = document.createElement('td');
    tdUser.innerHTML = result.user;
    tdScore.innerHTML = result.score;
    tr.appendChild(tdUser);
    tr.appendChild(tdScore);
    listScore.appendChild(tr);
  });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = document.getElementById('user_name').value;
  const userScore = document.getElementById('user_score').value;
  submitScore(userName, userScore);
  form.reset();
});

refresh.addEventListener('click', async () => {
  listScore.innerHTML = '';
  fetchData();
});

fetchData();
