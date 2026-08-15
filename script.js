/* =====================================================
   FINANCE MANAGER
===================================================== */


/* ================= DATA ================= */

const PASSWORD = "7890";

let salary =
    Number(
        localStorage.getItem("financeSalary")
    ) || 0;


let expenses =
    JSON.parse(
        localStorage.getItem("financeExpenses")
    ) || [];


/* ================= ELEMENTS ================= */

const lockScreen =
    document.getElementById("lockScreen");

const app =
    document.getElementById("app");

const passwordInput =
    document.getElementById("passwordInput");

const unlockBtn =
    document.getElementById("unlockBtn");

const passwordError =
    document.getElementById("passwordError");

const balance =
    document.getElementById("balance");

const salaryDisplay =
    document.getElementById("salary");

const salaryBtn =
    document.getElementById("salaryBtn");

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

const notes =
    document.getElementById("notes");

const saveNotesBtn =
    document.getElementById("saveNotesBtn");

const notesSaved =
    document.getElementById("notesSaved");


/* ================= PASSWORD ================= */

function unlockApp() {

    if (
        passwordInput.value === PASSWORD
    ) {

        lockScreen.style.display = "none";

        app.style.display = "block";

        passwordError.textContent = "";

        updateMoney();

        displayExpenses();

        updateStats();

    } else {

        passwordError.textContent =
            "Incorrect password.";

        passwordInput.value = "";

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


/* ================= NAVIGATION ================= */

const navButtons =
    document.querySelectorAll(".navBtn");

const pages =
    document.querySelectorAll(".page");


navButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const pageId =
                    button.dataset.page;


                pages.forEach(
                    function(page) {

                        page.classList.remove(
                            "active"
                        );

                    }
                );


                navButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                document
                    .getElementById(pageId)
                    .classList.add("active");


                button.classList.add("active");


                if (
                    pageId === "expensesPage"
                ) {

                    displayExpenses();

                }


                if (
                    pageId === "statsPage"
                ) {

                    updateStats();

                }

            }
        );

    }
);


/* ================= MONEY ================= */

function updateMoney() {

    let totalSpent = 0;


    expenses.forEach(
        function(expense) {

            totalSpent +=
                Number(expense.amount);

        }
    );


    const currentBalance =
        salary - totalSpent;


    salaryDisplay.textContent =
        "₹" +
        salary.toLocaleString("en-IN");


    balance.textContent =
        "₹" +
        currentBalance.toLocaleString("en-IN");


    localStorage.setItem(
        "financeSalary",
        salary
    );

}


/* ================= SALARY ================= */

salaryBtn.addEventListener(
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
                "Please enter a valid salary."
            );

            return;

        }


        salary = amount;

        updateMoney();

        updateStats();

    }
);


/* ================= OPEN FORM ================= */

addExpenseBtn.addEventListener(
    "click",
    function() {

        expenseForm.classList.toggle(
            "hidden"
        );


        if (
            !expenseForm.classList.contains(
                "hidden"
            )
        ) {

            expenseTitle.focus();

        }

    }
);


/* ================= CANCEL FORM ================= */

cancelExpenseBtn.addEventListener(
    "click",
    function() {

        closeExpenseForm();

    }
);


function closeExpenseForm() {

    expenseForm.classList.add(
        "hidden"
    );

    expenseTitle.value = "";

    expenseAmount.value = "";

}


/* ================= SAVE EXPENSE ================= */

saveExpenseBtn.addEventListener(
    "click",
    function() {

        const title =
            expenseTitle.value.trim();


        const amount =
            Number(
                expenseAmount.value
            );


        if (title === "") {

            alert(
                "Please enter an expense title."
            );

            return;

        }


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            alert(
                "Please enter a valid amount."
            );

            return;

        }


        const newExpense = {

            id: Date.now(),

            title: title,

            amount: amount,

            date:
                new Date().toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                )

        };


        expenses.unshift(
            newExpense
        );


        saveExpenses();


        closeExpenseForm();

        displayExpenses();

        updateMoney();

        updateStats();

    }
);


/* ================= SAVE DATA ================= */

function saveExpenses() {

    localStorage.setItem(
        "financeExpenses",
        JSON.stringify(expenses)
    );

}


/* ================= DISPLAY EXPENSES ================= */

