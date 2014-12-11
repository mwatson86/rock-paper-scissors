/* global $ */

// game obj defined
var game = {};

// game options
game.options = ['rock', 'paper', 'scissors'];
	
// players
game.players = [];

// rules
game.rules = [
	{
		rule: 'rock|paper',
		result: 1
	},
	{
		rule: 'rock|scissors',
		result: 0
	},
	{
		rule: 'paper|rock',
		result: 0
	},
	{
		rule: 'paper|scissors',
		result: 1
	},
	{
		rule: 'scissors|rock',
		result: 1
	},
	{
		rule: 'scissors|paper',
		result: 0
	}
];

// init game
game.init = function() {

	// bind event handlers
	this.bindEventHandlers();
};

// bind event handlers
game.bindEventHandlers = function() {

	// set this to self
	var self = this;

	// onclick of play
	$('.play').on('click', function(e) {

		var el = $(this),
			choice = el.data('choice');

		// play
		self.play(choice);
	});

	// onclick of automate (computer vs computer)
	$('#automate').on('click', function(e) {

		// automate
		self.automate();
	});

	// onclick reset game
	$('#reset').on('click', function(){

		// reset
		self.reset();
	});
};

// play game
game.play = function(choice) {

	// pass choice into player / choice
	this.players.push({
		player: 'Player 1',
		choice: choice
	});

	// push player / automated choice (player 2)
	this.players.push({
		player: 'Computer player 1',
		choice: this.automateChoice()
	});

	// reveal results
	this.setStage();
};

// automate game
game.automate = function() {

	// define vars
	var players = 2;

	// assign choices to both players
	for (var i = 0; i < players; i++) {

		// push player / automated choices
		this.players.push({
			player: 'Computer player ' + (i + 1),
			choice: this.automateChoice()
		});
	}

	// reveal results
	this.setStage();
};

// automate choice
game.automateChoice = function() {
	
	// get index of random choice
	var index = Math.floor(Math.random() * this.options.length);

	// return automated choice
	return this.options[index];
};

game.setStage = function() {

	var resultEl = $('.result.module');

	// loop through players
	for (var i = 0; i < this.players.length; i++) {

		// html to go within component
		var html = '<h3 class="result--player">' + this.players[i].player + '</h3>';
			html += '<p class="result--choice">' + this.players[i].choice + '</p>';

		// append html to component
		resultEl.find('.component').eq(i).html(html);
	} 

	this.revealWinner();
};

// reveal winner
game.revealWinner = function() {

	// define vars
	var optionEl = $('.option.module'),
		resultEl = $('.result.module'),
		result;

	// conditional statements
	if (this.players[0].choice === this.players[1].choice) {

		result = 'It is a tie';
	}
	else {

		// loop through rules
		for (var i = 0; i < this.rules.length; i++) {

			// split rule
			var rule = this.rules[i].rule.split('|');

			// conditional statement up against rules
			if ((rule[0] === this.players[0].choice) && 
				(rule[1] === this.players[1].choice)) {

				result = this.players[this.rules[i].result].player + ' wins';

				// break out of loop
				break;
			}
		}
	}

	// add result text
	resultEl.find('.result--text').text(result);

	// hide option module
	optionEl.hide();

	// prepend result and show module
	resultEl.show();
};

// reset game
game.reset = function() {
	
	// define vars
	var optionEl = $('.option.module'),
		resultEl = $('.result.module');

	// set players to nothing
	this.players = [];

	// hide results
	resultEl.hide();

	// show options
	optionEl.show();
};

$(document).ready(function() {

	// init game of rock, paper, scissors
	game.init();
});