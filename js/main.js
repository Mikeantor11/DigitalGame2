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
        game.load.image('lava', 'assets/Art/lava.png');
        game.load.image('ball', 'assets/Art/baseball.png');
        //Load some Sounds
        game.load.audio('roar', 'assets/Audio/roar.mp3');
        game.load.audio('bite', 'assets/Audio/dogBite.mp3');
        game.load.audio('BGM', 'assets/Audio/BGM.mp3');
    }
    
    //Variables Used throughout the program
    var wolf;
    var cursors;
    var counter = 1;
    var biteReference;
    var otherBiteRef;
    var bite;
    var BGM;
    var balls;
    var wolfCollisionGroup;
    var ballCollisionGroup;
    var score = 0;
    var lava;
    var lavaCollisionGroup;
    var time;
    var last = 0;
    var gravityVar = 0;
    var jumpVelocity;
    var reset = true;

    function create() {
        //Loading in and Playing the Background Music
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

        //Creating the Group for the Baseballs
        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.P2JS;

        //Loading Character Sprites
        wolf = game.add.sprite(300,450, 'wolf');
        lava = game.add.sprite(300, 600, 'lava');

        //Loading In Bite Audio
        bite = game.add.audio('bite');

        //Adds the Animations
        wolf.animations.add('walkRight', [6,7,8,9,10]);
        wolf.animations.add('walkLeft', [21, 22, 23, 24, 25]);
        wolf.animations.add('biteRight', [11,12,13,14,10]);
        wolf.animations.add('biteLeft', [26,27,28,29,20]);

        //Enabling Physics on the Characters.
        game.physics.p2.enable(wolf);
        game.physics.p2.enable(lava);

        //Sets the Wolf to it's Collision Group
        wolf.body.setCollisionGroup(wolfCollisionGroup);

        //Setting what happens when the Wolf hits a ball
        wolf.body.collides(ballCollisionGroup, ateBall, this);

        //Stopping the Wolf from rotating and Allowing it to fall slower
        wolf.body.fixedRotation = true;
        wolf.body.mass = 0.5;

        //Keeping objects still
        lava.body.static = true;

        //Allowing Cursor Inputs
        cursors = game.input.keyboard.createCursorKeys();

        //References for Sprites and sounds.
        biteReference = wolf.animations.play('biteRight');
        otherBiteRef = wolf.animations.play('biteLeft');
        wolf.animations.play('walkRight');

        //Spawns Initial Balls Falling
        var pastX;
            for (var i = 0; i <4; i++){
                var xPos = game.world.randomX;
                while(Math.abs(xPos - wolf.body.x) < 100 && Math.abs(xPos - pastX) < 100)
                {
                    xPos = game.world.randomX;
                }
                var ball = balls.create(xPos, 0, 'ball');
                ball.body.setCircle(10);

                ball.body.setCollisionGroup(ballCollisionGroup);

                ball.body.collides(wolfCollisionGroup);
                pastX = xPos;
            }

        //Sets more balls to fall every second
        game.time.events.loop(1000, moreBalls, this);
    }

    //A function to all to kill the Wolf it it hits the Lava
    function killWolf(){
        wolf.kill();
    }

    //Called if the Wolf hits a Ball
    function ateBall(){            
            //Allow the User to have another Jump
            counter++;

            //Increase the Score
            score = score + 10;

            //Increases the Gravity
            game.physics.p2.gravity.y = game.physics.p2.gravity.y + (50 * Math.floor(score/50));

            //Removes the other Balls from the screen
            balls.removeAll(true, true);

            //Spawns a new Set of Balls, Making sure their not to close to the Wolf
            //Or the Previous Ball
            var pastX;
            for (var i = 0; i <4; i++){
                var xPos = game.world.randomX;
                while(Math.abs(xPos - wolf.body.x) < 100 && Math.abs(xPos - pastX) < 100)
                {
                    xPos = game.world.randomX;
                }
                var ball = balls.create(xPos, 0, 'ball');
                ball.body.setCircle(10);

                ball.body.setCollisionGroup(ballCollisionGroup);

                ball.body.collides(wolfCollisionGroup);
                pastX = xPos;
            }
            
            wolf.body.velocity.y = jumpVelocity;
    }

    //Spawns a new Set of Balls, Making sure their not to close to the Wolf
    //Or the Previous Ball
    function moreBalls(){
        var pastX;
            for (var i = 0; i <4; i++){
                var xPos = game.world.randomX;
                while(Math.abs(xPos - wolf.body.x) < 100 && Math.abs(xPos - pastX) < 100)
                {
                    xPos = game.world.randomX;
                }
                var ball = balls.create(xPos, 0, 'ball');
                ball.body.setCircle(10);

                ball.body.setCollisionGroup(ballCollisionGroup);

                ball.body.collides(wolfCollisionGroup);
                pastX = xPos;
            }
    }

    //Resets the game
    function restart(){
        reset = true;
        
        //Revives and Resets the Wolf
        wolf.revive();
        wolf.body.x = 300;
        wolf.body.y = 450;

        //Allowing for 2 jumps so that you can counter the inertia gained and still have a jump.
        counter = 2;
        
        //Reseting the score
        score = 0;

        //Resetting the gravity
        game.physics.p2.gravity.y = 200;
        gravityVar = 0;

        //Clears the screen of all balls
        balls.removeAll(true, true);

        //Resets the time
        game.time.reset();

        //Spawns a new Set of Balls, Making sure their not to close to the Wolf
        //Or the Previous Ball
        var pastX;
            for (var i = 0; i <4; i++){
                var xPos = game.world.randomX;
                while(Math.abs(xPos - wolf.body.x) < 100 && Math.abs(xPos - pastX) < 50)
                {
                    xPos = game.world.randomX;
                }
                var ball = balls.create(xPos, 0, 'ball');
                ball.body.setCircle(10);

                ball.body.setCollisionGroup(ballCollisionGroup);

                ball.body.collides(wolfCollisionGroup);
                pastX = xPos;
            }

        //Trying to reset the Wolf Mass and Inertia
        wolf.body.mass = 0.5;
        wolf.body.inertia = 1;

        //Sets more balls to fall every second
        game.time.events.loop(1000, moreBalls, this);
    }
   
    function update() {
        jumpVelocity = wolf.body.velocity.y;
        
        //Movement

        //If left is pressed move left and play running Animation
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

        //If right is pressed Move right and play running Animation
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

        //If left nor right is pressed stop moving
        else{
            wolf.body.velocity.x = 0;
        }

        //If "A" is pressed do the bite Animation
        if(game.input.keyboard.isDown(Phaser.Keyboard.A) && wolf.animations.currentAnim !== 'biteLeft'){
            wolf.animations.play('biteRight', 10);

            if(!bite.isPlaying){
                bite.play(); 
            }            
        }
        //If up is pressed jump and decrement the Jump counter
        if(cursors.up.isDown && counter > 0){
            reset = false;
            wolf.body.velocity.y = -250 - (100 * Math.floor(score/50));
            counter--;
        }

        //If the Wolf falls into the lava kill it
        if(wolf.body.y > 500){
            killWolf();
        }

        //If R is pressed Reset the game
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
            restart();
        }
        
        
        //Need help here!
        if(reset){
            wolf.body.velocity.y = 0;
        }
    }

    function render() {
        //Create a cleaner Timer
        time = Math.floor(this.game.time.totalElapsedSeconds());

        //Text displayed on the screen
        game.debug.text('Seconds Survived: ' + time, 32, 32);
        game.debug.text('Score: ' + score, 32, 45);
        game.debug.text('Jump with the Up Arrow.', 475, 32);
        game.debug.text('Move with Left and Right Arrows.', 475, 45);
        game.debug.text('Press R to reset the game.', 475, 58);
        game.debug.text('Collect as many balls as you can without falling in the lava!', 32, 550);
        game.debug.text('You can only jump once until you collect another ball.', 32, 563);
    }
};
