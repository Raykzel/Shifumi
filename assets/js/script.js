let round = 1;
let playerScore = 0;
let computerScore = 0;


window.onload = function() {
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('hello').style.display = 'block';
  }

function startGame() {
  const username = document.getElementById('username').value.trim();
  if (username !== '') {
    document.getElementById('playerName').innerText = username;
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('hello').style.display = 'none';
  } else {
    alert('Veuillez entrer un pseudo pour jouer.');
  }
}

function showRules() {
  document.getElementById('rules').style.display = 'block';
}

function hideRules() {
  document.getElementById('rules').style.display = 'none';
}

function playerChoice(choice) {
  if (playerScore < 10 && computerScore < 10) {
    const computer = computerChoice();
    document.getElementById('playerChoice').innerText = choice.charAt(0).toUpperCase() + choice.slice(1);
    document.getElementById('computerChoice').innerText = computer.charAt(0).toUpperCase() + computer.slice(1);

    const result = playRound(choice, computer);
    document.getElementById('roundResult').innerText = result;

    updateScore(result);

    if (playerScore === 10 || computerScore === 10) {
      endGame();
      disableButtons();
    }
  }
  document.getElementById('roundsPlayed').innerText = round;
  round++;
}

function endGame() {
  document.getElementById('replay').style.display = 'block';
}

function restartGame() {
    // Réinitialisation des variables du jeu
    round = 1;
    scorePlayer = 0;
    scoreComputer = 0;
  
    // Réinitialisation de l'affichage
    document.getElementById('playerChoice').innerText = '';
    document.getElementById('computerChoice').innerText = '';
    document.getElementById('roundResult').innerText = '';
    document.getElementById('score').innerText = '0 - 0'; // Réinitialiser le score
    document.getElementById('roundsPlayed').innerText = '0'; // Réinitialiser le nombre de rounds joués
  }

function continueGame() {
  round++;
  if (round <= 10) {
    document.getElementById('roundNumber').innerText = round;
    document.getElementById('playerChoice').innerText = '';
    document.getElementById('computerChoice').innerText = '';
    document.getElementById('roundResult').innerText = '';

    if (round === 10) {
      endGame();
      document.getElementById('result').innerHTML += '<p>Fin du jeu !</p>';
      document.getElementById('result').innerHTML += `<p>Score final : Joueur ${playerScore} - Ordinateur ${computerScore}</p>`;
    }
  }
}

function disableButtons() {
  const buttons = document.querySelectorAll('#game button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function computerChoice() {
  const choices = ["pierre", "feuille", "ciseaux"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(player, computer) {
  if (
    (player === "pierre" && computer === "ciseaux") ||
    (player === "feuille" && computer === "pierre") ||
    (player === "ciseaux" && computer === "feuille")
  ) {
    playerScore++;
    return "Gagné !";
  } else if (player === computer) {
    return "Égalité.";
  } else {
    computerScore++;
    return "Perdu.";
  }
}

function updateScore(result) {
  document.getElementById('score').innerText = `${playerScore} - ${computerScore}`;
}