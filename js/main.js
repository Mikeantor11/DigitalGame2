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
        game.load.image('background', 'assets/Art/birdInterScene.png');
        game.load.image('noticed', 'assets/Art/noticedInter.png');
        game.load.image('almost', 'assets/Art/almostCaughtInter.png');
        game.load.image('caught', 'assets/Art/caughtInter.png');
        game.load.spritesheet("sheet", 'assets/Art/birdInterSpriteSheet.png', 800, 600);
    }
	
    var instructions;
    var opt1;
    var style;
    var cursors;
    var move;
    var background;
    var numbers = [];
    var response = [];
	var progress = 1;
	var generate = true;
	var show = false;
	var wait = false;
	var input = false;
	var compare = false;
	var diplay;
	var random = new RandomDataGenerator();
	var 0key;
	var 1key;
	var 2key;
	var 3key;
	var 4key;
	var 5key;
	var 6key;
	var 7key;
	var 8key;
	var 9key;
	var enter;
	var counter = 0;
	
    function create() {
        
        style = {font: "13px Arial", fill: "#FFFFFF", align: "center"};
        background = game.add.sprite(0, 0, 'sheet');
        instructions = game.add.text(50, 20, 'Remember the Numbers shown!', style);
        move = game.add.text(75, 35, 'Press Down to continue', style);
        opt1 = game.add.text(50, 50, "", style);
        
        cursors = game.input.keyboard.createCursorKeys();
        0key = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        1key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        2key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        3key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        4key = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        5key = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        6key = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        7key = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        8key = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
        9key = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
    }

    function update() {
    
        background.frame = seen;

			opt1.setText("Press the corresponding numbers in order.");
			if(cursors.down.isDown){
			if(generate){
				numbers = [];
				for(int i = 0; i < progress; i++){
        			numbers[i] = random.between(0,9);
        		}
        		response = [];
        		generate = false;
        		show = true;
        	}
        	}
        	
        	if (show){
        		for(int i = 0; i < numbers.length; i++){
        			display = display + numbers[i].toString + ' ';
        		}
        		opt1.setText(display);
        		show  = false;
        		wait = true;
        	}
        	
        	if(wait){
        		if(cursors.down.isDown){
        			wait = false;
        			input = true;
        		}
        	}
	   	
        while(input){
        	if(0key.isDown){
        		response[counter] = 0;
        		counter++;
        	}
        	
        	if(1key.isDown){
        		response[counter] = 1;
        		counter++;
        	}
        	
        	if(2key.isDown){
        		response[counter] = 2;
        		counter++;
        	}
        	
        	if(3key.isDown){
        		response[counter] = 3;
        		counter++;
        	}
        	
        	if(4key.isDown){
        		response[counter] = 4;
        		counter++;
        	}
        	
        	if(5key.isDown){
        		response[counter] = 5;
        		counter++;
        	}
        	
        	if(6key.isDown){
        		response[counter] = 6;
        		counter++;
        	}
        	
        	if(7key.isDown){
        		response[counter] = 7;
        		counter++;
        	}
        	
        	if(8key.isDown){
        		response[counter] = 8;
        		counter++;
        	}
        	
        	if(9key.isDown){
        		response[counter] = 9;
        		counter++;
        	}
        	
        	if(enter.isDown){
        		input = false;
        		compare = true;
        	}
        }
        
        if(compare){
        	if(response = numbers){
        		opt1.setText("Congratulations!");
        		generate = true;
        	}
        	
        	else{
        		opt1.setText("I'm sorry you got it wrong :(");
        	}
        	compare  = false;
        }
    }
};
