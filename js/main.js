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
    }

    var police;
    var plat1;
    var plat2;
    var plat3;
    var cursors;

    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;
        
        police = game.add.sprite(100,67, 'police');
        plat1 = game.add.sprite(75,50, 'platform');
        plat2 = game.add.sprite(200,200, 'platform');
        plat3 = game.add.sprite(600,250, 'platform');
        
        //police.body.collideWorldBounds = true;
        police.animation.add('walkRight', [0,1,2]);
        police.animation.add('walkLeft', [3,4,5]);
        
        game.physics.arcade.enable(police);
        game.physics.arcade.enable(plat1);
        game.physics.arcade.enable(plat2);
        game.physics.arcade.enable(plat3);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        
        plat1.body.static = true;
        plat2.body.static = true;
        plat3.body.static = true;
    }

    function update() {
        if(cursors.left.isDown){
            police.animation.play('walkLeft', 10);
            police.body.velocity.x = -350;
        }
        else if(cursors.right.isDown){
            police.animation.play('walkRight', 10);
            police.body.velocity.x = 350
        }
        else{
            police.body.velocity.x = 0;
        }
        
        if(cursors.up.isDown && police.body.onFloor()){
            police.body.velocity.y = -250;
        }
    }
};
