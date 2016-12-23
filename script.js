document.addEventListener("DOMContentLoaded", function () {

  var squares = document.querySelectorAll(".square");
  var columns = document.querySelectorAll(".column");
  var button = document.querySelector(".start-stop-button");
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
      button.textContent = "start";
      isPlaying = false;
    }
    else {
      intervalId = window.setInterval(play, 250);
      button.textContent = "stop";
      isPlaying = true;
    }
  }

  button.addEventListener("click", startStop)

  squares.forEach(s => s.addEventListener("click", function () {
    this.classList.toggle("on");
  }));

});
