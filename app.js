//create divs in grid
for (let i = 0; i < 225; i++) {
    var divElement = document.createElement("Div");
    document.querySelector(".grid").appendChild(divElement);
}

const grid = document.querySelector('.grid');
const squares = document.querySelectorAll('.grid div');
const resultDisplay = document.querySelector('#result');
const btnShoot = document.querySelector(".btn-shoot");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const shooter = document.querySelector('.shooter');
const displayGameOver = document.querySelector(".next-level-container #game-over");
const livesDisplay = document.querySelector('#lives');
const btnStart = document.querySelector(".start-btn");
const containerNextLevel = document.querySelector(".next-level-container");
const btnNextLevel = document.querySelector(".btn-next-level");
const levelDisplay = document.querySelector('.level');


//add audio files 
const shootSound = new Audio("/sound/shoot.wav");
const boomSound = new Audio("/sound/boom.wav");
const explosionSound = new Audio("/sound/explosion.wav");
shootSound.volume = 0;
boomSound.volume = 0;
explosionSound.volume = 0;
const btnVolume = document.querySelector(".volume-btn");
const iconVolume = document.querySelector(".volume-btn i")


let width = 15;
let currentShooterIndex = 218;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let alienInvadersTakenDown1 = [];
let alienInvadersTakenDown2 = [];
let alienInvadersTakenDown3 = [];
let alienInvadersTakenDown4 = [];
const intervalMoveInvaders = 700;
const intervalBombDrop = 3000;

let lives = 4
livesDisplay.textContent = lives;
levelDisplay.textContent = 1;

let result = 0;


let direction = 1;
let invaderId;
let bombDrop;


//change volume
isMute = true;

btnVolume.addEventListener("click", function () {
    if (isMute) {
        console.log('on')
        shootSound.volume = 0.5;
        boomSound.volume = 0.5;
        explosionSound.volume = 0.5;
        iconVolume.classList.remove("icon-mute");
        iconVolume.classList.add("icon-volume");
    } else {
        console.log("off")
        shootSound.volume = 0;
        boomSound.volume = 0;
        explosionSound.volume = 0;
        iconVolume.classList.remove("icon-volume");
        iconVolume.classList.add("icon-mute");
    }
    isMute = !isMute;
})


//define the alien invaders in different ranks
let alienInvaders4 = [0, 1, 2, 3, 4, 5, 6, 7];
let alienInvaders3 = [15, 16, 17, 18, 19, 20, 21, 22];
let alienInvaders2 = [30, 31, 32, 33, 34, 35, 36, 37];
let alienInvaders1 = [45, 46, 47, 48, 49, 50, 51, 52];


