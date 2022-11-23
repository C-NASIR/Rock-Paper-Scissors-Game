// getting the DOM elements we will need later
const hideModel = document.querySelector("#model-header button");
const showModel = document.getElementById("rules");
const scoreNumber = document.getElementById("score-number");
const emptyElement = document.getElementsByClassName("empty")[0];
const playAgainContainer = document.getElementsByClassName(
  "play-again-container"
)[0];
const userRings = document.getElementsByClassName("outer-ring")[0];
const comRings = document.getElementsByClassName("outer-ring")[1];
const playButton = document.getElementById("play-again");
const resultText = document.getElementById("result-text");

const [playerIcon, ComputerIcon] = document.querySelectorAll("#result img");
const imageLocationHash = new Map();
imageLocationHash.set("scissors", "../../images/icon-scissors.svg");
imageLocationHash.set("rock", "../../images/icon-rock.svg");
imageLocationHash.set("paper", "../../images/icon-paper.svg");

// values for the user pick and computer pick
let userPick, computerPick;

// adding listeners
window.addEventListener("load", begin); //runs as soon as the page loads
showModel.addEventListener("click", toggleModel);
hideModel.addEventListener("click", toggleModel);
playButton.addEventListener("click", playAgain);

// ** Functions to be run for ** //
// runs as soon as the page loads to do animations cand call get params, random guess and checks score
function begin() {
  displayBrowserErrorForSafari();
  emptyElement.classList.add("scaleDown");
  ComputerIcon.classList.remove("hidden");
  playAgainContainer.classList.remove("hidden");
  setTimeout(() => {
    emptyElement.classList.remove("empty");
    emptyElement.classList.remove("scaleDown");
    ComputerIcon.classList.add("scaleUp");
    playAgainContainer.classList.remove("scaleDown");
    pickRandomChoice();
    checkScore();
  }, 2000);

  getParams();
}

// Gets the score and user pick from the url and calls appropraite methos
function getParams() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("pick") || "rock";
  userPick = name;
  const source = imageLocationHash.get(name);
  populateScore(params.get("score"));
  populateChosenIcon(playerIcon, source, name);
}

// Populates the score element with the given score or defaults to zero
function populateScore(score) {
  scoreNumber.textContent = parseInt(score) || 0;
}

// Populates the chosen gasture with image and styles
function populateChosenIcon(icon, source, name) {
  icon.src = source;
  icon.classList.add(name);
}

// Picks a random guess between 0 - 3 for the computer turn
function pickRandomChoice() {
  const choices = Array.from(imageLocationHash.keys());
  const index = Math.floor(Math.random() * choices.length);
  computerPick = choices[index];
  const source = imageLocationHash.get(choices[index]);
  populateChosenIcon(ComputerIcon, source, choices[index]);
}

// Checks for the winner (player or the computer)
function checkScore() {
  const score = parseInt(scoreNumber.textContent);
  // User picks first
  if (userPick === "scissors" && computerPick === "paper")
    displayGameResult(score + 1, "YOU WON", true);

  if (userPick === "scissors" && computerPick === "rock")
    displayGameResult(score - 1, "YOU LOSE", false);

  if (userPick === "rock" && computerPick === "paper")
    displayGameResult(score - 1, "YOU LOSE", false);

  if (userPick === "rock" && computerPick === "scissors")
    displayGameResult(score + 1, "YOU WON", true);

  if (userPick === "paper" && computerPick === "rock")
    displayGameResult(score + 1, "YOU WON", true);

  if (userPick === "paper" && computerPick === "scissors")
    displayGameResult(score - 1, "YOU LOSE", false);

  if (userPick === computerPick) resultText.textContent = "TIED";
}

// Displays the result of the winner and message
function displayGameResult(score, message, userWins) {
  scoreNumber.textContent = score;
  resultText.textContent = message;
  if (userWins) userRings.classList.add("scale-up-rings");
  else {
    comRings.classList.add("scale-up-rings");
    playButton.classList.add("red");
  }
}

// runs when user clicks play again button and redirects them to the home page
function playAgain() {
  window.location.replace(
    "../../index.html?" + "score=" + scoreNumber.textContent
  );
}

// Toggles the model
function toggleModel() {
  const model = document.getElementById("rules-model");
  model.classList.toggle("hidden");
}

// Returns what kind of browser is being used
function BrowserDetect() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }
  return browserName;
}

// Displays an error when using safari browser becuase of animation incompatibility
function displayBrowserErrorForSafari() {
  const browserName = BrowserDetect();
  if (browserName === "safari")
    document.getElementById("notice").classList.remove("hidden");
  console.log(browserName === "safari");
}
