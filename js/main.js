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
    }
	
	var question;
	var seen = 0;
	var job;
	var opt1;
	var opt2;
	var opt3;
    var style;
    var cursors;
	var waitResp = false;
	var progress = 0;
    var move;
    var resp = false;
	
    function create() {
        
        style = {font: "13px Arial", fill: "#FFFFFF", align: "center"};
        game.add.sprite(0, 0, 'background');
        question = game.add.text(50, 420, 'Welcome to the interview.', style);
        move = game.add.text(75, 435, 'Press Down to continue', style);
        opt1 = game.add.text(50, 450, "", style);
        opt2 = game.add.text(50, 465, "", style);
        opt3 = game.add.text(50, 480, "", style);
        
        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
    
    	if(progress === 0){
    		if(cursors.down.isDown){
    			progress++;
    		}
    	}
        
        if(progress === 1){
            question.setText("Tell me a little about yourself.");
            move.setText("");
            opt1.setText("Left) I'm a hard worker who likes to spend his free time working for the company.");
            opt2.setText("Up) I always get my work done in a timely manner, in my free time I like socializing with friends.");
            opt3.setText("Right) I AM FROM THE UNDERWORLD HERE TO ENSALVE THE ENTIRE HUMAN RACE!");
            resp = true;
                if(cursors.left.isDown){
                    job = job + 2;
                    if(seen > 0){
                        seen--;
                    }
                    progress++;
                }
                else if(cursors.up.isDown){
                    job = job + 1;
                    if(seen === 1){
                        seen--;
                    }
                    progress++;
                }
                else if(cursors.right.isDown){
                    job--;
                    seen++;
                    progress++;
                }
        }
        
        else if(progress === 2){
            if(seen > 0){
                question.setText("Riight... let's move on.");
                move.setText("Press Down to continue.");
                opt1.setText("");
                opt2.setText("");
                opt3.setText("");
            }
            else{
            	question.setText("That's great! Let's go to the next question");
            	move.setText("Press Down to continue.");
            	opt1.setText("");
            	opt2.setText("");
            	opt3.setText("");
            }
            if(cursors.down.isDown){
            	progress++;
            }
        }
        
        else if(progress === 3){
        	question.setText("What are some of your strengths?");
            move.setText("");
            opt1.setText("Left) I'm a great team player who enjoys working in groups or alone.");
            opt2.setText("Up) I manage my time pretty well.");
            opt3.setText("Right) THE FIRE THAT BURNS FROM MY HEART FOR TOTAL DOMINATION!");
            resp = true;
                if(cursors.left.isDown){
                    job = job + 2;
                    if(seen > 0){
                        seen--;
                    }
                    progress++;
                }
                else if(cursors.up.isDown){
                    job = job + 1;
                    if(seen === 1){
                        seen--;
                    }
                    progress++;
                }
                else if(cursors.right.isDown){
                    job--;
                    seen++;
                    progress++;
                }
        }
        
        else if(progress === 4){
            if(seen > 1){
            	question.setText("Yeaaaaaah.... let's go with that");
            	move.setText("Press Down to continue.");
            	opt1.setText("");
            	opt2.setText("");
            	opt3.setText("");
            }
            else if(seen > 0){
                question.setText("Riight... let's move on.");
                move.setText("Press Down to continue.");
                opt1.setText("");
                opt2.setText("");
                opt3.setText("");
            }
            else{
            	question.setText("That's great! Let's go to the next question");
            	move.setText("Press Down to continue.");
            	opt1.setText("");
            	opt2.setText("");
            	opt3.setText("");
            }
            
            if(cursors.down.isDown){
            	progress++;
            }
        }
        
        else if(progress === 5){
        	question.setText("What are some of your weaknesses?");
            move.setText("");
            opt1.setText("Left) I tend to work to much some of the times.");
            opt2.setText("Up) Sometimes I get overwhelmed with my work.");
            opt3.setText("Right) THE PUNY HUMANS UNDER MY FEET!");
            resp = true;
                if(cursors.left.isDown){
                    job = job + 2;
                    if(seen > 0){
                        seen--;
                    }
                    progress++;
                }
                else if(cursors.up.isDown){
                    job = job + 1;
                    if(seen === 1){
                        seen--;
                    }
                    progress++;
                }
                else if(cursors.right.isDown){
                    job--;
                    seen++;
                    progress++;
                }
        }
    }
};
