// getting the DOM elements we will need later
const hideModel = document.querySelector("#model-header button");
const showModel = document.getElementById("rules");
const selection = document.getElementById("selection");
const gestures = document.querySelectorAll("#selection > .gesture");
const playAgain = document.querySelector("#complete-result ~ button");

const resultSection = document.getElementById("result");
const completeResult = document.getElementById("complete-result");

const scoreNumber = document.getElementById("score-number");

//Adding listeners to the DOM elements
window.addEventListener("load", getParams); // function runs when page loads
showModel.addEventListener("click", toggleModel);
hideModel.addEventListener("click", toggleModel);

// Adding gestures to the click event by iteration
for (const gesture of gestures) gesture.addEventListener("click", userSelected);

// ** Functions to be run for ** //
// excutes when the user clicks on a gesture (scissors, rock, or paper )
function userSelected(e) {
  const scoreNumber = document.getElementById("score-number");
  const score = scoreNumber.textContent;
  const classes = e.target.classList;
  if (classes.contains("scissors")) goToResults(score, "scissors");
  if (classes.contains("rock")) goToResults(score, "rock");
  if (classes.contains("paper")) goToResults(score, "paper");
}

// Runs when the page is loaded, to get the score from the result page for dafaults to 0
function getParams() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const score = params.get("score");
  scoreNumber.textContent = score || 0;
}

// runs after userSelected when we want to send the user to the select page
function goToResults(score, pick) {
  // (A) VARIABLES TO PASS
  window.open(
    "/pages/result/result.html?" + "pick=" + pick + "&score=" + score,
    self
  );
}

// Toggles the model (shows and hides)
function toggleModel() {
  const model = document.getElementById("rules-model");
  model.classList.toggle("hidden");
}
