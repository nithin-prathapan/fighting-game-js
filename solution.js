let playButton = document.getElementById("play");
let resultDiv = document.getElementById("result");
let p1HealthDiv = document.getElementById("p1Health");
let p2HealthDiv = document.getElementById("p2Health");

const updateGame = (p1, p2, p1HealthDiv, p2HealthDiv, gameState) => {
  console.log(p1.health, p1, "👈👈👈👈");
  p1HealthDiv.innerText = p1.health;
  p2HealthDiv.innerText = p2.health;
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    result.innerText = game.declareWinner(game.isOver, p1, p2);
    return gameState;
  }
};
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg);
    enemy.health -= damageAmount;

    updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState);

    return `${player.name} attacks ${enemy.name} for ${damageAmount}`;
  }
  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5);
    player.health += hpAmount;

    updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState);
    return `${player.name} heals for ${hpAmount} + HP!`;
  }
}

class Game {
  constructor(p1HealthDiv, p2HealthDiv) {
    this.isOver = false;
    this.p1HealthDiv = p1HealthDiv;
    this.p2HealthDiv = p2HealthDiv;
  }

  declareWinner(isOver, p1, p2) {
    let message;
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    } else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`;
    }
    console.log(isOver, message, "🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀", p2.health, p1.health);
    return message;
  }

  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    this.isOver = false;
    resultDiv.innerText = "";
    updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
  }

  play(p1, p2) {
    this.reset(p1, p2);

    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg);
      p2.heal(p2);
      p2.strike(p2, p1, p2.attackDmg);
      p1.heal(p1);
      updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
    }

    return this.declareWinner(this.isOver, player1, player2);
  }
}

let player1 = new Player("Player 1", 100, 15);
let player2 = new Player("Player 2", 100, 15);

let p1 = player1;
let p2 = player2;

let game = new Game(p1HealthDiv, p2HealthDiv);

let gameState = game.isOver;

play.onclick = () => (result.innerText = game.play(player1, player2));

document.addEventListener("keydown", function (e) {
  if (e.key == "q" && player2.health > 0) {
    player1.strike(player1, player2, player1.attackDmg);
    document.getElementById("p1attack").play();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "a" && player2.health > 0) {
    player1.heal(player1);
    document.getElementById("p1heal").play();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "p" && player1.health > 0) {
    player2.strike(player2, player1, player2.attackDmg);
     document.getElementById("p2attack").play();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "l" && player2.health > 0) {
    player2.heal(player2);
    document.getElementById("p2heal").play();
  }
});
