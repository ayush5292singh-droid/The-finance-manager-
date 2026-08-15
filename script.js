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
/* =====================================================
   PART 2 - EXPENSE MANAGER
===================================================== */


/* ================= ELEMENTS ================= */

const addExpenseBtn =
    document.getElementById("addExpenseBtn");

const expenseForm =
    document.getElementById("expenseForm");

const expenseTitle =
    document.getElementById("expenseTitle");

const expenseAmount =
    document.getElementById("expenseAmount");

const saveExpenseBtn =
    document.getElementById("saveExpenseBtn");

const cancelExpenseBtn =
    document.getElementById("cancelExpenseBtn");

const expensesList =
    document.getElementById("expensesList");


/* ================= LOAD EXPENSES ================= */

let expenses =
    JSON.parse(
        localStorage.getItem("expenses")
    ) || [];


/* ================= OPEN FORM ================= */

addExpenseBtn.addEventListener(
    "click",
    function () {

        if (expenseForm.style.display === "block") {

            expenseForm.style.display = "none";

        } else {

            expenseForm.style.display = "block";

            expenseTitle.focus();

        }

    }
);


/* ================= CANCEL ================= */

cancelExpenseBtn.addEventListener(
    "click",
    function () {

        expenseForm.style.display = "none";

        expenseTitle.value = "";

        expenseAmount.value = "";

    }
);


/* ================= SAVE EXPENSE ================= */

saveExpenseBtn.addEventListener(
    "click",
    function () {

        const title =
            expenseTitle.value.trim();

        const amount =
            Number(expenseAmount.value);


        if (title === "") {

            alert("Please enter an expense title.");

            return;

        }


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            alert("Please enter a valid amount.");

            return;

        }


        /* CREATE EXPENSE */

        const expense = {

            id: Date.now(),

            title: title,

            amount: amount,

            date: new Date().toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            )

        };


        expenses.unshift(expense);


        /* SAVE */

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );


        /* CLEAR FORM */

        expenseTitle.value = "";

        expenseAmount.value = "";

        expenseForm.style.display = "none";


        /* UPDATE */

        displayExpenses();

        updateFinanceBalance();

    }
);


/* ================= DISPLAY EXPENSES ================= */

function displayExpenses() {

    if (expenses.length === 0) {

        expensesList.innerHTML = `

            <div class="noExpenses">

                <div>💸</div>

                <h3>
                    No expenses yet
                </h3>

                <p>
                    Add your first expense.
                </p>

            </div>

        `;

        return;

    }


    expensesList.innerHTML = "";


    expenses.forEach(
        function (expense) {

            const card =
                document.createElement("div");


            card.className =
                "expenseCard";


            card.innerHTML = `

                <div class="expenseCardLeft">

                    <div class="expenseIcon">
                        💸
                    </div>

                    <div>

                        <h3 class="expenseCardTitle">
                            ${escapeExpenseText(expense.title)}
                        </h3>

                        <p class="expenseDate">
                            ${expense.date}
                        </p>

                    </div>

                </div>


                <div class="expenseCardRight">

                    <strong class="expenseMoney">
                        -₹${expense.amount.toLocaleString("en-IN")}
                    </strong>

                    <button
                        class="deleteExpenseBtn"
                        data-id="${expense.id}">

                        ×

                    </button>

                </div>

            `;


            expensesList.appendChild(card);

        }
    );


    /* DELETE BUTTONS */

    document
        .querySelectorAll(".deleteExpenseBtn")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(this.dataset.id);


                        expenses =
                            expenses.filter(
                                function (expense) {

                                    return expense.id !== id;

                                }
                            );


                        localStorage.setItem(
                            "expenses",
                            JSON.stringify(expenses)
                        );


                        displayExpenses();

                        updateFinanceBalance();

                    }
                );

            }
        );

}


/* ================= UPDATE BALANCE ================= */

function updateFinanceBalance() {

    let totalSpent = 0;


    expenses.forEach(
        function (expense) {

            totalSpent += expense.amount;

        }
    );


    const currentBalance =
        salary - totalSpent;


    balanceDisplay.textContent =
        "₹" +
        currentBalance.toLocaleString("en-IN");

}


/* ================= SECURITY ================= */

function escapeExpenseText(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ================= START ================= */

displayExpenses();

updateFinanceBalance();
