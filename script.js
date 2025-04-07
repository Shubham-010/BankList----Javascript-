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

const calDisBalance = movements => {
  labelBalance.textContent = movements.reduce((mov, cur) => mov + cur);
  return labelBalance.textContent;
};

//* ----------Login Validation------------
let currentAccount;

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
    updateUI(currentAccount);
  }
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

/////////////////////////////////////////////////
