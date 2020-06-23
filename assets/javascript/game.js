let $ = function (id) {
  return document.getElementById(id)
}

const words = ["thor", "iron man", "black widow", "hulk", "captain america"];
const images = ["assets/images/thor.png", "assets/images/iron_man.png", "assets/images/Black_widow.png", "assets/images/hulk.png", "assets/images/captain_america.png"];
let word;
const img = document.createElement("img")
const parent = $("img")
let answerArray = [];
let userGuess;
let rightGuess = false;
let userRightGuess = 0;
let left = 9;
let wins = 0;
let losses = 0;


//start with blank
function blank() {
  for (i = 0; i < word.length; i++) {
      answerArray[i] = "_"
  }
  $("guess").innerHTML = answerArray.join(" ")
}

//select random word
function random() {
  let random = Math.floor(Math.random() * words.length);
  word = words[random]
  img.src = images[random]
}

//count wins
function countWins() {
  $("wins").innerHTML = wins
}

//count losses
function countLoses() {
  $("losses").innerHTML = losses
}

//how many tries left
function triesLeft() {
  $("left").innerHTML = left
}



//Letters Already Guessed
function wrongLetter(char) {
  $("wrong").innerHTML += char + ", "
}

// resent function
function initialGame() {
  if ($("winImage")) {
      $("winImage").remove()
  }

  left = 9;
  answerArray = [];
  $("wrong").innerHTML = "";
  userRightGuess = 0
  rightGuess = false;
  triesLeft()
  random()
  blank()
}

// call initial function
initialGame()
countWins()
countLoses()

//check letter
function showLetter(char, str) {
  for (let j = 0; j < str.length; j++) {
      if (char === str[j]) {
          rightGuess = true
          answerArray.splice(j,1,char)
          userRightGuess++
      }
  }
  $("guess").innerHTML = answerArray.join(" ")
}

//check length
let matchLength = function() {
  if (word.length === userRightGuess) return true
  else return false
}

//user guess
document.onkeyup = function(event) {
  userGuess = event.key.toLowerCase();

  showLetter(userGuess, word)
  
  if (rightGuess) {
      rightGuess = false
      if (matchLength()) {
          let audio = new Audio('assets/sounds/Ta_da.mp3');
          audio.play()
          img.setAttribute("id","winImage")
          parent.appendChild(img)
          wins++
          countWins()
          setTimeout(initialGame, 2000)
      
      }
  } else {
      left--
      if (left < 1) {
          let audio = new Audio('assets/sounds/Error.mp3');
          audio.play()
          initialGame()
          losses++
          countLoses()
      } else {
          let audio = new Audio('assets/sounds/Error.mp3');
          audio.play()
          wrongLetter(userGuess)
          triesLeft()
      }

  }
}