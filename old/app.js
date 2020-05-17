for (let i = 0; i < 255; i++) {
    var divElement = document.createElement("Div");
    document.querySelector(".grid").appendChild(divElement);
}

// const startBtn = document.querySelector(".start")

const squares = document.querySelectorAll('.grid div');
const resultDisplay = document.querySelector('#result');
const btnShoot = document.querySelector(".btn-shoot");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const shooter = document.querySelector('.shooter');
const displayGameOver = document.querySelector("#game-over");
let livesDisplay = document.querySelector('#lives');
const btnStart = document.querySelector(".start-btn");


var shootSound;
var boomSound;
let bombDrop;


let width = 17;
let currentShooterIndex = 248;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let alienInvadersTakenDown1 = [];
let alienInvadersTakenDown2 = [];
let alienInvadersTakenDown3 = [];
let alienInvadersTakenDown4 = [];
let intervalTime = 500

let result = 0;


let direction = 1;
let invaderId;

//define the alien invaders in different ranks
let alienInvaders4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let alienInvaders3 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
let alienInvaders2 = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
let alienInvaders1 = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60];


//push the 4 diffrent alienInvaders-Arrays ind one array
let alienInvaders = [];
alienInvaders.push(...alienInvaders1, ...alienInvaders2, ...alienInvaders3, ...alienInvaders4);
// console.log(alienInvaders)

//draw the alien invaders
alienInvaders1.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader1', 'invader'));
alienInvaders2.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader2', 'invader'));
alienInvaders3.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader3', 'invader'));
alienInvaders4.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader4', 'invader'));


// draw the shooter
squares[currentShooterIndex].classList.add('shooter');

// ***************************************************************************
btnStart.addEventListener("click", startGame)


// start game
function startGame() {


    // //remove everything which was added in game before
    //remove Invaders
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        // squares[alienInvaders1[i]].classList.remove('invader1')
        squares[alienInvaders1[i]].classList.remove('invader1', 'invader');
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        // squares[alienInvaders2[i]].classList.remove('invader2')
        squares[alienInvaders2[i]].classList.remove('invader2', 'invader');
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        // squares[alienInvaders3[i]].classList.remove('invader3')
        squares[alienInvaders3[i]].classList.remove('invader3', 'invader');
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        // squares[alienInvaders4[i]].classList.remove('invader4')
        squares[alienInvaders4[i]].classList.remove('invader4', 'invader');
    }
    squares[currentShooterIndex].classList.remove('shooter');

    clearInterval(invaderId);
    clearInterval(bombDrop);

    // let laserId;
    // clearInterval(laserId);
    // laserId = setInterval(moveLaser, 100);


    width = 17;
    currentShooterIndex = 248;
    currentInvaderIndex = 0;
    alienInvadersTakenDown = [];
    alienInvadersTakenDown1 = [];
    alienInvadersTakenDown2 = [];
    alienInvadersTakenDown3 = [];
    alienInvadersTakenDown4 = [];
    intervalTime = 500;
    console.log(alienInvadersTakenDown) //is empty
    console.log(alienInvadersTakenDown2)
    result = 0;
    direction = 1;
    // invaderId;


    //define the alien invaders in different ranks
    alienInvaders4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    alienInvaders3 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    alienInvaders2 = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
    alienInvaders1 = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

    alienInvaders = [];
    alienInvaders.push(...alienInvaders1, ...alienInvaders2, ...alienInvaders3, ...alienInvaders4);

    //draw the alien invaders
    alienInvaders1.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader1', 'invader'));
    alienInvaders2.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader2', 'invader'));
    alienInvaders3.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader3', 'invader'));
    alienInvaders4.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader4', 'invader'));

    // }



    // draw the shooter
    squares[currentShooterIndex].classList.add('shooter');
    // squares[currentShooterIndex].classList.add('shooter');
    // currentLaserIndex = currentShooterIndex;
    const mediaQuery = window.matchMedia("(min-width: 1025px)");

    if (mediaQuery.matches) {
        invaderId = setInterval(moveInvaders, intervalTime)
    } else {
        invaderId = setInterval(moveInvaders, intervalTime);
    }

    // document.addEventListener('keyup', function () {
    //     if (e.keyCode === 32) {
    //         shoot();
    //     }
    // })


    // document.addEventListener('keyup', function (e) {
    //     if (e.keyCode === 32) {
    //         document.addEventListener('keyup', shoot)
    //     }
    // })

    // document.addEventListener('keyup', function () {
    //     if (e.keyCode === 32) {
    //         shoot();
    //     }
    // });

    // const key32 = document.querySelector("data-key")
    // document.addEventListener('keyup', shoot)
    // btnShoot.addEventListener("click", shoot)

    // switch (e.keyCode) {
    //     case 32:
    //         document.addEventListener('keyup', shoot)
    //         break
    // }
    // document.addEventListener(KeyboardEvent.KEY_UP, shoot);


    // if (e.keyCode === 32) {
    //     document.addEventListener('keyup', shoot)
    // }
    // btnShoot.addEventListener("click", shoot)

    // function spacebarShoot(e) {
    //     if (e.keyCode === 32) {
    //         shoot();
    //     }
    // }

    // btnShoot.addEventListener("click", shoot);

    // // window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    // document.addEventListener('keyup', spacebarShoot)

    // function spacebarShoot() {
    //     if (e.keyCode === 32) {
    //         shoot();
    //     }
    // }
    // if (event.keyCode == KeyboardHelper.spacebar) {
    //     spacebarPressed = true;
    //     shoot();
    // }

    // keyboardHelper.spacebar.addEventListener('keyup', shoot)

    // document.addEventListener('keyup', function (e) {
    //     if (e.keyCode === 32) {
    //         shoot();
    //     }
    // })

}

