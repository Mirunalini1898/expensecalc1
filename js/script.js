const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('number');

//const dummyTransactions = [
//    {id: 1, description: 'salary', amount: 300},
//    {id: 2, description: 'Books', amount: -175},
//    {id: 3, description: 'Rent', amount: -50},
//    {id: 4, description: 'Flower', amount: -20}
//];

const localStorageTransactions= JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions')!==null?localStorageTransactions:[];
function updateLocalStorage()
{
 localStorage.setItem('transactions',JSON.stringify(transactions));
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount<0?'minus':'plus');
    item.innerHTML=`${transaction.description} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}
function updateValue()
{
    const amounts = transactions.map(transaction=> transaction.amount);
    const total = amounts.reduce((acc, item)=>acc+item, 0).toFixed(2);
    const income = amounts.filter(item=>item>0)
                          .reduce((acc, item)=>acc+item, 0)
                          .toFixed(2);
    const expense = (amounts.filter(item=>item<0)
                            .reduce((acc, item)=>acc+item, 0)*-1)
                            .toFixed(2);
    moneyPlus.innerHTML=`<i class="fa fa-rupee" id="rupee">${income}`;
    moneyMinus.innerHTML=`<i class="fa fa-rupee" id="rupee">${expense}`;
    balance.innerHTML=`<i class="fa fa-rupee" id="rupee">${total}`;
}
function addTransaction(e) {
    e.preventDefault();
    if(description.value.trim()==='' || amount.value.trim()===''){
        alert('Please add a description and amount.');
    } else {
        const newTransaction = {
            id: generateId(),
            description: description.value,
            amount: +amount.value
        };
        console.log(newTransaction);
        transactions.push(newTransaction);
        addTransactionDOM(newTransaction);
        updateValue();
        updateLocalStorage();
        description.value='';
        number.value='';
        description.focus();
    }
}
function generateId() {
    return Math.floor(Math.random()*100000000);
}

function removeTransaction(transactionId){
    transactions = transactions.filter(trans=>trans.id!==transactionId);
    updateLocalStorage();
    init();
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValue();
}
init();
form.addEventListener('submit',addTransaction);
