// push all alienInvaders in an array
let alienInvaders = [];
alienInvaders.push(...alienInvaders1, ...alienInvaders2, ...alienInvaders3, ...alienInvaders4);


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
    grid.style.display = "flex"
    containerNextLevel.style.display = "none";
    btnNextLevel.style.display = "none";
    displayGameOver.style.display = "none";
    displayGameOver.textContent = '';

    //remove invaders and boom (star)
    for (let i = 0; i <= squares.length - 1; i++) {
        squares[i].classList.remove('invader', 'invader1', 'invader2', 'invader3', 'invader4', 'boom');
    }
    //remove shooter
    squares[currentShooterIndex].classList.remove('shooter');

    clearInterval(invaderId);
    clearInterval(bombDrop);

    width = 15;
    currentShooterIndex = 218;
    currentInvaderIndex = 0;
    alienInvadersTakenDown = [];
    alienInvadersTakenDown1 = [];
    alienInvadersTakenDown2 = [];
    alienInvadersTakenDown3 = [];
    alienInvadersTakenDown4 = [];
    lives = 4
    livesDisplay.textContent = lives;
    level = 1
    levelDisplay.textContent = level;
    result = 0;
    resultDisplay.textContent = result;
    displayGameOver.textContent = '';
    direction = 1;

    //define the alien invaders in different ranks
    alienInvaders4 = [0, 1, 2, 3, 4, 5, 6, 7];
    alienInvaders3 = [15, 16, 17, 18, 19, 20, 21, 22];
    alienInvaders2 = [30, 31, 32, 33, 34, 35, 36, 37];
    alienInvaders1 = [45, 46, 47, 48, 49, 50, 51, 52];

    alienInvaders = [];
    alienInvaders.push(...alienInvaders1, ...alienInvaders2, ...alienInvaders3, ...alienInvaders4);

    //draw the alien invaders
    alienInvaders1.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader1', 'invader'));
    alienInvaders2.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader2', 'invader'));
    alienInvaders3.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader3', 'invader'));
    alienInvaders4.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader4', 'invader'));


    // draw the shooter
    squares[currentShooterIndex].classList.add('shooter');
    btnShoot.addEventListener("touchstart", shoot);
    document.addEventListener('keyup', xShoot);

    //setIntervals for moveInvaders and bombDrop
    const mediaQuery = window.matchMedia("(min-width: 1025px)");

    if (mediaQuery.matches) {
        invaderId = setInterval(moveInvaders, intervalMoveInvaders)
    } else {
        invaderId = setInterval(moveInvaders, intervalMoveInvaders + 100);
    }

    bombDrop = setInterval(dropBomb, intervalBombDrop);
}

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

// ***************************************************************************

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
        // squares[alienInvaders3[i]].classList.remove('invader3')
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
            squares[alienInvaders1[i]].classList.add('invader1', 'invader');
        }
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        if (!alienInvadersTakenDown2.includes(i)) {
            squares[alienInvaders2[i]].classList.add('invader2', 'invader');
        }
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        if (!alienInvadersTakenDown3.includes(i)) {
            squares[alienInvaders3[i]].classList.add('invader3', 'invader');
        }
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        if (!alienInvadersTakenDown4.includes(i)) {
            squares[alienInvaders4[i]].classList.add('invader4', 'invader');
        }
    }


    // Game Over settings

    //if invader hit shooter
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        squares[currentShooterIndex].classList.add('boom');
        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 200);
        clearInterval(invaderId);
        clearInterval(bombDrop);
        setTimeout(() => grid.style.display = "none", 500);
        setTimeout(() => containerNextLevel.style.display = "flex", 500);
        displayGameOver.style.display = "block";
        displayGameOver.textContent = "Game Over";
    }


    // if invaders hit bottom

    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        if ((alienInvaders1[i] > (squares.length - (width - 1))) &&
            (!squares[alienInvaders1[i]].classList.contains('invader'))) {
            alienInvaders1 = [];
        }
    }

    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        if ((alienInvaders2[i] > (squares.length - (width - 1))) &&
            (!squares[alienInvaders2[i]].classList.contains('invader'))) {
            alienInvaders2 = [];
        }
    }

    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        if ((alienInvaders3[i] > (squares.length - (width - 1))) &&
            (!squares[alienInvaders3[i]].classList.contains('invader'))) {
            alienInvaders3 = [];
        }
    }

    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        if ((alienInvaders4[i] > (squares.length - (width - 1))) &&
            (!squares[alienInvaders4[i]].classList.contains('invader'))) {
            alienInvaders4 = [];
        }
    }


    for (let i = 211; i <= squares.length - 1; i++) {
        if (squares[i].classList.contains('invader')) {
            squares[i].classList.remove('invader', 'invader1', 'invader2', 'invader3', 'invader4', 'boom');
            clearInterval(invaderId);
            clearInterval(bombDrop);
            setTimeout(() => grid.style.display = "none", 500);
            setTimeout(() => containerNextLevel.style.display = "flex", 500);;
            displayGameOver.style.display = "block";
            displayGameOver.textContent = "Game Over";
        }
    }


    // no lives left
    if (lives === 0) {
        clearInterval(invaderId);
        clearInterval(bombDrop);
        setTimeout(() => grid.style.display = "none", 500);
        setTimeout(() => containerNextLevel.style.display = "flex", 500);
        displayGameOver.style.display = "block";
        displayGameOver.textContent = "Game Over";
    }

    // you hit all alienInvaders => next level
    if (alienInvadersTakenDown.length === alienInvaders.length) {
        clearInterval(invaderId);
        clearInterval(bombDrop);
        setTimeout(() => grid.style.display = "none", 500);
        setTimeout(() => containerNextLevel.style.display = "flex", 500);
        btnNextLevel.style.display = "block";
        btnStart.removeEventListener('click', startGame);
        btnNextLevel.addEventListener('click', nextLevel);
    }

}

