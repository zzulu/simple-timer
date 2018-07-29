document.addEventListener('DOMContentLoaded', function(){
  var timer = new Timer();
  var values = document.querySelector('#countdown .values');
  var audio = new Audio('assets/sounds/analog-watch-alarm.mp3');
  var targetAchieved = false;
  var seconds = 300;

  initTimer(seconds);

  // Click or press 'Enter' to start
  document.getElementById('countdown').addEventListener('click', function(e){
    handleTimer();
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode == '13') {
      handleTimer();
    }
  });

  // Initialize Timer
  function initTimer(s) {
    timer.start({countdown: true, startValues: {seconds: s}});
    values.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    timer.pause();
  }

  function handleTimer() {
    if (targetAchieved) {
      targetAchieved = false;
      values.classList.remove("timeover");
      audio.pause(); audio.currentTime = 0;
      timer.stop(); timer.reset();
      return false;
    } 

    if (timer.isRunning()) {
      timer.stop(); timer.reset();
      return false;
    }

    timer.start();
    return true;
  }

  // Add listeners for EasyTimer.js events
  timer.addEventListener('secondsUpdated', function(e) {
    values.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
  });

  timer.addEventListener('targetAchieved', function(e) {
    targetAchieved = true;
    values.classList.add("timeover");
    values.innerHTML = 'Time Over';
    audio.play();
  });

  timer.addEventListener('reset', function (e) {
    values.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    timer.pause();
  });
});
