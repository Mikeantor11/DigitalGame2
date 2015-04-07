window.onload = function () {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic

    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    "use strict";

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

    function preload() {
    }
	
	var timer = game.time;
	var compare;
	var out;
	var output;
	var highscore = 10000000000;
	var text;
	var text2;
	var text3;
	var text4;
	var text5;
	var style;
	var response = false;
	
    function create() {
        
        style = {font: "25px Arial", fill: "#FFFFFF", align: "center"};
        
        game.stage.backgroundColor = "#000000";
        text = game.add.text(5, 5, "Press SPACE when the screen changes color!", style);
        text2 = game.add.text(10, 40, "Press ENTER to begin.", style);
        text3 = game.add.text(5, 75, "", style);
        text4 = game.add.text(5, 110, "", style);
        text5 = game.add.text(5, 145, "", style);
    }
    
    function round (){
    	game.stage.backgroundColor = "#e3ff00";
    	var start = Date.now();
    	var wait = Math.floor((Math.random() * 5000) + 1000);
    	while(Date.now() - start < wait){
    		text5.setText("Get Ready!");
    	}
    	text5.setText("Now!");
    	game.stage.backgroundColor = "#00FF1E";
    	compare = Date.now();
    	response = true;
    	return compare;
	}

    function update() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			out = round();
		}
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && response){
			output = Date.now() - out;
			output = output/1000;
			game.stage.backgroundColor = "#000000";
			text4.setText("Your time was: " + output + "!");
			text5.setText("");
			response = false;
		}
		
		if(output < highscore){
			highscore = output;
			text3.setText("Highscore: " + highscore);
		}
	} 
};
