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
        game.load.image('background', '');
    }
	
	var question;
	var cont;
	var opt1;
	var opt2;
	var opt3;
	var waitResp = false;
	var progress = 0;
	
    function create() {
        
        style = {font: "13px Arial", fill: "#FFFFFF", align: "center"};
        game.add.sprite(0, 0, 'background');
        question = game.add.text(50, 420, 'Welcome to the interview.', style);
        move = game.add.text(50, 435, 'Press SPACE to continue', style);
        
        cursors = game.input.keyboard.createCursorKeys();
    }

    function collision(){
        counter++;
    }
    
    function win(){
        game.add.text(100,100, "You Win!!!", style);
    }

    function update() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACE) && !waitResp){
            progress++;
        }
        
        if(progress === 1){
        	question.setText("Tell me a little about yourself.");
        	move.setText("");
        	opt1 = game.add.text(50, 450, "1) I'm a hard worker who likes to spend his free time working for the company.", style);
        	opt2 = game.add.text(50, 465, "2) I always get my work done in a timely manner, in my free time I like socializing with frineds.", style);
        	opt3 = game.add.text(50, 480, "3) I am from the Underworld hear to enslave the entire human race!", style);
        	while(true){
        		if(game.input.keyboard.isDown(Phaser.Keyboard.
        	}
        }
    }
};
