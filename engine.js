/**
 * Model and controller for the Deutsche Verben web app
 *
 * @author Ilya Ilyankou - Guillaume Rousselot (french translation)
 * @version 0.9
 */

var index = 0; // index of verb in dictionary
var form = 0;  // first, second or third (0, 1, 2 or 3 respectively)
var show = 0;  // first, second or third (0, 1, 2 or 3 respectively)
var correct = 0; // counter of correct answers
var altogether = 0;  // counter of all attempts
var inputTag = '<input type="text" id="myInput" autocomplete="off">';
var level = "";
var timerOk = 0; // Timer to freeze display if answer is OK
var timerKo = 0; // Timer to freeze display if answer is KO

// Initializing the dictionary
var dict =
[
    ['empfehlen', 'empfahl', 'hat ... empfohlen', 'recomander']
    ['nehmen', 'nahm', 'hat ... genommen', 'prendre'],
    ['sprechen', 'sprach', 'hat ... gesprochen', 'parler'],
    ['treffen', 'traf', 'hat ... getroffen', 'rencontrer'],
    ['helfen', 'half', 'hat ... geholfen', 'aider'],
    ['werfen', 'warf', 'hat ... geworfen', 'jeter'],
    ['gehen', 'ging', 'ist ... gegangen', 'aller'],
    ['stehen', 'stand', 'hat/ist ... gestanden', 'être debout'],
];

function generateVerb() {
  hideAnswer();

    index = Math.floor(Math.random() * dict.length);
    form = Math.floor(Math.random() * 4);
    
  var entry = dict[index];

  if(level == "Hard")
  {
    do {show = Math.floor(Math.random() * 4);}while(form==show);
    
    $('#first').text("[Infinitiv]");
    $('#second').text("[Präteritum]");
    $('#third').text("[Perfekt]");
    $('#local').text("[Français]");

    switch (show) {
      case 0:
        $('#first').text(entry[0]);
        break;
      case 1:
        $('#second').text(entry[1]);
        break;
      case 3:
        $('#local').text(entry[3]);
        break;
      default:
        $('#third').text(entry[2]);
    }
  }
  else
  {
    $('#first').text(entry[0]);
    $('#second').text(entry[1]);
    $('#third').text(entry[2]);
    $('#local').text(entry[3]);
  }

  switch (form) {
    case 0:
      $('#first').html(inputTag);
      break;
    case 1:
      $('#second').html(inputTag);
      break;
    case 3:
      $('#local').html(inputTag);
      break;
    default:
    $('#third').html(inputTag);
  }

    $('#myInput').focus();
}


function checkVerb() {
    var myInput = $("#myInput").val().trim().toLowerCase();
  myInput = '$' + myInput + '$';

  //var correctInput = '$' + dict[index][form].replace('/', '$') + '$';
  var correctInput = '$' + dict[index][form] + '$'; // Needs all possibilities
  var timer = 0;

  if(level == "Hard")
  {
    var entry = dict[index];
    switch (form) {
      case 0:
        $('#second').text(entry[1]);
        $('#third').text(entry[2]);
        $('#local').text(entry[3]);
        break;
      case 1:
        $('#first').text(entry[0]);
        $('#third').text(entry[2]);
        $('#local').text(entry[3]);
        break;
      case 3:
        $('#first').text(entry[0]);
        $('#second').text(entry[1]);
        $('#third').text(entry[2]);
        break;
      default:
        $('#first').text(entry[0]);
        $('#second').text(entry[1]);
        $('#local').text(entry[3]);
    }
  }

  if (correctInput.indexOf(myInput) > -1) {
    correct++;
    $("#myInput").css({backgroundColor: 'YellowGreen'});
    timer = timerOk;
  } else {
    $('#myInput').css({backgroundColor: 'DarkSalmon'});
    showAnswer();
    timer = timerKo;
  }

  setTimeout(generateVerb, timer);

  updateCounters();
}

function updateCounters() {
  $('#counterCorrect').text(correct);
  $('#counterAltogether').text(altogether);
}

function showAnswer() {
  $('#answer').text(dict[index][form]).show();
}

function hideAnswer() {
  $('#answer').hide();
}

$(document).ready(function() {
    level = $("#level").attr("value");
    if(level == "Hard")
    {
      timerOk = 3000;
      timerKo = 4000;
    }
    else
    {
      timerOk = 1500;
      timerKo = 3000;
    }

    generateVerb();

    $("form").submit(function () {
    altogether++;
        if ($("#myInput").attr("value") == "") {return false;}
        $("#myInput").attr({disabled: 'disabled'});
        checkVerb();
        return false;
    });
});