// btnShoot.addEventListener("click", shoot)
// if (e.keyCode === 32) {
//     document.addEventListener('keyup', shoot)
// }

// function spacebarShoot(e) {
//     if (e.keyckeyboardHelper.spacebar) {
//         shoot();
//     }
// }


// const keyboardHelper = {
//     spacebar: 32,
// };

// if (event.keyCode == KeyboardHelper.spacebar) {
//     spacebarPressed = true;
// }

// var KeyboardHelper = {
//     spacebar: 32

// };

// var spacebarPressed = false;







// ***************************************************************************

//move the shooter along a line
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');

    //move shooter with keyboard, arrow left and arrow right
    switch (e.keyCode) {
        case 37:
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            btnLeft.classList.add("color-btn-dir");
            setTimeout(() => btnLeft.classList.remove("color-btn-dir"), 600);
            break;
        case 39:
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            btnRight.classList.add("color-btn-dir");
            setTimeout(() => btnRight.classList.remove("color-btn-dir"), 600);
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);

// add eventlistener for direction buttons, for use without keyboard
btnLeft.addEventListener('touchstart', function () {
    squares[currentShooterIndex].classList.remove('shooter');
    if (currentShooterIndex % width !== 0) {
        currentShooterIndex -= 1;
    }
    squares[currentShooterIndex].classList.add('shooter');
})

btnRight.addEventListener('touchstart', function () {
    squares[currentShooterIndex].classList.remove('shooter');
    if (currentShooterIndex % width < width - 1) {
        currentShooterIndex += 1;
    }
    squares[currentShooterIndex].classList.add('shooter');
})



