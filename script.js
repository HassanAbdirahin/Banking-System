class Account {
    constructor(balance) {
        this.balance = balance;
        this.depositTotal = 0.0;
        this.withdrawTotal = 0.0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount > 0) {
            this.depositTotal += amount;
            this.balance += amount;
            this.addTransaction(`Deposited $${amount.toFixed(2)}`);
        } else {
            alert('Please enter a valid deposit amount.');
        }
    }

    withdraw(amount) {
        if (amount > 0 && this.balance >= amount) {
            this.withdrawTotal += amount;
            this.balance -= amount;
            this.addTransaction(`Withdrawn $${amount.toFixed(2)}`);
        } else if (amount <= 0) {
            msg.style.display = 'block';
            msg.classList.add('alert', 'alert-warning');
            msg.classList.remove('alert-success', 'alert-danger');
            msg.textContent = `Please enter a valid withdrawal amount.`;
            setTimeout(()=> {
            msg.style.display = 'none';
            }, 3000);
        } else {
            msg.style.display = 'block';
            msg.classList.add('alert', 'alert-danger');
            msg.classList.remove('alert-success', 'alert-warning');
            msg.textContent = `Insufficient funds.`;
            setTimeout(()=> {
            msg.style.display = 'none';
            }, 3000);
        }
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.updateTransactionDisplay();
    }

    updateDisplay() {
        document.getElementById('deposit').textContent = `$${this.depositTotal.toFixed(2)}`;
        document.getElementById('withdraw').textContent = `$${this.withdrawTotal.toFixed(2)}`;
        document.getElementById('balance').textContent = `$${this.balance.toFixed(2)}`;
    }

    updateTransactionDisplay() {
            const transactionText = document.getElementById('collapseOne');
            transactionText.innerHTML = this.transactions.map(transaction => `<p>${transaction}</p>`).join('');
        
    }
}

const acc = new Account(0.0);

const msg = document.querySelector('#message');

// Event Listeners
document.querySelector('#deposit-btn').addEventListener('click', () => {
    const depositAmount = parseFloat(document.querySelector('#deposit-input').value);
    acc.deposit(depositAmount);
    acc.updateDisplay();

    msg.style.display = 'block';
    msg.classList.add('alert', 'alert-success');
    msg.classList.remove('alert-danger', 'alert-warning');
    msg.textContent = `Deposited $${depositAmount}`;
    setTimeout(()=> {
        msg.style.display = 'none';
    }, 3000);

    document.getElementById('deposit-input').value = '';
})

document.querySelector('#withdraw-btn').addEventListener('click', () => {
    const withdrawAmount = parseFloat(document.querySelector('#withdraw-input').value);
    acc.withdraw(withdrawAmount);
    acc.updateDisplay();

    if (withdrawAmount <= acc.balance) {
        msg.style.display = 'block';
        msg.classList.add('alert', 'alert-success');
        msg.classList.remove('alert-danger', 'alert-warning');
        msg.textContent = `Withdraw $${withdrawAmount}`;
        setTimeout(()=> {
         msg.style.display = 'none';
        }, 3000);
    }


    document.getElementById('withdraw-input').value = '';
})

document.querySelector('#more').addEventListener('click', () => {
    document.querySelector('#close').style.display = 'block';
    document.querySelector('#user-mobile').classList.add('active');
    document.querySelector('#more').style.display = 'none';
})

document.querySelector('#close').addEventListener('click', () => {
    document.querySelector('#user-mobile').classList.remove('active');
    document.querySelector('#close').style.display = 'none';
    document.querySelector('#more').style.display = 'block';
})