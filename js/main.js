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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        // Load the art
        game.load.spritesheet('wolf', 'assets/Art/wolf.png', 64, 32);
        game.load.image('background', 'assets/Art/Park_Background.png');
        game.load.image('floor', 'assets/Art/Floor.png');
        game.load.image('lava', 'assets/Art/lava.png');
        game.load.image('ball', 'assets/Art/baseball.png');
        //Load some Sounds
        game.load.audio('roar', 'assets/Audio/roar.mp3');
        game.load.audio('bite', 'assets/Audio/dogBite.mp3');
        game.load.audio('BGM', 'assets/Audio/BGM.mp3');
    }
    
    var wolf;
    var cursors;
    var counter = 1;
    var biteReference;
    var otherBiteRef;
    var bite;
    var BGM;
    var floor;
    var balls;
    var wolfCollisionGroup;
    var ballCollisionGroup;
    var score = 0;
    var lava;
    var lavaCollisionGroup;
    var time;
    var last = 0;
    
    function create() {
        BGM = game.add.audio('BGM', 0.25, true);
        BGM.play();

         //Adds the Background
        game.add.sprite(0,0, 'background');

        //Starts the Physics and Impliments them on the Dog
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.gravity.y = 200;

        //Collision Groups
        wolfCollisionGroup = game.physics.p2.createCollisionGroup();
        ballCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.P2JS;

        for (var i = 0; i <4; i++){
            var ball = balls.create(game.world.randomX, 0, 'ball');
            ball.body.setCircle(10);

            ball.body.setCollisionGroup(ballCollisionGroup);

            ball.body.collides(wolfCollisionGroup);
            ball.mass = 0.5;
        }

        //Loading Character Sprites
        floor = game.add.sprite(1,500, 'floor');
        wolf = game.add.sprite(35,450, 'wolf');
        lava = game.add.sprite(300, 600, 'lava');

        //Loading In Audio
        bite = game.add.audio('bite');

        //Adds the Animations
        wolf.animations.add('walkRight', [6,7,8,9,10]);
        wolf.animations.add('walkLeft', [21, 22, 23, 24, 25]);
        wolf.animations.add('biteRight', [11,12,13,14,10]);
        wolf.animations.add('biteLeft', [26,27,28,29,20]);

        //Enabling Physics on the Characters.
        game.physics.p2.enable(wolf);
        game.physics.p2.enable(floor);
        game.physics.p2.enable(lava);

        wolf.body.setCollisionGroup(wolfCollisionGroup);
        //lava.body.setCollisionGroup(lavaCollisionGroup);

        wolf.body.collides(ballCollisionGroup, ateBall, this);
        //wolf.body.collides(lavaCollisionGroup, killWolf, this);
        wolf.body.fixedRotation = true;

        //Keeping objects still
        floor.body.static = true;
        lava.body.static = true;

        //Allowing Cursor Inputs
        cursors = game.input.keyboard.createCursorKeys();

        //References for Sprites and sounds.
        biteReference = wolf.animations.play('biteRight');
        otherBiteRef = wolf.animations.play('biteLeft');
        wolf.animations.play('walkRight');
    }

    function killWolf(){
        wolf.kill();
    }

    function ateBall(){
        if(bite.isPlaying){
            counter++;
            score = score + 10;
            for (var i = 0; i <4; i++){
                var ball = balls.create(game.world.randomX, 0, 'ball');
                ball.body.setCircle(10);

                ball.body.setCollisionGroup(ballCollisionGroup);

                ball.body.collides(wolfCollisionGroup);
                ball.mass = 0.5;
            }
        }
    }

    function moreBalls(){
        for (var i = 0; i <4; i++){
            var ball = balls.create(game.world.randomX, 0, 'ball');
            ball.body.setCircle(10);

            ball.body.setCollisionGroup(ballCollisionGroup);

            ball.body.collides(wolfCollisionGroup);
            ball.mass = 0.5;
        }
    }
   
    function update() {
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

        if(cursors.up.isDown && counter > 0){
            wolf.body.velocity.y = -250;
            counter--;
            floor.destroy();
        }

        if(wolf.body.y > 500){
            killWolf();
        }

        if(this.game.time.elapsedSecondsSince(last) >= 2){
            last = this.game.time.totalElapsedSeconds();
            moreBalls();
        }
    }

    function render() {
        time = Math.floor(this.game.time.totalElapsedSeconds());
        game.debug.text('Seconds Survived: ' + time, 32, 32);
        game.debug.text('Score: ' + score, 32, 45);
    }
};