// ***************************************************************************

//moveinvaders and bombdromp get faster each level
function nextLevel() {
    // //remove everything which was added in level before
    grid.style.display = "flex"
    containerNextLevel.style.display = "none";
    btnNextLevel.style.display = "none";
    clearInterval(invaderId);
    clearInterval(bombDrop);
    level++;
    levelDisplay.textContent = level;
    btnStart.addEventListener('click', startGame);


    // width = 15;
    currentInvaderIndex = 0;
    alienInvadersTakenDown = [];
    alienInvadersTakenDown1 = [];
    alienInvadersTakenDown2 = [];
    alienInvadersTakenDown3 = [];
    alienInvadersTakenDown4 = [];
    livesDisplay.textContent = lives;
    direction = 1;

    //define the alien invaders in different ranks
    alienInvaders4 = [0, 1, 2, 3, 4, 5, 6, 7];
    alienInvaders3 = [15, 16, 17, 18, 19, 20, 21, 22];
    alienInvaders2 = [30, 31, 32, 33, 34, 35, 36, 37];
    alienInvaders1 = [45, 46, 47, 48, 49, 50, 51, 52];

    alienInvaders = [];
    alienInvaders.push(...alienInvaders1, ...alienInvaders2, ...alienInvaders3, ...alienInvaders4);

    //draw the alien invaders
    alienInvaders1.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader1', 'invader'));
    alienInvaders2.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader2', 'invader'));
    alienInvaders3.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader3', 'invader'));
    alienInvaders4.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader4', 'invader'));


    // draw the shooter
    squares[currentShooterIndex].classList.add('shooter');


    //setIntervals for moveInvaders and bombDrop
    const mediaQuery = window.matchMedia("(min-width: 1025px)");

    if (mediaQuery.matches) {
        invaderId = setInterval(moveInvaders, (intervalMoveInvaders * 0.8))
    } else {
        invaderId = setInterval(moveInvaders, (intervalMoveInvaders + 50) * 0.8);
    }

    bombDrop = setInterval(dropBomb, (intervalBombDrop * 0.85));

}

btnNextLevel.addEventListener('click', nextLevel);

// ****************************************************************************
//shoot with key: 88 (x)
function xShoot(e) {
    if (e.keyCode === 88) {
        shoot();
    }
}

btnShoot.addEventListener("touchstart", shoot);
document.addEventListener('keyup', xShoot);


