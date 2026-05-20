
let hScore = 0;
let score = 0;
let ballInBasket = 0;
let live = 3;
let ballLive = "⚾⚾⚾";

const collectBallAudio = new Audio('../audio/collect_ball.wav');
const gameOverAudio = new Audio('../audio/game_over.wav');
const backgroundMusic = new Audio('../audio/Background_music.wav');
backgroundMusic.volume = 0.2;

let currentUserName = "";
let currentHighScore = 0;
let currentUserEmail = sessionStorage.getItem('currentUserEmail');


// פונקציה לעדכון נתוני המשתמש מה-localStorage
function updateUserData() {
    if (currentUserEmail) {
        const storedUserJson = localStorage.getItem(currentUserEmail);
        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            currentUserName = storedUser.firstName; 
            currentHighScore = storedUser.highScore || 0;
            document.getElementById("highScore").value = currentHighScore;
            document.getElementById("name").value = currentUserName + "!";
            
        } else {
            window.location.href = 'home.html';
        }
    } else {
        window.location.href = 'home.html';
    }
}

 updateUserData(); // טעינת נתוני המשתמש בעת טעינת הדף
document.getElementById("highScore").value = currentHighScore;

// פונקציה להפעלת מוזיקת הרקע בפעם הראשונה שהסל זז
let isMusicPlayed = false;
function playBackgroundMusicOnFirstMove() {
    if (!isMusicPlayed) {
        backgroundMusic.play().then(() => {
            isMusicPlayed = true;
        })
    }
}

function form(score, ballInBasket) {
    document.getElementById("score").value = score;
    document.getElementById("ballInBasket").value = ballInBasket;
}
//עדכון החיים בטופס
function formBallLive(ballLive) {
    document.getElementById("ballLive").value = ballLive;
}

//  ...פונקציה שבודקת אם הכדור נכנס לסל ואם כן מעלה את הנקודות
function checkPos(ballPos,ball) {
    let basketPos = parseInt(basket.style.left);
    ballPos = parseInt(ballPos);
    if (basketPos <= ballPos && basketPos + 150 >= ballPos) {
        removeBall(ball); 
        ballInBasket++;
        score += 57;
        collectBallAudio.play();
    } else {
        boom(ballPos);
        live--;
        ballLive = ballLive.slice(0, -1);
    }
    updateHighScore();
    plusLive(ballInBasket);
    gameOver(live);
}

//עדכון שיא בlocalStorage
function updateHighScore() {
    if (score > currentHighScore) {
        currentHighScore = score;
        document.getElementById("highScore").value = currentHighScore;
        if (currentUserEmail) {
            const storedUserJson = localStorage.getItem(currentUserEmail);
            if (storedUserJson) {
                const storedUser = JSON.parse(storedUserJson);
                storedUser.highScore = currentHighScore;
                localStorage.setItem(currentUserEmail, JSON.stringify(storedUser));
            }
        }
    }
}

//פונקציה שמראה את הפיצוץ של הכדור
function boom(ballPos) {
    const container = document.getElementById("imageBoomContainer");
    const imgBoom = document.getElementById("imgBoom");
    container.style.left = ballPos - 25 + 'px';
    container.style.bottom = '0px';
    container.style.visibility = 'visible';
    container.style.width = '100px';
    container.style.height = '100px';

    // הסרת המעבר (אם קיים) לפני התחלת אנימציה חדשה
    imgBoom.style.transition = '';
    imgBoom.style.width = '0px';
    imgBoom.style.height = '0px';

    setTimeout(() => {
        imgBoom.style.transition = 'width 0.5s ease-in-out, height 0.5s ease-in-out';
        imgBoom.style.width = '100px';
        imgBoom.style.height = '100px';
    }, 0);

    setTimeout(() => {
        container.style.visibility = 'hidden';
        imgBoom.style.width = '0px';
        imgBoom.style.height = '0px';
    }, 600);
}

//פונקציה שבודקת אם הצובר == 10 עולה חיים
function plusLive(ballInBasket) {
    if (ballInBasket === 7) {
        live++;
        ballLive += "⚾";
    }
    formBallLive(ballLive);
}

//פונקצית game-over
function gameOver(live) {
    if (live === 0) {
        ballInBasket = 0;
        score = 0;
        gameOverAudio.play();

        if (currentUserEmail) {
            localStorage.setItem('tempUserEmail', currentUserEmail);
        }
       // הצג את האלמנט
        document.getElementById('gameOver').style.display = 'block';
        
        setTimeout(() => {
            window.location.reload();
        }, 6000);
    }
    form(score, ballInBasket);
}

// פונקציה שמזיזה את הסל ע"י לחיצה על מקשי החיצים במקלדת
document.addEventListener('DOMContentLoaded', function() {
    const basket = document.getElementById("basket");
    let basketPosition = 0;
    const step = 30;
    const screenWidth = window.innerWidth;
    const basketWidth = basket.offsetWidth;
    let firstMove = true;
    basket.style.left = basketPosition + 'px';

    document.addEventListener('keydown', function(event) {
        let moved = false;

        switch (event.key) {
            case 'ArrowLeft':
                if (basketPosition - step >= 0) {
                    basketPosition -= step;
                    basket.style.left = basketPosition + 'px';
                    moved = true;
                }
                break;

            case 'ArrowRight':
                if (basketPosition + basketWidth + step <= screenWidth) {
                    basketPosition += step;
                    basket.style.left = basketPosition + 'px';
                    moved = true;
                }
                break;
        }

        if (moved && firstMove) {
            playBackgroundMusicOnFirstMove();
            firstMove = false;
        }
    });
});

//פונקציה שמוחקת את הכדור
function removeBall(ball){
    ball.remove()
}

// פונקציה שמיצרת את הכדורים
window.onload = () => {
    const tempUserEmail = localStorage.getItem('tempUserEmail');
    if (tempUserEmail) {
        currentUserEmail = tempUserEmail;
        localStorage.removeItem('tempUserEmail');
        updateUserData();
    } else if (!currentUserEmail) {
        window.location.href = 'home.html';
    } else {
        updateUserData();
    }
    document.getElementById("highScore").value = currentHighScore;

    const arrColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FF69B4", "#00CED1"];
    setInterval(() => {
        document.getElementById("balls")
    }, 100)
    setInterval(() => {
        let ball = document.createElement("div");
        let randRight  = Math.floor(Math.random() * (window.innerWidth - 50)); 
        let arrColorsI = Math.floor(Math.random() * arrColors.length);
        ball.className = "ball";
        ball.style.left = randRight + "px";
        ball.style.backgroundColor = arrColors[arrColorsI];
        document.getElementById("balls").appendChild(ball);
        setTimeout(() => {
            removeBall(ball);
        }, 4000);
        setTimeout(() => {
            checkPos(ball.style.left,ball);
        }, 4000);
    }, 2000)
}