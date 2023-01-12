'use strict';

const btnNext = document.querySelector('.next-step');
const landingPage = document.querySelector('.container-personal-info');
const root = document.querySelector('.root');
const goBackBtn = document.querySelector('.go-back');
const circle = document.querySelectorAll('.circle');
const buttons = document.querySelector('.buttons');

// User for validation
const labelName = document.querySelector('.name');
const inputName = document.querySelector('.first-last-name');

// Email Validation
const labelEmail = document.querySelector('.email');
const inputEmail = document.querySelector('.email-adress');

// Phone Number
const labePhone = document.querySelector('.number');
const inputPhone = document.querySelector('.phone-number');
// User Info

let curPage = 0;
// For next page UI
let renderUI = '';
// For final price
let total = [];
// Final Price after reduce
let final = 0;

// Montly/Yearly (Default Monthly)
let state = 'mo';

// Slecet Plan Curr price
let curSelectedPrice = 0;
// Plan Price (depend on state)
let price = 0;

const user = {
  firstLastName: '',
  email: '',
  phone: 0,
};

// Puting Pages in function's for updating
const pageSelectPlan = function () {
  renderUI = `
        <div class="container-select-plan">
          <!-- Step 2 Header -->
          <div class="select-plan-header">
            <h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
          </div>
          <!-- End -->
          <div class="plans ">
            <div class="arcade select-arcade" data-value="${
              state === 'ye' ? 90 : 9
            }"
            tabindex='1'
             onclick="pickPriceValueArcade()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="#FFAF7E" />
                  <path
                    fill="#FFF"
                    fill-rule="nonzero"
                    d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"
                  />
                </g>
              </svg>
              <div class="plan-bill">
                <h4>Arcade</h4>
                <p id="archade-price " class="${
                  state === 'ye' ? 'yearly' : ''
                }">$${(price = state === 'mo' ? 9 : 90)}/${state}
                </p>
              </div>
            </div>
            
            <div class="advanced select-advanced"
            tabindex='2'
            onclick="pickPriceValueAdvanced()" 
  
            data-value="${state === 'ye' ? 120 : 12}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="#F9818E" />
                  <path
                    fill="#FFF"
                    fill-rule="nonzero"
                    d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"
                  />
                </g>
              </svg>
              <div class="plan-bill">
                <h4>Advanced</h4>
                <p id="advanced" class="${
                  state === 'ye' ? 'yearly' : ''
                }">$${(price = state === 'mo' ? 12 : 120)}/${state}</p>
              </div>
            </div>
            <div class="pro select-pro" 
            tabindex='3'
            onclick="pickPriceValuePro()"
            data-value="${state === 'ye' ? 150 : 15}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="#483EFF" />
                  <path
                    fill="#FFF"
                    fill-rule="nonzero"
                    d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
                  />
                </g>
              </svg>
              <div class="plan-bill">
                <h4>Pro</h4>
                <p id="pro" class="${
                  state === 'ye' ? 'yearly' : ''
                }">$${(price = state === 'mo' ? 15 : 150)}/${state}</p>
              </div>
            </div>
          </div>
          <div class="button-change-mo-ye  ">
            <p class="${state === 'mo' ? 'active-sub' : ''}">Monthly</p>
            <div class="btn-container" onclick = 'switchButton()'>
              <div class="button-switch ${
                click === true ? 'switch' : ''
              }"></div>
            </div>
            <p class='${state === 'ye' ? 'active-sub' : ''}'>yearly</p>
          </div>
        </div>
    
    `;
  root.innerHTML = renderUI;
};

