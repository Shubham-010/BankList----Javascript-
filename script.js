'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  username: 'js',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  username: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  username: 'sw',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  username: 'ss',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const logOut = document.querySelector('.form__btn--logout');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const test = document.querySelector('.test');

// ----------Code-----------

const displaymovements = function (movements) {
  containerMovements.innerHTML = ''; //   ---------------------------    Clear previous Reords

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
          <div class="movements__value">${mov} 💶</div>
        </div>
      `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // ------------To add Html content inside movement
    // ------------insertAdjacentHTML ---------------------------
    // < !--beforebegin -->
    //  <p>
    //    <!-- afterbegin -->
    //    foo
    //    <!-- beforeend -->
    //  </p>
    // <!--afterend -->
    // ---------------------------------------
  });

  const createuserName = function (accs) {
    accs.forEach(acc => {
      acc.userName = acc.owner;
      const userName = user
        .toLowerCase()
        .split('')
        .map(name => name[0])
        .join('');
      return userName;
    });

    createuserName(accounts);
  };
};


const displaySummary = (movements) => {
  const resultValDep = movements.reduce((mov, cur) => (mov > 0) ? mov + cur : mov);
  const resultValWithD = movements.reduce((mov, cur) => (mov < 0) ? mov + cur : mov);
  const resultValWithInt = (movements.reduce((mov, cur, i, arr) => mov + cur)) / movements.length;
  labelSumIn.textContent = `${resultValDep} 💶`;
  labelSumOut.textContent = `${resultValWithD} 💶`;
  labelSumInterest.textContent = `${resultValWithInt} 💶`;

};

const calDisBalance = (acct) => {
  acct.balance = acct.movements.reduce((mov, cur) => mov + cur , 0);
  labelBalance.textContent = `${acct.balance}`
};

// ----------Login Validation---------------------------
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log('currentAccount :>> ', currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Display movements
    displaymovements(currentAccount.movements);

    //Display balance
    calDisBalance(currentAccount);

    //Display summary
    displaySummary(currentAccount.movements);

  }
})
// -----------------------------------------------


// -------------------transfer Btn----------------------------
btnTransfer.addEventListener('click', (event) => {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  console.log(amount, receiverAcc);
  if(amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username ){
    console.log('transferValid :>> ');
  }
})

logOut.addEventListener('click', () => {
  containerApp.style.opacity = 0;
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginUsername.focus();
})

// -------------------------------------


////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const converate = 1.1;
const resultdata = movements.map(function (mov, i) {
  return mov * converate;
});
console.log('resultdata :>> ', resultdata);

// function fiboN(num) {
//   debugger
//   let fib = [0,1];
//   for (let i = 2; i < num; i++) {
//    fib[i] = fib[i - 1] + fib[i - 2]
//   }
//   return fib.slice(0,num);
// }
// let num =  0;
// let resul = fiboN(num);
// console.log('fibo :>> ', resul); 


//!Using method
// let data =  'hello world!'
// function reversestring(data) {
//   let Ndata =  data.split(" ").reverse().join(" ");
//   console.log('Ndata', Ndata)
// }
// reversestring(data);

//!reverse Number
// let data1 =  1234 +""
// function reversenum(data1) {
//   let Ndata1 =  data1.split("").reverse().join("");
//   console.log('Ndata', Ndata1)
// }
// reversenum(data1);

//!reverse number without converting to string 

// let dataN =  1234;
// function reversenumwithoutCon(dataN) {
//   let reversed = 0;
//   while(dataN !== 0){
//     reversed = reversed * 10 + dataN % 10;
//     dataN = Math.floor(dataN/10);
//   }
//   return reversed;

// }

//! Challenge Question 
// let a = NaN;
// let b = NaN;
// console.log('first', Number.isNaN(a) == Number.isNaN(b))
// console.log('first', a === b)

//! Destructure Object
// const obj = {a:'JS'};

// const {a, a:b, a:c} = obj;
// console.log('Object', a,b,c)

//!Pre-post increment questions
// let a = 10;
// let b = a++;
// let c = ++a;
// let dataN = a + b + c;
// console.log('a + b + c', a + b + c)

console.log(3<8>2,'test')

// let resdata =  reversenumwithoutCon(dataN);
let resdata =  dataN;
console.log('test', test)
test.textContent = resdata;

/////////////////////////////////////////////////
