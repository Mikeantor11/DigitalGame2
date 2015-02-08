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

    var game = new Phaser.Game(600, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

    function preload() {
        game.load.spritesheet('heartButton', 'assets/Art/heartSpritesheet.png');
        game.load.image('cursorButton', 'assets/Art/cursorButton.png');
        game.load.image('cardButton', 'assets/Art/cardButton.png');
        game.load.image('chocolateButton', 'assets/Art/chocoButton.png');
        game.load.image('roseButton', 'assets/Art/roseButton.png');
        game.load.image('heart', 'assets/Art/heart_2.png');
        game.load.image('kittens', 'assets/Art/kittensInABox.png');
        game.load.image('lose', 'assets/Art/kittenWhyYouNoLove.png');
    }

    //Global Variables
    var heartButton;
    var heartTotal = 0;
    var text;
    var cursorButton;
    var cardButton;
    var chocolateButton;
    var roseButton;
    var cursorPrice = 10;
    var cardPrice = 50;
    var chocolatePrice = 100;
    var rosePrice = 300;
    var cursorCount = 0;
    var cardCount = 0;
    var chocolateCount = 0;
    var roseCount = 0;
    var heartText;
    var cursorText;
    var cardText;
    var chocolateText;
    var roseText;
    var cursorText2;
    var cardText2;
    var chocolateText2;
    var roseText2;
    var kittens;
    var love = 0;
    var loveText;

    function create() {
        var style = {font: "20px Arial", fill: "#FFFFFF", align: "center"};

        heartButton = game.add.button(20, 20, 'heart', heartClick);
        cursorButton = game.add.button(325, 0, 'cursorButton', cursorBuy);
        cardButton = game.add.button(325, 50, 'cardButton', cardBuy);
        chocolateButton = game.add.button(325, 100, 'chocolateButton', chocolateBuy);
        roseButton = game.add.button(325, 150, 'roseButton', roseBuy);
        heartText = game.add.text(20, 150, "Hearts: " + heartTotal, style);
        cursorText = game.add.text(580, 20, cursorCount, style);
        cardText = game.add.text(580, 70, cardCount, style);
        chocolateText = game.add.text(580, 120, chocolateCount, style);
        roseText = game.add.text(580, 170, roseCount, style);
        cursorText2 = game.add.text(275, 20, cursorPrice, style);
        cardText2 = game.add.text(275, 70, cardPrice, style);
        chocolateText2 = game.add.text(275, 120, chocolatePrice, style);
        roseText2 = game.add.text(275, 170, rosePrice, style);
        kittens = game.add.button(0, 200, "kittens", feedKitens);
        loveText = game.add.text(0, 180, "Show the Kittens your love: " + love, style);

        game.time.events.loop(1000, updateHearts, this);
        game.time.events.loop(2000, upTheLove, this);
    }

    function heartClick() {
        heartTotal++;
    }

    function feedKitens() {
        if (love >= 10 && heartTotal >= 10) {
            love = love - 10;
            heartTotal = heartTotal - 10;
        }
    }

    function upTheLove() {
       /* if ((cursorCount + cardCount + chocolateCount + roseCount) > 5) {
            love = love + Math.floor(Math.random() * 20) + 1;
        }
        else{
            love = love + Math.floor(Math.random() * 10) + 1;
        }*/
        love = love + Math.floor(Math.random() * ((cursorCount + cardCount + chocolateCount + roseCount))*2) + 1;
    }

    function updateHearts() {
        heartTotal = heartTotal + ((0.5 * cursorCount) + (3 * cardCount) + (5 * chocolateCount) + (10 * roseCount));
    }

    function cursorBuy() {
        if (heartTotal >= cursorPrice) {
            cursorCount++;
            heartTotal = heartTotal - cursorPrice;
            cursorPrice = cursorPrice + 5;
        }
    }

    function cardBuy() {
        if (heartTotal >= cardPrice) {
            cardCount++;
            heartTotal = heartTotal - cardPrice;
            cardPrice = cardPrice + 5;
        }
    }

    function chocolateBuy() {
        if (heartTotal >= chocolatePrice) {
            chocolateCount++;
            heartTotal = heartTotal - chocolatePrice;
            chocolatePrice = chocolatePrice + 5;
        }
    }

    function roseBuy() {
        if (heartTotal >= rosePrice) {
            roseCount++;
            heartTotal = heartTotal - rosePrice;
            rosePrice = rosePrice + 5;
        }
    }

    function update() {
        heartText.setText("Hearts: " + Math.floor(heartTotal));
        cursorText.setText(cursorCount);
        cardText.setText(cardCount);
        chocolateText.setText(chocolateCount);
        roseText.setText(roseCount);
        cursorText2.setText(cursorPrice);
        cardText2.setText(cardPrice);
        chocolateText2.setText(chocolatePrice);
        roseText2.setText(rosePrice);
        loveText.setText("Show the Kittens your love: " + love);
        
        if (love > 200){
            game.add.image(0,0, 'lose');
        }
    }
};