// move the alien invaders
function moveInvaders() {

    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        direction = width;
    } else if (direction === width) {
        if (leftEdge) direction = 1
        else direction = -1
    }

    //remove Invaders
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        // squares[alienInvaders1[i]].classList.remove('invader1')
        squares[alienInvaders1[i]].classList.remove('invader1', 'invader');
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        // squares[alienInvaders2[i]].classList.remove('invader2')
        squares[alienInvaders2[i]].classList.remove('invader2', 'invader');
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        // squares[alienInvaders3[i]].classList.remove('invader3')
        squares[alienInvaders3[i]].classList.remove('invader3', 'invader');
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        // squares[alienInvaders4[i]].classList.remove('invader4')
        squares[alienInvaders4[i]].classList.remove('invader4', 'invader');
    }


    //add direction
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        alienInvaders[i] += direction;
    }
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        alienInvaders1[i] += direction;
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        alienInvaders2[i] += direction;
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        alienInvaders3[i] += direction;
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        alienInvaders4[i] += direction;
    }


    //add invaders again
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        if (!alienInvadersTakenDown1.includes(i)) {
            // squares[alienInvaders1[i]].classList.add('invader1')
            squares[alienInvaders1[i]].classList.add('invader1', 'invader');
        }
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        if (!alienInvadersTakenDown2.includes(i)) {
            // squares[alienInvaders2[i]].classList.add('invader2')
            squares[alienInvaders2[i]].classList.add('invader2', 'invader');
        }
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        if (!alienInvadersTakenDown3.includes(i)) {
            // squares[alienInvaders3[i]].classList.add('invader3')
            squares[alienInvaders3[i]].classList.add('invader3', 'invader');
        }
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        if (!alienInvadersTakenDown4.includes(i)) {
            // squares[alienInvaders4[i]].classList.add('invader4')
            squares[alienInvaders4[i]].classList.add('invader4', 'invader');
        }
    }


    // Game Over settings
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        displayGameOver.textContent = ' - Game Over';
        squares[currentShooterIndex].classList.add('boom');
        btnShoot.removeEventListener("touchstart", shoot);

        clearInterval(invaderId);
        clearInterval(bombDrop);
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        if (alienInvaders[i] > (squares.length - (width - 1))) {
            displayGameOver.textContent = ' - Game Over';
            btnShoot.removeEventListener("touchstart", shoot);
            clearInterval(invaderId);
            clearInterval(bombDrop);
        }
    }

    // no lives 
    if (lives === 0) {
        displayGameOver.textContent = ' - Game Over';
        btnShoot.removeEventListener("touchstart", shoot);
        clearInterval(invaderId);
        clearInterval(bombDrop);
    }

    //you hit all alienInvaders => you win
    if (alienInvadersTakenDown.length === alienInvaders.length) {
        displayGameOver.textContent = ' - You Win';

        clearInterval(invaderId);
    }
}

//set intervall, a little bit faster for big screen with keyboard
// const mediaQuery = window.matchMedia("(min-width: 1025px)");

// if (mediaQuery.matches) {
//     invaderId = setInterval(moveInvaders, 500), 1000;
// } else {
//     invaderId = setInterval(moveInvaders, 550), 1000;
// }

btnShoot.addEventListener("click", shoot);

// document.addEventListener('keyup', spacebarShoot);

function spacebarShoot(e) {
    if (e.keyCode === 88) {
        shoot();
    }
}


document.addEventListener('keyup', spacebarShoot);

