import './style.css';

const refresh = document.querySelector('.btn-refresh');
const form = document.getElementById('form');
const submit = document.getElementById('add-btn');
const listScore = document.getElementById('score_list');

const gameId = 'Ni1OxKmEJWvyYe0xcLQq';

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
  // display results in a table
  resultArray.forEach((result) => {
    const tr = document.createElement('tr');
    const tdUser = document.createElement('td');
    const tdScore = document.createElement('td');
    tdUser.innerHTML = result.user;
    tdScore.innerHTML = result.score;
    tr.appendChild(tdUser);
    tr.appendChild(tdScore);
    listScore.appendChild(tr);
  }
  );
}

// const values = resultArray
//   .map(
//     (result) => `<li class='display-table-list'>
//                     <p>${result.user}: ${result.score}</p>
//                 </li>`
//   )
//   .join('');
//   listScore.innerHTML = values;
// };

// add event listener to form
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = document.getElementById('user_name').value;
  const userScore = document.getElementById('user_score').value;
  submitScore(userName, userScore);
  // clear form
  form.reset();
  // clear table
  listScore.innerHTML = '';
  fetchData();
}
);


// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   await submitScore(form.name.value, form.score.value);
//   form.name.value = '';
//   form.score.value = '';
// });
refresh.addEventListener('click', async () => {
  // clear the table
  listScore.innerHTML = '';
  fetchData();
});

fetchData();
