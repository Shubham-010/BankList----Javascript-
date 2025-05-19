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

const displaymovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //   ---------------------------    Clear previous Reords

  const movs = sort
    ? movements.slice().sort((a, b) => {
        a - b;
      })
    : movements;
  console.log('movs :>> ', movs);

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
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

const now = new Date();
labelDate.textContent = now;

const displaySummary = movements => {
  const resultValDep = movements.reduce((mov, cur) =>
    mov > 0 ? mov + cur : mov
  );
  const resultValWithD = movements.reduce((mov, cur) =>
    mov < 0 ? mov + cur : mov
  );
  const resultValWithInt =
    movements.reduce((mov, cur, i, arr) => mov + cur) / movements.length;
  labelSumIn.textContent = `${resultValDep} 💶`;
  labelSumOut.textContent = `${resultValWithD} 💶`;
  labelSumInterest.textContent = `${resultValWithInt} 💶`;
};

// Timer
const startLogoutTimer = function () {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log In to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const calDisBalance = acct => {
  acct.balance = acct.movements.reduce((mov, cur) => mov + cur, 0);
  labelBalance.textContent = `${acct.balance}`;
};

//* ----------Login Validation------------
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log('currentAccount :>> ', currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Start timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    //Display movements
    displaymovements(currentAccount.movements);

    //Display balance
    calDisBalance(currentAccount);

    //Display summary
    displaySummary(currentAccount.movements);
  }
});
// -----------------------------------------------

// -------------------transfer Btn----------------------------
btnTransfer.addEventListener('click', event => {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('transferValid :>> ');
  }
});

btnLoan.addEventListener('click', event => {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

logOut.addEventListener('click', () => {
  containerApp.style.opacity = 0;
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginUsername.focus();
});
//* -------------------------------------

//* ----------------Transaction-----------
btnTransfer.addEventListener('click', function (e) {
  debugger;
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log('receiverAcc :>> ', receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = ''; // Clear field
  let calCurBalance = Number(calDisBalance(currentAccount.movements));
  if (
    amount > 0 &&
    receiverAcc &&
    calCurBalance >= amount &&
    currentAccount.username !== receiverAcc.username
  ) {
    //? Doing the transfer
    currentAccount.movements.push(amount);
    receiverAcc.movements.push(-amount);
    //? Update UI
    updateUI(currentAccount);
  }
});
//* -------------------------------------
//! ---------------Close Account ----------------------
btnClose.addEventListener('click', function (e) {
  debugger;
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    if (confirm('Are you sure you want to delete this account?')) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );
      if (index !== -1) {
        accounts.splice(index, 1); // delete account
      }
      containerApp.style.opacity = 100;
    }
  }
  inputTransferAmount.value = inputTransferTo.value = ''; // Clear field
});

//! -------------------------------------

//* ---------------Update UI---------------------
function updateUI(acc) {
  //Display movements
  displaymovements(acc.movements);

  //Display balance
  calDisBalance(acc.movements);

  //Display summary
  displaySummary(acc.movements);
}
//* -------------------------------------
//* ----------------Loan Section---------------------
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
//* -------------------------------------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const converate = 1.1;
const resultdata = movements.map(function (mov, i) {
  return mov * converate;
});
console.log('resultdata :>> ', resultdata);
function converterCase() {
  let titleSample = 'this is a title';
  const excep = ['a', 'an', 'the', 'but'];
  //expected :- 'This Is a Title';

  let converter = titleSample
    .toLowerCase()
    .split(' ')
    .map(element =>
      element.includes(excep)
        ? element
        : element[0].toUpperCase() + element.slice(1)
    );
  return converter;
}

console.log('converter', converterCase());

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

//TODO ------------------------------------------------
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

//!Precidence left to right
// console.log(3<8>2,'test')  // output :- false
// console.log(3>8<2,'test1') // output :- true

//? Sorting arrays
//! Works only for string
// let arr = ['ram', 'aman','vishal','pratik'];
// let dataN = arr.sort();

//! For Number

let arr = [10, -10, 17, 12, -20, 450, 500, 475, 1300, 200, 3000, 450];
//! Ascending Order
// let dataN = arr.sort((a,b)=>{
//   if(a>b) return 1;
//   if(b>a) return -1;
// });

//!Descending Order
// let dataN = arr.sort((a,b)=>{
//   if(a>b) return -1;
//   if(b>a) return 1;
// });

//* Sort Hand
// let dataN = arr.sort((a,b)=>{
//   // if(a>b) a-b; //ascend
//   // if(a>b) b-a; //decend
// });

// let resdata =  reversenumwithoutCon(dataN);
// let resdata =  dataN;
// console.log('test', test)
// test.textContent = resdata;

/////////////////////////////////////////////////