function displayExpenses() {

    if (expenses.length === 0) {

        expensesList.innerHTML = `

            <div class="noExpenses">

                <div class="emptyIcon">
                    💸
                </div>

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
        function(expense) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "expenseCard";


            const left =
                document.createElement(
                    "div"
                );

            left.className =
                "expenseLeft";


            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "expenseIcon";

            icon.textContent =
                "💸";


            const info =
                document.createElement(
                    "div"
                );


            const title =
                document.createElement(
                    "h3"
                );

            title.className =
                "expenseTitle";

            title.textContent =
                expense.title;


            const date =
                document.createElement(
                    "p"
                );

            date.className =
                "expenseDate";

            date.textContent =
                expense.date;


            info.appendChild(title);

            info.appendChild(date);

            left.appendChild(icon);

            left.appendChild(info);


            const right =
                document.createElement(
                    "div"
                );

            right.className =
                "expenseRight";


            const amount =
                document.createElement(
                    "strong"
                );

            amount.className =
                "expenseAmount";

            amount.textContent =
                "-₹" +
                Number(
                    expense.amount
                ).toLocaleString("en-IN");


            const deleteBtn =
                document.createElement(
                    "button"
                );

            deleteBtn.className =
                "deleteBtn";

            deleteBtn.textContent =
                "×";


            deleteBtn.addEventListener(
                "click",
                function() {

                    deleteExpense(
                        expense.id
                    );

                }
            );


            right.appendChild(amount);

            right.appendChild(deleteBtn);


            card.appendChild(left);

            card.appendChild(right);


            expensesList.appendChild(
                card
            );

        }
    );

}


/* ================= DELETE EXPENSE ================= */

function deleteExpense(id) {

    expenses =
        expenses.filter(
            function(expense) {

                return expense.id !== id;

            }
        );


    saveExpenses();

    displayExpenses();

    updateMoney();

    updateStats();

}


/* ================= WEEKLY STATS ================= */

function updateStats() {

    const barIds = [

        "barMon",
        "barTue",
        "barWed",
        "barThu",
        "barFri",
        "barSat",
        "barSun"

    ];


    const spending = {

        barMon: 0,
        barTue: 0,
        barWed: 0,
        barThu: 0,
        barFri: 0,
        barSat: 0,
        barSun: 0

    };


    const now =
        new Date();


    expenses.forEach(
        function(expense) {

            const date =
                new Date(
                    expense.id
                );


            const difference =
                Math.floor(
                    (
                        now.getTime() -
                        date.getTime()
                    ) /
                    86400000
                );


            if (
                difference >= 0 &&
                difference < 7
            ) {

                const day =
                    date.getDay();


                const dayNames = [

                    "barSun",
                    "barMon",
                    "barTue",
                    "barWed",
                    "barThu",
                    "barFri",
                    "barSat"

                ];


                spending[
                    dayNames[day]
                ] += Number(
                    expense.amount
                );

            }

        }
    );


    let maximum = 0;


    barIds.forEach(
        function(id) {

            if (
                spending[id] >
                maximum
            ) {

                maximum =
                    spending[id];

            }

        }
    );


    barIds.forEach(
        function(id) {

            const bar =
                document.getElementById(
                    id
                );


            if (
                maximum === 0
            ) {

                bar.style.height =
                    "5px";

            } else {

                const height =
                    Math.max(
                        8,
                        (
                            spending[id] /
                            maximum
                        ) * 180
                    );


                bar.style.height =
                    height + "px";

            }

        }
    );


    updateTip();

}


/* ================= MONEY TIP ================= */

function updateTip() {

    const tip =
        document.getElementById(
            "moneyTip"
        );


    if (
        expenses.length === 0
    ) {

        tip.textContent =
            "Add some expenses to get personalized spending tips.";

        return;

    }


    let total =
        0;


    expenses.forEach(
        function(expense) {

            total +=
                Number(
                    expense.amount
                );

        }
    );


    if (salary <= 0) {

        tip.textContent =
            "Add your monthly salary to get useful spending insights.";

        return;

    }


    const percentage =
        (total / salary) * 100;


    if (percentage >= 50) {

        tip.textContent =
            "Your recorded expenses are a large part of your monthly income. Keep an eye on your biggest expenses.";

    }

    else if (percentage >= 25) {

        tip.textContent =
            "Your spending is becoming noticeable compared with your income. Review your largest expenses.";

    }

    else {

        tip.textContent =
            "Your recorded spending is currently below 25% of your monthly income. Keep tracking consistently.";

    }

}


/* ================= NOTES ================= */

const savedNotes =
    localStorage.getItem(
        "financeNotes"
    );


if (savedNotes !== null) {

    notes.value =
        savedNotes;

}


saveNotesBtn.addEventListener(
    "click",
    function() {

        localStorage.setItem(
            "financeNotes",
            notes.value
        );


        notesSaved.textContent =
            "✓ Notes saved";

    }
);


notes.addEventListener(
    "input",
    function() {

        localStorage.setItem(
            "financeNotes",
            notes.value
        );

    }
);


/* ================= START ================= */

updateMoney();

displayExpenses();

updateStats();
