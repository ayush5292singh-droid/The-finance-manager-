/* ================= PASSWORD ================= */

const PASSWORD = "7890";

const lockScreen =
    document.getElementById("lockScreen");

const app =
    document.getElementById("app");

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const errorMessage =
    document.getElementById("errorMessage");


function unlockApp() {

    if (passwordInput.value === PASSWORD) {

        lockScreen.style.display = "none";

        app.style.display = "block";

        errorMessage.textContent = "";

    } else {

        errorMessage.textContent =
            "Incorrect password.";

        passwordInput.value = "";

        passwordInput.focus();
    }
}


unlockButton.addEventListener(
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

const salaryButton =
    document.getElementById("salaryButton");

const salaryDisplay =
    document.getElementById("salary");

const balanceDisplay =
    document.getElementById("balance");


let salary =
    Number(
        localStorage.getItem("financeSalary")
    ) || 0;


function updateSalary() {

    salaryDisplay.textContent =
        "₹" +
        salary.toLocaleString("en-IN");

    balanceDisplay.textContent =
        "₹" +
        salary.toLocaleString("en-IN");

}


salaryButton.addEventListener(
    "click",
    function() {

        const value =
            prompt(
                "Enter your monthly salary:"
            );

        if (value === null) {
            return;
        }

        const amount =
            Number(value);

        if (
            !Number.isFinite(amount) ||
            amount < 0
        ) {

            alert(
                "Please enter a valid amount."
            );

            return;
        }

        salary = amount;

        localStorage.setItem(
            "financeSalary",
            salary
        );

        updateSalary();

    }
);


/* ================= START ================= */

updateSalary();
