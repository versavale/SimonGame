$(document).ready(function() {
  intro();
  $(".error").hide();
  $(".lvl-box")
    .show()
    .text("Level - -");
  $(".onoffswitch").show();

  var playerMoves = [];
  var tempVal;
  var AIArray = [];
  var counter = 0;
  var gameMode = true;
  var repetition = 1;
  var click = true;

  ///BUTTONS///
  //starting the game creates an array with 20 AI move//
  $("#start").click(function() {
    mode();
    console.log(counter + " counter");
    if (counter === 20) {
      win();
    } else {
      $(".error").hide();
      counter++;
      $(".lvl-box")
        .show()
        .css("background-color", "black")
        .text("Level " + counter);
      randomMoves();
      console.log(AIArray + " AIArray");
      setTimeout(function() {
        animate(AIArray);
      }, 500);
      playerMoves = [];
    }
  });

  $("#reset").click(function() {
    reset();
  });

  //switch implementation//
  function mode() {
    if ($(".onoffswitch-checkbox").prop("checked") === true) {
      gameMode = true;
      console.log(gameMode);
    } else {
      gameMode = false;
      console.log(gameMode);
    }
  }

  //___________________PLAYER___________________//

  //OVERALL PLAYER MOVES//
  function playerClicks() {
    playerMoves.push(tempVal);
    console.log(playerMoves + " playermoves");
    if (gameMode === true) {
      compare(AIArray, playerMoves);
    } else {
      compareEasy(AIArray, playerMoves);
    }
    tempVal = "";
    stopMoves(playerMoves);
  }

  //player clicks GREEN = 1//
  $("#one").click(function() {
    var time1p = 100;
    var bg = $("#one").css("background");
    $("#one").css("background", "#13ff7c");
    setTimeout(function() {
      $("#one").css("background", bg);
      var sound = document.getElementById("1-au");
      sound.play();
    }, time1p);
    tempVal = $(this).attr("value");
    playerClicks();
  });

  //player clicks RED = 2//
  $("#two").click(function() {
    var time2p = 100;
    var bg2 = $("#two").css("background");
    $("#two").css("background", "#ff4c4c");
    setTimeout(function() {
      $("#two").css("background", bg2);
      var sound = document.getElementById("2-au");
      sound.play();
    }, time2p);
    tempVal = $(this).attr("value");
    playerClicks();
  });

  //player clicks YELLOW = 3//
  $("#three").click(function() {
    var time3p = 100;
    var bg3 = $("#three").css("background");
    $("#three").css("background", "#fed93f");
    setTimeout(function() {
      $("#three").css("background", bg3);
      var sound = document.getElementById("3-au");
      sound.play();
    }, time3p);
    tempVal = $(this).attr("value");
    playerClicks();
  });

  //player clicks BLUE = 4//
  $("#four").click(function() {
    var time4p = 100;
    var bg4 = $("#four").css("background");
    $("#four").css("background", "#1c8cff");
    setTimeout(function() {
      $("#four").css("background", bg4);
      var sound = document.getElementById("4-au");
      sound.play();
    }, time4p);
    tempVal = $(this).attr("value");
    playerClicks();
  });

  //__________________SIMON_______________//

  //random AI moves generator
  function randomMoves() {
    var arrayMax = 1;
    for (var i = 0; i < arrayMax; i++) {
      AIArray.push((Math.floor(Math.random() * (4 - 1 + 1)) + 1).toString());
    }
  }

  //AI plays GREEN = 1//
  function AIplays1() {
    var time1 = 200;
    var bg = $("#one").css("background");
    $("#one").css("background", "#13ff7c");
    setTimeout(function() {
      $("#one").css("background", bg);
      var sound1 = document.getElementById("1-au");
      sound1.play();
    }, time1);
  }

  //AI plays RED = 2//
  function AIplays2() {
    var time2 = 200;
    var bg2 = $("#two").css("background");
    $("#two").css("background", "#ff4c4c");
    setTimeout(function() {
      $("#two").css("background", bg2);
      var sound2 = document.getElementById("2-au");
      sound2.play();
    }, time2);
  }

  //AI plays YELLOW = 3//
  function AIplays3() {
    var time3 = 200;
    var bg3 = $("#three").css("background");
    $("#three").css("background", "#fed93f");
    setTimeout(function() {
      $("#three").css("background", bg3);
      var sound3 = document.getElementById("3-au");
      sound3.play();
    }, time3);
  }

  //AI plays BLUE = 4//
  function AIplays4() {
    var time4 = 200;
    var bg4 = $("#four").css("background");
    $("#four").css("background", "#1c8cff");
    setTimeout(function() {
      $("#four").css("background", bg4);
      var sound4 = document.getElementById("4-au");
      sound4.play();
    }, time4);
  }

  //AI plays its moves//
  function animate(arr) {
    for (var i = 0; i < arr.length; i++) {
      (function(i) {
        setTimeout(function() {
          if (arr[i] === "1") {
            AIplays1();
          } else if (arr[i] === "2") {
            AIplays2();
          } else if (arr[i] === "3") {
            AIplays3();
          } else if (arr[i] === "4") {
            AIplays4();
          }
        }, 700 * i);
      })(i);
    }
  }

  //Comparing the two arrays - move by move AND final check to produce new array add-on//
  function compare(arr1, arr2) {
    var matchArr = [];
    var i = arr1.length; //I need this to stop the loop
    var x = arr2.length;

    while (x--) {
      if (arr1[x] !== arr2[x]) {
        console.log("NO!");
        $(".error").show();
        $(".lvl-box").css("background-color", "red");
        var sound4 = document.getElementById("fail");
        sound4.volume = 0.1;
        sound4.play();
        setTimeout(function() {
          reset();
        }, 1000);
      } else {
        matchArr.push(1);
        console.log(matchArr + " matchArr");
      }
    }
    check(arr1, matchArr);
  }

  //compare easy mode//
  function compareEasy(arr1, arr2) {
    var matchArrEasy = [];
    var j = arr1.length; //I need this to stop the loop
    var k = arr2.length;

    if (repetition === 15) {
      compare(AIArray, playerMoves);
    } else {
      while (k--) {
        if (arr1[k] !== arr2[k]) {
          console.log("NO!");
          setTimeout(function() {
            $(".error")
              .show()
              .css("color", "red")
              .text("Try again!");
          }, 400);
          var sound4 = document.getElementById("fail");
          sound4.volume = 0.1;
          sound4.play();
          setTimeout(function() {
            animate(AIArray);
            repetition++;
            console.log(repetition + " repetition update");
          }, 1000);
          playerMoves = [];
        } else {
          matchArrEasy.push(1);
          console.log(matchArrEasy + " matchArr");
        }
      }
    }
    check(arr1, matchArrEasy);
  }

  function check(arr, match) {
    if (arr.length === match.length) {
      if (match.indexOf(2) === -1) {
        console.log("IDENTICAL");
        setTimeout(function() {
          $("#start").trigger("click");
        }, 500);
      }
    }
  }

  //you can stop the game at any time (except when simon is playing)//
  function reset() {
    $(".error")
      .show()
      .css("color", "black")
      .text("PRESS PLAY TO START");
    $(".onoffswitch").show();
    $("#one").css("background", "#00a74a");
    $("#two").css("background", "#9f0f17");
    $("#three").css("background", "#cca707");
    $("#four").css("background", "#094a8f");
    AIArray = [];
    playerMoves = [];
    tempVal;
    AIArray = [];
    counter = 0;
    repetition = 1;
  }

  // function intro//
  function intro() {
    setTimeout(function() {
      AIplays1();
    }, 400);
    setTimeout(function() {
      AIplays4();
    }, 400);
    setTimeout(function() {
      AIplays2();
    }, 800);
    setTimeout(function() {
      AIplays3();
    }, 800);
  }

  function win() {
    $(".error")
      .css("color", "green")
      .show()
      .text("YOU WON!");
    $(".lvl-box").css("background-color", "green");
    var sound5 = document.getElementById("win");
    sound5.volume = 0.5;
    sound5.play();
    setTimeout(function() {
      reset();
    }, 7000);
    playerMoves = [];
  }

  //very end do not delete//
});

