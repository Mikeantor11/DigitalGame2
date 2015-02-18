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
        game.load.image('platform', 'assets/Art/platform.png');
        game.load.spritesheet('police', 'assets/Art/policeOfficer.png', 16, 31);
        game.load.image('seeThru', 'assets/Art/invisibleTile.png');
        game.load.image('glass', 'assets/Art/magnifyingGlass.png');
    }

    var police;
    var plat1;
    var plat2;
    var plat3;
    var plat4;
    var plat5;
    var plat6;
    var plat7;
    var plat8;
    var plat9;
    var plat10;
    var plat11;
    var goal;
    var cursors;
    var counter = 0;

    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;
        
        police = game.add.sprite(100,500, 'police');
        plat1 = game.add.sprite(75,550, 'platform');
        plat2 = game.add.sprite(200,450, 'platform');
        plat3 = game.add.sprite(500,400, 'platform');
        plat4 = game.add.sprite(250, 300, 'seeThru');
        plat5 = game.add.sprite(600, 250, 'seeThru');
        plat6 = game.add.sprite(0, 350, 'seeThru');
        plat7 = game.add.sprite(700, 150, 'seeThru');
        plat10 = game.add.sprite(50, 0, 'seeThru');
        goal = game.add.sprite(0, 0, 'glass');
        
        game.physics.arcade.enableBody(police);
        game.physics.arcade.enableBody(goal);
        game.physics.arcade.enable(plat1);
        game.physics.arcade.enable(plat2);
        game.physics.arcade.enable(plat3);
        game.physics.arcade.enable(plat4);
        game.physics.arcade.enable(plat5);
        game.physics.arcade.enable(plat6);
        game.physics.arcade.enable(plat7);
        game.physics.arcade.enable(plat10);
        
        police.animations.add('walkRight', [0,1,2]);
        police.animations.add('walkLeft', [3,4,5]);
        police.body.bounce.y = 0.1;
        goal.body.bounce.y = 1.0;
        police.body.setSize(20,35);
        police.body.collideWorldBounds = true;
        plat1.body.moves = false;
        plat2.body.moves = false;
        plat3.body.moves = false;
        plat4.body.moves = false;
        plat5.body.moves = false;
        plat6.body.moves = false;
        plat7.body.moves = false;
        plat10.body.moves = false;

        cursors = game.input.keyboard.createCursorKeys();
    }

    function collision(){
        counter++;
    }

    function update() {
        if(cursors.left.isDown){
            police.animations.play('walkLeft', 10);
            police.body.velocity.x = -150;
        }
        else if(cursors.right.isDown){
            police.animations.play('walkRight', 10);
            police.body.velocity.x = 150;
        }
        else{
            police.body.velocity.x = 0;
        }
        
        if(cursors.up.isDown && counter > 0){
            police.body.velocity.y = -150;
            counter = 0;
        }
        
        police.body.mass = 1;
        
        game.physics.arcade.collide(police, [plat1, plat2, plat3, plat4, plat5, plat6, plat7, plat10], collision, null, this);
    }
};
