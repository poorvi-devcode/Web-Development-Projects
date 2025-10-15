// Users and transactions
let users = JSON.parse(localStorage.getItem("users")) || [];

// Elements
const nameInput = document.getElementById("name");
const accountNumberInput = document.getElementById("accountNumber");
const balanceInput = document.getElementById("balance");
const createAccountBtn = document.getElementById("createAccount");

const selectAccount = document.getElementById("selectAccount");
const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");

const transferAmountInput = document.getElementById("transferAmount");
const transferAccount = document.getElementById("transferAccount");
const transferBtn = document.getElementById("transfer");

const showDetailsBtn = document.getElementById("showDetails");
const accountDetailsDiv = document.getElementById("accountDetails");

// Save users to localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Update select options
function updateSelects() {
    selectAccount.innerHTML = '<option value="">Select Account</option>';
    transferAccount.innerHTML = '<option value="">Select Recipient</option>';
    users.forEach(user => {
        const option1 = document.createElement("option");
        option1.value = user.accountNumber;
        option1.textContent = `${user.name} (${user.accountNumber})`;
        selectAccount.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = user.accountNumber;
        option2.textContent = `${user.name} (${user.accountNumber})`;
        transferAccount.appendChild(option2);
    });
}

// Create account
createAccountBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const accountNumber = accountNumberInput.value.trim();
    const balance = parseFloat(balanceInput.value);

    if(!name || !accountNumber || isNaN(balance)) return alert("Please fill all fields!");

    // Check duplicate
    if(users.some(u => u.accountNumber === accountNumber)) return alert("Account number already exists!");

    users.push({ name, accountNumber, balance, transactions: [] });
    saveUsers();
    updateSelects();
    alert("Account created successfully!");
    nameInput.value = accountNumberInput.value = balanceInput.value = "";
});

// Deposit
depositBtn.addEventListener("click", () => {
    const accNum = selectAccount.value;
    const amt = parseFloat(amountInput.value);
    if(!accNum || isNaN(amt) || amt <= 0) return alert("Invalid input");

    const user = users.find(u => u.accountNumber === accNum);
    user.balance += amt;
    user.transactions.push({ type: "Deposit", amount: amt, date: new Date().toLocaleString() });
    saveUsers();
    alert("Deposit successful!");
    amountInput.value = "";
});

// Withdraw
withdrawBtn.addEventListener("click", () => {
    const accNum = selectAccount.value;
    const amt = parseFloat(amountInput.value);
    if(!accNum || isNaN(amt) || amt <= 0) return alert("Invalid input");

    const user = users.find(u => u.accountNumber === accNum);
    if(user.balance < amt) return alert("Insufficient balance!");
    user.balance -= amt;
    user.transactions.push({ type: "Withdraw", amount: amt, date: new Date().toLocaleString() });
    saveUsers();
    alert("Withdrawal successful!");
    amountInput.value = "";
});

// Transfer
transferBtn.addEventListener("click", () => {
    const fromAcc = selectAccount.value;
    const toAcc = transferAccount.value;
    const amt = parseFloat(transferAmountInput.value);
    if(!fromAcc || !toAcc || fromAcc === toAcc || isNaN(amt) || amt <= 0) return alert("Invalid transfer");

    const sender = users.find(u => u.accountNumber === fromAcc);
    const receiver = users.find(u => u.accountNumber === toAcc);
    if(sender.balance < amt) return alert("Insufficient balance!");

    sender.balance -= amt;
    receiver.balance += amt;
    sender.transactions.push({ type: `Transfer to ${toAcc}`, amount: amt, date: new Date().toLocaleString() });
    receiver.transactions.push({ type: `Transfer from ${fromAcc}`, amount: amt, date: new Date().toLocaleString() });
    saveUsers();
    alert("Transfer successful!");
    transferAmountInput.value = "";
});

// Show account details
showDetailsBtn.addEventListener("click", () => {
    const accNum = selectAccount.value;
    if(!accNum) return alert("Select account!");

    const user = users.find(u => u.accountNumber === accNum);
    let html = `<h3>${user.name} (${user.accountNumber})</h3>`;
    html += `<p>Balance: $${user.balance.toFixed(2)}</p>`;
    html += "<h4>Transactions:</h4><ul>";
    user.transactions.forEach(t => {
        html += `<li>${t.date} - ${t.type} - $${t.amount}</li>`;
    });
    html += "</ul>";
    accountDetailsDiv.innerHTML = html;
});

// Initial load
updateSelects();
