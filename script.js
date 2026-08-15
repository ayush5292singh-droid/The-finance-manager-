/* ================= PASSWORD ================= */

const correctPassword = "7890";

const passwordInput =
    document.getElementById("password");

const unlockBtn =
    document.getElementById("unlockBtn");

const lockScreen =
    document.getElementById("lockScreen");

const app =
    document.getElementById("app");

const wrongPassword =
    document.getElementById("wrongPassword");


function unlockApp() {

    if (passwordInput.value === correctPassword) {

        lockScreen.style.display = "none";

        app.style.display = "block";

        wrongPassword.textContent = "";

    } else {

        wrongPassword.textContent =
            "Incorrect password. Try again.";

        passwordInput.value = "";

        passwordInput.focus();

    }
}


unlockBtn.addEventListener(
    "click",
    unlockApp
);


passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            unlockApp();

        }

    }
);


/* ================= SALARY ================= */

const salaryBtn =
    document.getElementById("salaryBtn");

const salaryDisplay =
    document.getElementById("salary");

const balanceDisplay =
    document.getElementById("balance");


let salary =
    Number(
        localStorage.getItem("salary")
    ) || 0;


salaryDisplay.textContent =
    "₹" + salary.toLocaleString("en-IN");


balanceDisplay.textContent =
    "₹" + salary.toLocaleString("en-IN");


salaryBtn.addEventListener(
    "click",
    function() {

        const amount =
            prompt("Enter your monthly salary:");

        if (amount === null) {
            return;
        }

        const value =
            Number(amount);

        if (
            isNaN(value) ||
            value < 0
        ) {

            alert(
                "Please enter a valid amount."
            );

            return;
        }

        salary = value;

        localStorage.setItem(
            "salary",
            salary
        );

        salaryDisplay.textContent =
            "₹" +
            salary.toLocaleString("en-IN");

        balanceDisplay.textContent =
            "₹" +
            salary.toLocaleString("en-IN");

    }
);
