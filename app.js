for (let i = 0; i < 255; i++) {
    var divElement = document.createElement("Div");
    document.querySelector(".grid").appendChild(divElement);
}

// const startBtn = document.querySelector(".start")

const squares = document.querySelectorAll('.grid div')
const resultDisplay = document.querySelector('#result')
const btnShoot = document.querySelector(".btn-shoot")
const btnLeft = document.querySelector(".btn-left")
const btnRight = document.querySelector(".btn-right")
const shooter = document.querySelector('.shooter')
const displayGameOver = document.querySelector("#game-over")


var shootSound;
var boomSound;


let width = 17
let currentShooterIndex = 202
let currentInvaderIndex = 0
let alienInvadersTakenDown = []
let alienInvadersTakenDown1 = []
let alienInvadersTakenDown2 = []
let alienInvadersTakenDown3 = []
let alienInvadersTakenDown4 = []

let result = 0
let direction = 1
let invaderId

//define the alien invaders in different ranks
const alienInvaders4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const alienInvaders3 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
const alienInvaders2 = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
const alienInvaders1 = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60]


// const alienInvaders3 = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
// const alienInvaders2 = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
// const alienInvaders1 = [45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
// 40 invaders

//push the 4 diffrent alienInvaders-Arrays ind one array
const alienInvaders = []
alienInvaders.push(...alienInvaders1, ...alienInvaders2, ...alienInvaders3, ...alienInvaders4)
// console.log(alienInvaders)

//draw the alien invaders
alienInvaders1.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader1', 'invader'))
alienInvaders2.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader2', 'invader'))
alienInvaders3.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader3', 'invader'))
alienInvaders4.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader4', 'invader'))


// draw the shooter
squares[currentShooterIndex].classList.add('shooter')

//move the shooter along a line
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')

    //move shooter with keyboard, arrow left and arrow right
    switch (e.keyCode) {
        case 37:
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            btnLeft.classList.add("color-btn-dir")
            setTimeout(() => btnLeft.classList.remove("color-btn-dir"), 600)
            break
        case 39:
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            btnRight.classList.add("color-btn-dir")
            setTimeout(() => btnRight.classList.remove("color-btn-dir"), 600)
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter);

// add eventlistener for direction buttons, for use without keyboard
btnLeft.addEventListener('touchstart', function () {
    squares[currentShooterIndex].classList.remove('shooter')
    if (currentShooterIndex % width !== 0) {
        currentShooterIndex -= 1
    }
    squares[currentShooterIndex].classList.add('shooter')
})

btnRight.addEventListener('touchstart', function () {
    squares[currentShooterIndex].classList.remove('shooter')
    if (currentShooterIndex % width < width - 1) {
        currentShooterIndex += 1
    }
    squares[currentShooterIndex].classList.add('shooter')
})



// move the alien invaders
function moveInvaders() {

    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        direction = width
    } else if (direction === width) {
        if (leftEdge) direction = 1
        else direction = -1
    }

    //remove Invaders
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        // squares[alienInvaders1[i]].classList.remove('invader1')
        squares[alienInvaders1[i]].classList.remove('invader1', 'invader')
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        // squares[alienInvaders2[i]].classList.remove('invader2')
        squares[alienInvaders2[i]].classList.remove('invader2', 'invader')
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        // squares[alienInvaders3[i]].classList.remove('invader3')
        squares[alienInvaders3[i]].classList.remove('invader3', 'invader')
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        // squares[alienInvaders4[i]].classList.remove('invader4')
        squares[alienInvaders4[i]].classList.remove('invader4', 'invader')
    }


    //add direction
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        alienInvaders[i] += direction
    }
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        alienInvaders1[i] += direction
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        alienInvaders2[i] += direction
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        alienInvaders3[i] += direction
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        alienInvaders4[i] += direction
    }


    //add invaders again
    for (let i = 0; i <= alienInvaders1.length - 1; i++) {
        if (!alienInvadersTakenDown1.includes(i)) {
            // squares[alienInvaders1[i]].classList.add('invader1')
            squares[alienInvaders1[i]].classList.add('invader1', 'invader')
        }
    }
    for (let i = 0; i <= alienInvaders2.length - 1; i++) {
        if (!alienInvadersTakenDown2.includes(i)) {
            // squares[alienInvaders2[i]].classList.add('invader2')
            squares[alienInvaders2[i]].classList.add('invader2', 'invader')
        }
    }
    for (let i = 0; i <= alienInvaders3.length - 1; i++) {
        if (!alienInvadersTakenDown3.includes(i)) {
            // squares[alienInvaders3[i]].classList.add('invader3')
            squares[alienInvaders3[i]].classList.add('invader3', 'invader')
        }
    }
    for (let i = 0; i <= alienInvaders4.length - 1; i++) {
        if (!alienInvadersTakenDown4.includes(i)) {
            // squares[alienInvaders4[i]].classList.add('invader4')
            squares[alienInvaders4[i]].classList.add('invader4', 'invader')
        }
    }


    // Game Over settings
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        displayGameOver.textContent = ' - Game Over'
        squares[currentShooterIndex].classList.add('boom')
        btnShoot.removeEventListener("touchstart", shoot);

        clearInterval(invaderId)
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        if (alienInvaders[i] > (squares.length - (15 - 1))) {
            displayGameOver.textContent = ' - Game Over'
            btnShoot.removeEventListener("touchstart", shoot);
            clearInterval(invaderId)
        }
    }

    //you hit all alienInvaders => you win
    if (alienInvadersTakenDown.length === alienInvaders.length) {
        // console.log(alienInvadersTakenDown.length)
        // console.log(alienInvaders.length)
        displayGameOver.textContent = ' - You Win'

        clearInterval(invaderId)
    }
}

