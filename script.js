'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  username:'js',
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

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ----------Code-----------

const displaymovements = function (movements) {
  containerMovements.innerHTML = ''; //   ---------------------------    Clear previous Reords

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


const displaySummary = (movements) =>{
  const resultValDep = movements.reduce((mov,cur)=> (mov > 0) ? mov + cur : mov);
  const resultValWithD = movements.reduce((mov,cur)=> (mov < 0) ? mov + cur : mov);
  const resultValWithInt = (movements.reduce((mov, cur, i, arr) => mov + cur)) / movements.length;
  labelSumIn.textContent = `${resultValDep} 💶`;
  labelSumOut.textContent = `${resultValWithD} 💶`;
  labelSumInterest.textContent = `${resultValWithInt} 💶`;

};

const calDisBalance = (movements)=>{
  labelBalance.textContent = movements.reduce((mov,cur)=> mov+cur);
};

// ----------Login Validation---------------------------
let currentAccount;

btnLogin.addEventListener('click',function (e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log('currentAccount :>> ', currentAccount);
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Display movements
    displaymovements(currentAccount.movements);
    //Display balance
    calDisBalance(currentAccount.movements);
    //Display summary
    displaySummary(currentAccount.movements);

  }
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

/////////////////////////////////////////////////
