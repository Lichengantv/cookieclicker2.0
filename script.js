let cookieCount = 0;
let autoClicker = 0;
let doubleCookie = false;
let leaderboard = [];

const cookie = document.getElementById("cookie");
const cookieCountDisplay = document.getElementById("cookie-count");
const autoClickerButton = document.getElementById("auto-clicker");
const doubleCookieButton = document.getElementById("double-cookie");

// Click event for cookies
cookie.addEventListener("click", () => {
    let cookiesToAdd = 1;
    if (doubleCookie) {
        cookiesToAdd = 2; // Double cookie bonus
    }
    cookieCount += cookiesToAdd;
    cookieCountDisplay.innerText = `Cookies: ${cookieCount}`;
    checkForSpecialCookies();
});

// Auto-clicker logic
setInterval(() => {
    if (autoClicker > 0) {
        cookieCount += autoClicker;
        cookieCountDisplay.innerText = `Cookies: ${cookieCount}`;
    }
}, 1000);

// Special cookie chance logic (Rainbow Cookie, Rainbow)
function checkForSpecialCookies() {
    const rand = Math.random();
    if (rand < 0.05) {
        alert("You got a Rainbow Cookie! (+100 cookies)");
        cookieCount += 100;
        cookieCountDisplay.innerText = `Cookies: ${cookieCount}`;
    }
    if (rand < 0.001) {
        alert("You got a Rainbow! (+1000 cookies)");
        cookieCount += 1000;
        cookieCountDisplay.innerText = `Cookies: ${cookieCount}`;
    }
}

// Auto-clicker purchase
autoClickerButton.addEventListener("click", () => {
    if (cookieCount >= 100) {
        cookieCount -= 100;
        autoClicker += 1;
        cookieCountDisplay.innerText = `Cookies: ${cookieCount}`;
    } else {
        alert("Not enough cookies!");
    }
});

// Double Cookie purchase
doubleCookieButton.addEventListener("click", () => {
    if (cookieCount >= 200) {
        cookieCount -= 200;
        doubleCookie = true;
        cookieCountDisplay.innerText = `Cookies: ${cookieCount}`;
    } else {
        alert("Not enough cookies!");
    }
});

// Update leaderboard
function updateLeaderboard() {
    leaderboard.push({ name: "Player", score: cookieCount });
    leaderboard.sort((a, b) => b.score - a.score);
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = '';
    leaderboard.slice(0, 5).forEach(player => {
        const li = document.createElement("li");
        li.innerText = `${player.name}: ${player.score} cookies`;
        leaderboardList.appendChild(li);
    });
}

// Periodically update leaderboard
setInterval(updateLeaderboard, 10000); // Update leaderboard every 10 seconds