//set intervall, a little bit faster for big screen with keyboard
const mediaQuery = window.matchMedia("(min-width: 1025px)");

if (mediaQuery.matches) {
    invaderId = setInterval(moveInvaders, 500), 1000
} else {
    invaderId = setInterval(moveInvaders, 550), 1000
}



//shoot at alien invaders
function shoot() {

    let laserId
    let currentLaserIndex = currentShooterIndex
    //remove eventlisteners for shooting, so it can shoot only once at a time
    document.removeEventListener('keyup', spacebarShoot)
    btnShoot.removeEventListener("touchstart", shoot);

    //move the laser from the shooter to the alien invader
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')

        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        //if laser hits invader
        if (squares[currentLaserIndex].classList.contains('invader')) {

            //change score, depending on rank of invader
            if (squares[currentLaserIndex].classList.contains('invader4')) {
                result = result + 50
                resultDisplay.textContent = result
            } else if (squares[currentLaserIndex].classList.contains('invader3')) {
                result = result + 30
                resultDisplay.textContent = result
            } else if (squares[currentLaserIndex].classList.contains('invader2')) {
                result = result + 15
                resultDisplay.textContent = result
            } else if (squares[currentLaserIndex].classList.contains('invader1')) {
                result = result + 5
                resultDisplay.textContent = result
            }

            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader', 'invader1', 'invader2', 'invader3', 'invader4')

            //you can shoot again
            document.addEventListener('keyup', spacebarShoot)
            btnShoot.addEventListener("touchstart", shoot);

            //add boom sound
            squares[currentLaserIndex].classList.add('boom')
            boomSound = new Audio("/sound/boom.wav");
            boomSound.play();

            //remove .boom (star)
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)

            clearInterval(laserId)

            //  put hitten invaders in a variable
            const alienTakenDown1 = alienInvaders1.indexOf(currentLaserIndex);
            const alienTakenDown2 = alienInvaders2.indexOf(currentLaserIndex);
            const alienTakenDown3 = alienInvaders3.indexOf(currentLaserIndex);
            const alienTakenDown4 = alienInvaders4.indexOf(currentLaserIndex);

            //and put these in an array
            alienInvadersTakenDown4.push(alienTakenDown4)
            alienInvadersTakenDown3.push(alienTakenDown3)
            alienInvadersTakenDown2.push(alienTakenDown2)
            alienInvadersTakenDown1.push(alienTakenDown1)

        }

        if (currentLaserIndex < width) {
            clearInterval(laserId)
            setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
            document.addEventListener('keyup', spacebarShoot)
            btnShoot.addEventListener("touchstart", shoot);
        }

    }

    laserId = setInterval(moveLaser, 100)
    shootSound = new Audio("/sound/shoot.wav");
    shootSound.play();
}




//press key: spacebar for shooting
//can only shoot, when laser hit invader or reaches end of grid
document.addEventListener('keyup', spacebarShoot)

function spacebarShoot(e) {
    if (e.keyCode === 32) {
        shoot()
        btnShoot.classList.add("color-shooter")
        setTimeout(() => btnShoot.classList.remove("color-shooter"), 600)
    }
}


//touch button schiessen and shoot
btnShoot.addEventListener("touchstart", shoot);