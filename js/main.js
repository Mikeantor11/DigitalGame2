window.onload = function() {
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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load the art
        game.load.spritesheet('wolf', 'assets/Art/wolf.png', 64, 32);
        game.load.image('background', 'assets/Art/Park_Background.png');
        game.load.spritesheet('boss', 'assets/Art/Fenrir.png', 294, 250);
        game.load.image('explosion', 'assets/Art/explosion0.png');
        game.load.image('floor', 'assets/Art/Floor.png');
        //Load some Sounds
        game.load.audio('roar', 'assets/Audio/roar.mp3');
        game.load.audio('bite', 'assets/Audio/dogBite.mp3');
        game.load.audio('BGM', 'assets/Audio/BGM.mp3');
    }
    
    var wolf;
    var cursors;
    var boss;
    var counter = 0;
    var biteReference;
    var otherBiteRef;
    var roar;
    var bite;
    var BGM;
    var exp1;
    var random;
    var selection;
    var floor;
    
    function create() {
        BGM = game.add.audio('BGM', 0.25, true);
        BGM.play();

         //Adds the Background
        game.add.sprite(0,0, 'background');

        //Starts the Physics and Impliments them on the Dog
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 500;
        game.physics.p2.gravity.x = 0;

        //Loading Character Sprites
        floor = game.add.sprite(1,500, 'floor');
        boss = game.add.sprite(650,450, 'boss');
        wolf = game.add.sprite(35,450, 'wolf');
        exp1 = game.add.sprite(250,430, 'explosion');

        //Loading In Audio
        roar = game.add.audio('roar');
        bite = game.add.audio('bite');

        //Adds the Animations
        wolf.animations.add('walkRight', [6,7,8,9,10]);
        wolf.animations.add('walkLeft', [21, 22, 23, 24, 25]);
        wolf.animations.add('biteRight', [11,12,13,14,10]);
        wolf.animations.add('biteLeft', [26,27,28,29,20]);
        boss.animations.add('health');

        //Enabling Physics on the Characters.
        game.physics.p2.enable(wolf);
        game.physics.p2.enable(boss);
        game.physics.p2.enable(exp1);
        game.physics.p2.enable(floor);
        boss.body.setRectangle(220,140);
        exp1.body.setCircle(20);

        //Keeping the boss still
        wolf.body.fixedRotation = true;
        boss.body.fixedRotation = true;
        boss.body.immovable = true;
        boss.body.moves = false;
        boss.body.force = 0;
        boss.body.static = true;
        exp1.body.static = true;
        floor.body.static = true;

        //Allowing Cursor Inputs
        cursors = game.input.keyboard.createCursorKeys();

        //References for Sprites and sounds.
        biteReference = wolf.animations.play('biteRight');
        otherBiteRef = wolf.animations.play('biteLeft');
        wolf.animations.play('walkRight');


        boss.body.onBeginContact.add(bossHit, this);
        exp1.body.onBeginContact.add(killHim, this);
    }

    function bossHit(){
        if((biteReference.isPlaying || otherBiteRef.isPlaying) && boss.visible){
            counter = counter + 1;
            wolf.body.x = 35;
            wolf.body.y = 450;
            wolf.body.static = true;
            roar.play();

            //Spawning a New Explosion
            var exp5 = game.add.sprite((250 + (100*counter)),430, 'explosion');
            game.physics.p2.enable(exp5);
            exp5.body.onBeginContact.add(killHim, this);
            exp5.body.static = true;
            exp5.body.setCircle(20);
        }

        if(counter > 3){
            boss.visible = false;
        }

        else{
            boss.frame = counter;
        }
    }

    function killHim(){
        wolf.kill();
    }
   
    function update() {
        //Settting Character Velocities to Zero
        //wolf.body.setZeroVelocity();
        boss.body.setZeroVelocity();
        //wolf.body.moveDown(300);

        //Movement
        //If left is pressed move left and play running Animation
        //If right is pressed Mmove right and play Animation
        //If "A" is pressed do the bite Animation
        if (cursors.left.isDown)
        {
            wolf.body.velocity.x = -350;
            if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
                wolf.animations.play('biteLeft', 10);
                if(!bite.isPlaying){
                    bite.play();    
                }    
            }
            else{
                wolf.animations.play('walkLeft', 10);
            }
        }
        else if (cursors.right.isDown)
        {
            wolf.body.velocity.x = 350;
            if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
                wolf.animations.play('biteRight', 10);

                if(!bite.isPlaying){
                    bite.play();    
                }    
            }
            else{
                wolf.animations.play('walkRight', 10);
            }
        }
        else{
            wolf.body.velocity.x = 0;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.A) && wolf.animations.currentAnim != 'biteLeft'){
            wolf.animations.play('biteRight', 10);

            if(!bite.isPlaying){
                bite.play(); 
            }            
        }

        if(cursors.up.isDown){
            wolf.body.velocity.y = -250;
        }

        //Having to wait for the boss to stop Roaring in order to move.
        if(!roar.isPlaying){
            wolf.body.static = false;
        }
    }
};