//shoot at alien invaders
function shoot() {

    let laserId;
    let currentLaserIndex = currentShooterIndex;

    //remove eventlisteners for shooting, so it can shoot only once at a time
    btnShoot.removeEventListener('touchstart', shoot);
    document.removeEventListener('keyup', xShoot);


    //move the laser from the shooter to the alien invader
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('boom')
        // let laser move (by adding and removing laser)
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        //if laser hits invader
        if (squares[currentLaserIndex].classList.contains('invader')) {

            //change score, depending on rank of invader
            if (squares[currentLaserIndex].classList.contains('invader4')) {
                result = result + 100;
                resultDisplay.textContent = result;
                const alienTakenDown4 = alienInvaders4.indexOf(currentLaserIndex);
                alienInvadersTakenDown4.push(alienTakenDown4);
                alienInvadersTakenDown.push(alienInvadersTakenDown4);
            }
            if (squares[currentLaserIndex].classList.contains('invader3')) {
                result = result + 70;
                resultDisplay.textContent = result;
                const alienTakenDown3 = alienInvaders3.indexOf(currentLaserIndex);
                alienInvadersTakenDown3.push(alienTakenDown3);
                alienInvadersTakenDown.push(alienInvadersTakenDown3);
            }
            if (squares[currentLaserIndex].classList.contains('invader2')) {
                result = result + 30;
                resultDisplay.textContent = result;
                const alienTakenDown2 = alienInvaders2.indexOf(currentLaserIndex);
                alienInvadersTakenDown2.push(alienTakenDown2);
                alienInvadersTakenDown.push(alienInvadersTakenDown2);
            }
            if (squares[currentLaserIndex].classList.contains('invader1')) {
                result = result + 10;
                resultDisplay.textContent = result;
                const alienTakenDown1 = alienInvaders1.indexOf(currentLaserIndex);
                alienInvadersTakenDown1.push(alienTakenDown1);
                alienInvadersTakenDown.push(alienInvadersTakenDown1);
            }

            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader', 'invader1', 'invader2', 'invader3', 'invader4');

            //you can shoot again
            btnShoot.addEventListener("touchstart", shoot);
            document.addEventListener('keyup', xShoot);


            squares[currentLaserIndex].classList.add('boom');
            //add boom sound
            boomSound.play();

            //remove .boom (star)
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
            clearInterval(laserId);
            // alienInvadersTakenDown.push(...alienInvadersTakenDown1, ...alienInvadersTakenDown2, ...alienInvadersTakenDown3, ...alienInvadersTakenDown4);
            // console.log(alienInvadersTakenDown);
            // console.log(alienInvaders);
        }

        if (currentLaserIndex < width) {
            clearInterval(laserId);
            setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            btnShoot.addEventListener("touchstart", shoot);
            document.addEventListener('keyup', xShoot);
        }

    }

    laserId = setInterval(moveLaser, 75);

    shootSound.play();
}

// ***************************************************************************

//alien invaders are dropping bombs
function dropBomb() {

    // let bombId
    bombId = setInterval(moveBomb, 200);

    let currentBombIndex = alienInvaders3[Math.floor(Math.random() * alienInvaders3.length)];



    function moveBomb() {

        //move bomb
        squares[currentBombIndex].classList.remove('bomb');
        currentBombIndex += width;
        squares[currentBombIndex].classList.add('bomb');

        //if bomb hits shooter
        if (squares[currentBombIndex].classList.contains('shooter')) {
            squares[currentBombIndex].classList.remove('bomb');
            // squares[currentShooterIndex].classList.add('shooter-hit')
            // setTimeout(() => squares[currentShooterIndex].classList.remove('shooter-hit'), 250)

            //add explosion sound
            explosionSound.play();
            clearInterval(bombId);
            lives--;
            livesDisplay.textContent = lives;
        }

        //remove bomb when it reaches bottom
        if (currentBombIndex > (squares.length - (width - 1))) {
            clearInterval(bombId);
            setTimeout(() => squares[currentBombIndex].classList.remove('bomb'), 70);
        }
    }

    // clearInterval(bombId);
    squares[currentBombIndex].classList.remove('bomb');
}


// *************************************************************************************************

// toggle plus/minus - invader scoring points
const invaderScoringContainer = document.querySelector(".tc-invader-scoring-container");
const iconPlus = document.querySelector(".icon-plus");
const btnIconPlus = document.querySelector(".btn-icon-plus");

btnIconPlus.addEventListener("click", function () {
    if (invaderScoringContainer.style.display === "block") {
        invaderScoringContainer.style.display = "none";
        iconPlus.classList.remove('icon-minus');

    } else {
        invaderScoringContainer.style.display = "block";
        iconPlus.classList.add('icon-minus');
    }
})