const pageAddOns = function () {
  renderUI = `
        <div class="container-select-plan">
          <div class="select-plan-header">
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experiance.</p>
          </div>

          <!-- Add-ons container -->
          <div class="add-ons-container">
            <div class="info-monthly one">
              <div class="check-box check-box-one" data-value="${
                state === 'mo' ? 1 : 10
              }"
              onclick="checkBoxOne()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path
                    fill="none"
                    stroke="#FFF"
                    stroke-width="3"
                    d="m1 4 3.433 3.433L10.866 1"
                  />
                </svg>
              </div>
              <div class="flex-box-plans">
                <div class="plan-info">
                  <h4>Online service</h4>
                  <p>Access to multiplayer games</p>
                </div>
                <div class="plan-price">
                  <p>+$${state === 'mo' ? 1 : 10}/${state}</p>
                </div>
              </div>
            </div>
            <div class="info-monthly two">
              <div class="check-box check-box-two" data-value="${
                state === 'mo' ? 2 : 20
              }
              "
              onclick="checkBoxTwo()"
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path
                    fill="none"
                    stroke="#FFF"
                    stroke-width="3"
                    d="m1 4 3.433 3.433L10.866 1"
                  />
                </svg>
              </div>
              <div class="flex-box-plans">
                <div class="plan-info">
                  <h4>Larger storage</h4>
                  <p>Extra 1TB of cloud save</p>
                </div>

                <div class="plan-price">
                  <p>+$${state === 'mo' ? 2 : 20}/${state}</p>
                </div>
              </div>
            </div>
            <div class="info-monthly three">
              <div class="check-box check-box-three" data-value="${
                state === 'mo' ? 2 : 20
              }"
              onclick="checkBoxThree()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path
                    fill="none"
                    stroke="#FFF"
                    stroke-width="3"
                    d="m1 4 3.433 3.433L10.866 1"
                  />
                </svg>
              </div>
              <div class="flex-box-plans">
                <div class="plan-info">
                  <h4>Customizable profile</h4>
                  <p>Custom theme on your profile</p>
                </div>
                <div class="plan-price">
                  <p>+$${state === 'mo' ? 2 : 20}/${state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  root.innerHTML = renderUI;
};

const pageSummary = function () {
  renderUI = `
    <div class="container-select-plan">
          <div class="select-plan-header">
            <h1>Finishing up</h1>
            <p>Double-check everything looks OK before confirming.</p>
          </div>

          <div class="purchase-info">
            <div class="choose-plan">
              <div class="first">
                <h4>Arcade (${state === 'mo' ? 'Monthly' : 'Yearly'})</h4>
                <button id="change" onclick="changeBtn();">Change</button>
              </div>
              <div class="second">
                <h4 class="price-final">$${curSelectedPrice}/${state}</h4>
              </div>
            </div>
        </div>
        <div class="total-price">
          <p>Total  (per ${state === 'mo' ? 'month' : 'year'})</p>
          <h3>+${final}/${state}</h3>
        </div>
    `;

  root.innerHTML = renderUI;
};

const pageFinal = function () {
  renderUI = `
        <div class="container-select-plan">
          <div class="container-final">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
              >
                <g fill="none">
                  <circle cx="40" cy="40" r="40" fill="#F9818E" />
                  <path
                    fill="#E96170"
                    d="M48.464 79.167c.768-.15 1.53-.321 2.288-.515a40.04 40.04 0 0 0 3.794-1.266 40.043 40.043 0 0 0 3.657-1.63 40.046 40.046 0 0 0 12.463-9.898A40.063 40.063 0 0 0 78.3 51.89c.338-1.117.627-2.249.867-3.391L55.374 24.698a21.6 21.6 0 0 0-15.332-6.365 21.629 21.629 0 0 0-15.344 6.365c-8.486 8.489-8.486 22.205 0 30.694l23.766 23.775Z"
                  />
                  <path
                    fill="#FFF"
                    d="M40.003 18.333a21.58 21.58 0 0 1 15.31 6.351c8.471 8.471 8.471 22.158 0 30.63-8.47 8.47-22.156 8.47-30.627 0-8.47-8.472-8.47-22.159 0-30.63a21.594 21.594 0 0 1 15.317-6.35Zm9.865 15c-.316.028-.622.15-.872.344l-12.168 9.13-5.641-5.642c-1.224-1.275-3.63 1.132-2.356 2.356l6.663 6.663c.56.56 1.539.63 2.173.156l13.326-9.995c1.122-.816.43-2.993-.956-3.013a1.666 1.666 0 0 0-.17 0Z"
                  />
                </g>
              </svg>
            </div>
            <div class="text-thank-you">
              <h2>Thank you!</h2>
            </div>
            <div class="info">
              <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com
              </p>
            </div>
          </div>
        </div>
    `;

  root.innerHTML = renderUI;
};

// Get value from a pick Enable Next Button after pick - SELECT PLAN
const pickPriceValueArcade = function () {
  const price = +document
    .querySelector('.select-arcade')
    .getAttribute('data-value');
  curSelectedPrice = price;
  btnNext.disabled = false;
};
const pickPriceValueAdvanced = function () {
  const price = +document
    .querySelector('.select-advanced')
    .getAttribute('data-value');
  curSelectedPrice = price;
  btnNext.disabled = false;
};
const pickPriceValuePro = function () {
  const price = +document
    .querySelector('.select-pro')
    .getAttribute('data-value');
  curSelectedPrice = price;
  btnNext.disabled = false;
};

// VALUE FROM ADD-ONS AND RENDER ON THE ROOT
let priceValueOne = 0;
let priceValueTwo = 0;
let priceValueThree = 0;
let addOnsAppend = '';

const checkBoxOne = function () {
  const check = document.querySelector('.check-box-one');
  const checkDiv = document.querySelector('.one');
  const value = +check.getAttribute('data-value');

  check.classList.toggle('active-box');
  checkDiv.classList.toggle('active-div');

  if (check.classList.contains('active-box')) {
    priceValueOne = value;
    addOnsAppend += `
      <div class="choosen-add-ons">
              <p>Access to multiplayer games</p>
              <p>+$${priceValueOne}/${state}</p>
            </div>
    `;
  } else {
    priceValueOne = 0;
    addOnsAppend = '';
  }
};

const checkBoxTwo = function () {
  const check = document.querySelector('.check-box-two');
  const checkDiv = document.querySelector('.two');
  const value = +check.getAttribute('data-value');

  check.classList.toggle('active-box');
  checkDiv.classList.toggle('active-div');

  if (check.classList.contains('active-box')) {
    priceValueTwo = value;
    addOnsAppend += `
      <div class="choosen-add-ons">
              <p>Extra 1TB cloud save</p>
              <p>+$${priceValueTwo}/${state}</p>
            </div>
    `;
  } else {
    priceValueTwo = 0;
    addOnsAppend = '';
  }
};
const checkBoxThree = function () {
  const check = document.querySelector('.check-box-three');
  const checkDiv = document.querySelector('.three');
  const value = +check.getAttribute('data-value');

  check.classList.toggle('active-box');
  checkDiv.classList.toggle('active-div');

  if (check.classList.contains('active-box')) {
    priceValueThree = value;
    addOnsAppend += `
      <div class="choosen-add-ons">
              <p>Customizable profile</p>
              <p>+$${priceValueThree}/${state}</p>
            </div>
    `;
  } else {
    priceValueThree = 0;
    addOnsAppend = '';
  }
};

// Hide Go Back Button
window.addEventListener('DOMContentLoaded', () => {
  circle[0].classList.add('active');
  if (curPage === 0) goBackBtn.classList.add('not-active');
});

// User name validation
const checkUserName = function () {
  let flag;

  if (inputName.value === '') {
    labelName.classList.add('required');
    flag = false;
    return flag;
  } else if (!inputName.value.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    labelName.classList.add('invalid');
    flag = false;
    return flag;
  }
};

// Email Validation
const emailValidation = function () {
  let flag;

  if (inputEmail.value === '') {
    labelEmail.classList.add('required');
    flag = false;
    return flag;
  } else if (
    !inputEmail.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
  ) {
    labelEmail.classList.add('invalid-email');
    flag = false;
    return flag;
  }

  // inputEmail.value = inputEmail.value;
};

// Phone Number Validation
const phoneNumberValidation = function () {
  let flag;

  if (inputPhone.value === '') {
    labePhone.classList.add('required');
    flag = false;
    return flag;
  } else if (
    !inputPhone.value.match(
      /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g
    )
  ) {
    labePhone.classList.add('invalid-number');
    flag = false;
    return flag;
  }
};

// Next Button Change All UI's
btnNext.addEventListener('click', e => {
  e.preventDefault();

  user.firstLastName = inputName.value;
  user.email = inputEmail.value;
  user.phone = inputPhone.value;

  //Check user name input
  if (checkUserName() === false) return;
  // Check Email Validation
  if (emailValidation() === false) return;
  // Phone Number check
  if (phoneNumberValidation() === false) return;

  curPage++;

  if (curPage === 1) {
    circle[0].classList.remove('active');
    circle[1].classList.add('active');
    landingPage.classList.add('hidden');
    click = false;
    btnNext.disabled = true;
    pageSelectPlan();
  } else if (curPage === 2) {
    circle[1].classList.remove('active');
    circle[2].classList.add('active');
    total.unshift(curSelectedPrice);
    pageAddOns();
  } else if (curPage === 3) {
    btnNext.textContent = 'Confirm';
    btnNext.classList.add('confirm');
    circle[2].classList.remove('active');
    circle[3].classList.add('active');
    total.push(priceValueOne, priceValueTwo, priceValueThree);
    final = total.reduce((a, b) => a + b, 0);
    pageSummary();
    const div = document.querySelector('.purchase-info');

    div.innerHTML += addOnsAppend;
  } else if (curPage === 4) {
    buttons.classList.add('hidden');
    pageFinal();
  }

  if (curPage > 0) goBackBtn.classList.remove('not-active');
});

// Go Back Button
goBackBtn.addEventListener('click', e => {
  e.preventDefault();
  let previousPage = curPage;
  curPage--;
  if (curPage !== 3) {
    btnNext.textContent = 'Next';
    btnNext.classList.remove('confirm');
  }
  circle[`${previousPage}`].classList.remove('active');
  circle[`${curPage}`].classList.add('active');
  if (curPage === 0) {
    state = 'mo';
    btnNext.disabled = false;
    root.innerHTML = `
      <div class="container-personal-info">
            <!-- Step 1 Header -->
            <div class="select-plan-header">
              <h1>Personal info</h1>
              <p>Please provide your name, email address, and phone number.</p>
            </div>
            <!-- End -->

            <form action="#" method="GET">
              <div class="form">
                <label for="name" class="name">Name</label>
                <input
                  class="first-last-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Stephen King"
                  value="${user.firstLastName}"
                  required
                />
              </div>
              <div class="form">
                <label for="email" class="email">Email Address</label>
                <input
                  class="email-adress"
                  type="email"
                  name="email"
                  id="email"
                  value="${user.email}"
                  placeholder="e.g. stephenking@lorem.com"
                />
              </div>
              <div class="form">
                <label for="number" class="number">Phone Number</label>
                <input
                  class="phone-number"
                  type="tel"
                  name="phone"
                  value="${user.phone}"
                  placeholder="e.g. +1 234 567 890"
                />
              </div>
            </form>
          </div>
    `;
    goBackBtn.classList.add('not-active');
  } else if (curPage === 1) {
    total = [];
    pageSelectPlan();
  } else if (curPage === 2) {
    addOnsAppend = '';
    total = [curSelectedPrice];
    final = [curSelectedPrice];
    priceValueOne = 0;
    priceValueTwo = 0;
    priceValueThree = 0;
    pageAddOns();
  }
});

// Switch Buttom
let click;
const switchButton = function () {
  click = click === true ? false : true;
  state = state === 'mo' ? 'ye' : 'mo';
  pageSelectPlan();
};

// Change Button
const changeBtn = () => {
  btnNext.textContent = 'Next';
  btnNext.classList.remove('confirm');
  circle[1].classList.add('active');
  circle[3].classList.remove('active');
  total = [];
  addOnsAppend = '';
  priceValueOne = 0;
  priceValueTwo = 0;
  priceValueThree = 0;

  curPage = 1;
  pageSelectPlan();
};