//shoot at alien invaders
function shoot() {



    let laserId;
    let currentLaserIndex = currentShooterIndex;

    //remove eventlisteners for shooting, so it can shoot only once at a time
    document.removeEventListener('keyup', spacebarShoot);
    btnShoot.removeEventListener("click", shoot);



    //move the laser from the shooter to the alien invader
    function moveLaser() {
        // let laser move (by adding and removing laser)
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        //if laser hits invader
        if (squares[currentLaserIndex].classList.contains('invader')) {

            //change score, depending on rank of invader
            if (squares[currentLaserIndex].classList.contains('invader4')) {
                result = result + 50;
                resultDisplay.textContent = result;
            } else if (squares[currentLaserIndex].classList.contains('invader3')) {
                result = result + 30;
                resultDisplay.textContent = result;
            } else if (squares[currentLaserIndex].classList.contains('invader2')) {
                result = result + 15;
                resultDisplay.textContent = result;
            } else if (squares[currentLaserIndex].classList.contains('invader1')) {
                result = result + 5;
                resultDisplay.textContent = result;
            }

            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader', 'invader1', 'invader2', 'invader3', 'invader4');

            //you can shoot again
            document.addEventListener('keyup', spacebarShoot);


            btnShoot.addEventListener("click", shoot);
            squares[currentLaserIndex].classList.add('boom');
            //add boom sound

            boomSound = new Audio("/sound/boom.wav");
            boomSound.play();

            //remove .boom (star)
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);

            clearInterval(laserId);

            //  put hitten invaders in a variable
            const alienTakenDown1 = alienInvaders1.indexOf(currentLaserIndex);
            const alienTakenDown2 = alienInvaders2.indexOf(currentLaserIndex);
            const alienTakenDown3 = alienInvaders3.indexOf(currentLaserIndex);
            const alienTakenDown4 = alienInvaders4.indexOf(currentLaserIndex);

            //and put these in an array
            alienInvadersTakenDown4.push(alienTakenDown4);
            alienInvadersTakenDown3.push(alienTakenDown3);
            alienInvadersTakenDown2.push(alienTakenDown2);
            alienInvadersTakenDown1.push(alienTakenDown1);
        }

        if (currentLaserIndex < width) {
            clearInterval(laserId);
            setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            document.addEventListener('keyup', spacebarShoot);
            // document.addEventListener('keyup', shoot);
            btnShoot.addEventListener("click", shoot);
        }

    }

    laserId = setInterval(moveLaser, 100);
    shootSound = new Audio("/sound/shoot.wav");
    shootSound.play();



    // switch (e.keyCode) {
    //     case 32:
    //         console.log("hello")
    //         break
    // }

    // switch (e.keyCode) {
    //     case 32:
    //         laserId = setInterval(moveLaser, 100)
    //         alert('hi')
    //         break
    // }

    // btnShoot.addEventListener("click", function () {
    //     laserId = setInterval(moveLaser, 100);
    // })
}




//press key: spacebar for shooting
//can only shoot, when laser hit invader or reaches end of grid
// document.addEventListener('keyup', spacebarShoot)

// function spacebarShoot(e) {
//     if (e.keyCode === 32) {
//         shoot();
//         btnShoot.classList.add("color-shooter");
//         setTimeout(() => btnShoot.classList.remove("color-shooter"), 600);




//alien invaders are dropping bombs
function dropBomb() {

    // let bombId
    let currentBombIndex = alienInvaders1[Math.floor(Math.random() * alienInvaders1.length)];
    squares[currentBombIndex].classList.remove('bomb');
    // squares[currentBombIndex].classList.add('bomb')

    function moveBomb() {
        //move bomb
        squares[currentBombIndex].classList.remove('bomb');
        currentBombIndex += width;
        squares[currentBombIndex].classList.add('bomb');
        // console.log(currentBombIndex)

        //if bomb hits shooter
        if (squares[currentBombIndex].classList.contains('shooter')) {
            squares[currentBombIndex].classList.remove('bomb');
            // squares[currentShooterIndex].classList.add('shooter-hit')
            // setTimeout(() => squares[currentShooterIndex].classList.remove('shooter-hit'), 250)
            //add explosion sound
            explosionSound = new Audio("/sound/explosion.wav");
            explosionSound.play();

            clearInterval(bombId);
            lives--;
            livesDisplay.textContent = lives;
        }

        //remove bomb when it reaches bottom

        if (currentBombIndex > (squares.length - (width - 1))) {
            setTimeout(() => squares[currentBombIndex].classList.remove('bomb'), 100);
            clearInterval(bombId);
        }
    }

    bombId = setInterval(moveBomb, 300);

}

bombDrop = setInterval(dropBomb, 5000);

if (lives === 0) {
    clearInterval(bombDrop);
}