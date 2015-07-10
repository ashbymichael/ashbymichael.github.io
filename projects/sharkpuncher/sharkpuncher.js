function shark() {
  this.life = Math.floor(Math.random() * 10 + 15);
  this.attack = Math.floor(Math.random() * 7 + 5);
  this.bite = function(target) {
      n = (Math.floor(Math.random() * (this.attack ) + 1));
      target.life -= n;
      return console.log('shark ' + n);
    };
  this.punched = false;
  this.display = function() { return '********<br>Shark: <br>********<br>Life: ' + this.life + '<br>Attack: ' + this.attack; };
  this.stunPoints = stunPointGen();
};

function puncher() {
  this.life = Math.floor(Math.random() * 5 + 15);
  this.attack = Math.floor(Math.random() * 5 + 5);
  this.harpoon = function(target) {
      n = (Math.floor(Math.random() * (this.attack / 2) + (this.attack / 2)));
      target.life -= n;
      return console.log('puncher ' + n);
    };
  this.display = function() { return '********<br>Puncher: <br>********<br>Life: ' + this.life + '<br>Attack: ' + this.attack; };
  this.medicate = function() { this.life += Math.floor(Math.random() * 5 + 1) };
};

function stunPointGen() {
  var stunPointsHolder = [];
  for (i = 0; i < 5; i++) {
    stunPointsHolder.push(Math.floor(Math.random() * 20 + 1));
  };
  console.log('stunPoints: ' + stunPointsHolder);
  return stunPointsHolder;
}

var game = {
  startGame: function() {
    game.setDisplay();
    $('#display_lower').html('Do you want to punch this shark?');
    // game.setPlayerResponseControls();
  },
  sharkAttack: function() {
    console.log('sharkAttack function initiated');
    $('#button_sharkAttack').addClass('inactive')
    x = gamePuncher.life;
    gameShark.bite(gamePuncher);
    damage = x - gamePuncher.life;
    game.setDisplay();
    if (gamePuncher.life > 0) {
      $('#button_puncherHarpoon').removeClass('inactive');
      $('#display_lower').html('The shark bit you for ' + damage + ' points.<br />What are you going to do about it?');
    } else {
      $('#display_lower').append('<br />The shark bit you for ' + damage + ' points.');
      // move all of these to an external function, put that in the settimeout
      setTimeout( function(){ game.deathByShark() }, 2500);
    };
  },
  deathByShark: function() {
    $('#button_outer_left').html('<div id="button_reset" class="button">PUNCH<br />AGAIN!</div>');
    $('#button_reset').bind('click', function() { location.reload(); });
    $('#display_console').html('<br /><br /><br />GAME OVER<br /><br />You are dead because the shark bit you to death.<br />Punch a shark up in heaven for me, Puncher!');
  },
  puncherAttack: function() {
    console.log('harpoon function initiated');
    $('#button_puncherHarpoon').addClass('inactive');
    var x = gameShark.life;
    gamePuncher.harpoon(gameShark);
    game.setDisplay();
    if (gameShark.stunPoints.indexOf(gameShark.life) > -1) {
      console.log('Punch sequence initiated')
      $('#button_punch').removeClass('inactive').bind('click', function() { game.sharkPunch() });
      $('#display_lower').html("The shark is dazed! <br />It's time to PUNCH THAT SHARK!");
    } else if (gameShark.life > 0) {
      $('#display_lower').html('You harpooned the shark for ' + (x - gameShark.life) + ' points.');
      setTimeout( function(){ game.sharkAttack(); }, 1500 );
    } else {
      $('#button_outer_left').html('<div id="button_reset" class="button">PUNCH<br />AGAIN!</div>');
      $('#button_reset').bind('click', function() { location.reload(); });
      $('#display_console').html('<br /><br />GAME OVER<br /><br />The shark is dead, never to be punched. What have you done?<br />The price of punching is too high.');
    };
  },
  gameOver: function() { TODO },
  sharkPunch: function() {
    $('.button').addClass('inactive');
    $('#button_outer_left').html('<div id="button_reset" class="button">PUNCH<br />AGAIN!</div>');
    $('#button_reset').bind('click', function() { location.reload(); }).html;
    $('#display_console').html('<br /><br />CONGRATULATIONS!<br /><br />You punched a shark!');
  },
  setDisplay: function() {
    $('#puncher_display').html(gamePuncher.display());
    $('#shark_display').html(gameShark.display());
  }
  // setPlayerActiveControls: function() {
  //   $('#button_puncherHarpoon, #button_medicate').removeClass('disabled');
  //   $('#button_sharkAttack, #button_reset').addClass('disabled');
  // },
  // setPlayerResponseControls: function() {
  //   $('#button_puncherHarpoon, #button_medicate').removeClass('disabled');
  //   $('#button_sharkAttack, #button_reset').addClass('disabled');
  // },
  // medicate: function() {
  //   console.log('medicate initiated');
  //   gamePuncher.medicate();
  //   game.setDisplay();
  //   // game.setPlayerResponseControls();
  //   return "Aaaaah.  That's better.<br>Now, are you going to keep trying to punch that shark?";
  // },
};

$('#button_sharkAttack').bind('click', function() { game.sharkAttack(); }).html('YES!');
$('#button_puncherHarpoon').bind('click', function() { game.puncherAttack(); }).html('HARPOON!');
$('#button_reset').bind('click', function() { location.reload(); }).html('PUNCH<br /> AGAIN!');
$('#button_medicate').bind('click', function() { $('#display_lower').html(game.medicate()); }).html('MEDICATE!');


var gameShark = new shark();
var gamePuncher = new puncher();
game.startGame();




















//
