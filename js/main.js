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
    var opt2;
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
	var delay = false;
	var display = '';
	var random = new Phaser.RandomDataGenerator();
	var key0;
	var key1;
	var key2;
	var key3;
	var key4;
	var key5;
	var key6;
	var key7;
	var key8;
	var key9;
	var keyF;
	var counter = 0;
	
    function create() {
        
        style = {font: "25px Arial", fill: "#FFFFFF", align: "center"};
        background = game.add.sprite(0, 0, 'sheet');
        instructions = game.add.text(50, 20, 'Remember the Numbers shown!', style);
        move = game.add.text(75, 50, 'Press Down to continue', style);
        opt1 = game.add.text(50, 80, "", style);
        opt2 = game.add.text(50, 110, "", style);
        
        cursors = game.input.keyboard.createCursorKeys();
        key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
        key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
        keyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
        
    }

    function update() {

			opt1.setText("Press the corresponding numbers in order.");
			if(cursors.down.isDown){
			if(generate){
				numbers = [];
				for(var i = 0; i < progress; i++){
        			numbers[i] = random.between(0,9);
        		}
        		response = [];
        		generate = false;
        		show = true;
        	}
        	}
        	
        	if (show && !cursors.down.isDown){
        		for(var i = 0; i < numbers.length; i++){
        			display = display + numbers[i].toString() + ' ';
        		}
        		opt2.setText(display);
        		show  = false;
        		wait = true;
        	}
        	
        	if(wait){
        		if(cursors.down.isDown){
        			wait = false;
        			delay = true;
        			opt2.setText('');
        		}
        	}
        	
        	if(delay && !cursors.down.isDown){
        		delay = false;
        		input = true;
        	}
	   	
        if(input){
        	if(key0.isDown){
        	if(!key0.isDown){
        		response[counter] = 0;
        		counter++;
        		}
        	}
        	
        	if(key1.isDown){
        		response[counter] = 1;
        		counter++;
        	}
        	
        	if(key2.isDown){
        		response[counter] = 2;
        		counter++;
        	}
        	
        	if(key3.isDown){
        		response[counter] = 3;
        		counter++;
        	}
        	
        	if(key4.isDown){
        	if(!key4.isDown){
        		response[counter] = 4;
        		counter++;
        		}
        	}
        	
        	if(key5.isDown){
        		response[counter] = 5;
        		counter++;
        	}
        	
        	if(key6.isDown){
        		response[counter] = 6;
        		counter++;
        	}
        	
        	if(key7.isDown){
        		response[counter] = 7;
        		counter++;
        	}
        	
        	if(key8.isDown){
        		response[counter] = 8;
        		counter++;
        	}
        	
        	if(key9.isDown){
        		response[counter] = 9;
        		counter++;
        	}
        	
        	if(cursors.down.isDown){
        		input = false;
        		compare = true;
        	}
        }
        
        if(compare){
        	if(response === numbers){
        		opt2.setText("Congratulations!");
        		generate = true;
        	}
        	
        	else{
        		opt2.setText("I'm sorry you got it wrong :(");
        	}
        	compare  = false;
        }
    }
};
