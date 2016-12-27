document.addEventListener("DOMContentLoaded", function () {

  var squares = document.querySelectorAll(".square");
  var columns = document.querySelectorAll(".column");

  var startStopButton = document.querySelector(".start-stop-button");
  var clearButton = document.querySelector(".clear-button");
  var memoryButton = document.querySelector(".memory-button");
  var memSlotButtons = document.querySelectorAll(".memory-slot-button");
  var isInSaveMode = false;
  var memSlots = [null, null, null];

  var audios = document.querySelectorAll("audio");
  var intervalId = null;
  var currCol;
  var prevColIndex = null;
  var currColIndex = 0;
  var isPlaying = false;

  function play () {
    var currCol = columns[currColIndex];
    currCol.classList.add("highlight");
    if (prevColIndex !== null) {
      columns[prevColIndex].classList.remove("highlight");
    }
    var currColSquares = currCol.children;
    for (var i=0; i<currColSquares.length; i++) {
      if (currColSquares[i].classList.contains("on")) {
        audios[i].currentTime = 0;
        audios[i].play();
      }
    }
    prevColIndex = currColIndex;
    currColIndex = (currColIndex + 1) % 8;
  }

  function startStop () {
    if (isPlaying) {
      window.clearInterval(intervalId);
      isPlaying = false;
    }
    else {
      intervalId = window.setInterval(play, 250);
      isPlaying = true;
    }
  }

  function clear () {
    squares.forEach(s => s.classList.remove("on"));
  }

  function saveState (slotNumber) {
    // convert slotNumber to correct index of memSlots array
    var slotIndex = + slotNumber - 1;
    memSlots[slotIndex] = Array.from(squares).map(s => s.classList.contains("on"));
    console.log("saved");
    console.log(memSlots);
    memoryButton.classList.remove("save-mode");
    memSlotButtons[slotIndex].classList.add("full");
    isInSaveMode = false;
  }

  function loadState (slotNumber) {
    // convert slotNumberStr to correct index of memSlots array
    var slotIndex = + slotNumber - 1;
    if (memSlots[slotIndex] == null) {
      console.log("empty slot.");
      return
    }
    else {
      for (var i=0, n=squares.length; i<n; i++) {
        if (memSlots[slotIndex][i] === true) {
          squares[i].classList.add("on");
        }
        else {
          squares[i].classList.remove("on");
        }
      }
    }
  }

  startStopButton.addEventListener("click", startStop);
  clearButton.addEventListener("click", clear);

  memoryButton.addEventListener("click", function () {
    isInSaveMode = !isInSaveMode;
    this.classList.toggle("save-mode");
  });

  memSlotButtons.forEach(b => b.addEventListener("click", function (e) {
    if (isInSaveMode) {
      saveState(this.dataset["slot"]);
    }
    else {
      loadState(this.dataset["slot"]);
    }
  }));

  squares.forEach(s => s.addEventListener("click", function () {
    this.classList.toggle("on");
  }));

});
