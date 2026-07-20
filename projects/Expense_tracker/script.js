let balance = 0;
let expense = 0;
let income = 0;
let transactions = [];
const addBtn = document.getElementById("addbutton");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


saveBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if(name === "" || amount <= 0){
        alert("Enter valid details");
        return;
    }

    transactions.push({
        name,
        amount,
        type
    });

    renderTransactions();
    updateSummary();

    modal.style.display = "none";

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
});

function renderTransactions(searchText = "") {

    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    const filteredTransactions = transactions.filter(transaction =>
        transaction.name.toLowerCase()
            .includes(searchText.toLowerCase())
    );

    filteredTransactions.forEach((transaction, index) => {

        const div = document.createElement("div");

        div.className = `transaction ${transaction.type}`;

        div.innerHTML = `
            <span>${transaction.name}</span>
            <span>₹${transaction.amount}</span>
            <button onclick="removeTransaction(${transactions.indexOf(transaction)})">
                Remove
            </button>
        `;

        list.prepend(div);
    });
}

function removeTransaction(index){

    transactions.splice(index, 1);

    renderTransactions(searchBox.value);
    updateSummary();
}

function updateSummary(){

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if(transaction.type === "income"){
            income += transaction.amount;
            balance += transaction.amount;
        }
        else{
            expense += transaction.amount;
            balance -= transaction.amount;
        }
    });

    document.getElementById("showbalance").textContent = balance;

    document.getElementById("budgetValue").textContent =
        `₹${income}`;

    document.getElementById("expenseValue").textContent =
        `₹${expense}`;
}

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {
    renderTransactions(searchBox.value);
});
