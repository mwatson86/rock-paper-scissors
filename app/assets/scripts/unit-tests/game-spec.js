
/* global game */

describe('rock, paper, scissors', function() {

    it('game.options contains defaults', function() {

    	expect(game.options).toEqual(['rock', 'paper', 'scissors']);
    }); 

    it('game.players is an empty array', function() {

    	expect(game.players).toEqual([]); 
    });
});
