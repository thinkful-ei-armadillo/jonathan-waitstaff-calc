'use strict';

/* global $ */

// STORE
const STORE = {
  customerCharges: 
    {subTotal: 0, tip: 0, total: 0},
  
  earningsInfo: 
    {tipTotal: 0, mealCount: 0, avgTipPerMeal: 0}
};

// generate customer charges elements
function generateCurrentCustomerCharges() {
  return `
    <li>sub total: <span>${STORE.customerCharges.subTotal}</span></li>
      <li>Tip: <span>${STORE.customerCharges.tip}</span></li>
      <hr>
      <li>Total: <span>${STORE.customerCharges.total}</span></li>
  `;
}

// generate my earnings info elements
function generateMyEarningInfo() {
  return `
    <li>Tip Total: <span>${STORE.earningsInfo.tipTotal}</span></li>
      <li>Meal count: <span>${STORE.earningsInfo.mealCount}</span></li>
      <li>Average Tip Per Meal: <span>${STORE.earningsInfo.avgTipPerMeal}</span></li>
  `;
}


// render html page
function renderHTML() {
  const customerCharges = generateCurrentCustomerCharges();
  const earningsInfo = generateMyEarningInfo();
  $('.js-customer-charges').html(customerCharges);
  $('.js-my-earnings-info').html(earningsInfo);
}


// get form user input
function getUserInput() {
  const mealPriceVal = parseFloat($('.js-meal-price').val());
  const tipPercentageVal = parseFloat($('.js-tip-percentage').val());
  const taxRateVal = parseFloat($('.js-tax-rate').val());
  let input = calculateCustomerCharges(mealPriceVal, tipPercentageVal, taxRateVal);
  input = convertToNumbers(input);
  return input;
}


// update STORE with user input
function addInputToDatabase(input) {

  STORE.customerCharges.subTotal = input[0];
  STORE.customerCharges.tip = input[1];
  STORE.customerCharges.total = input[2];

  let earningInfo = calculateEarningInfo(input);
  earningInfo = convertToNumbers(earningInfo);
  
  STORE.earningsInfo.tipTotal = earningInfo[0];
  STORE.earningsInfo.mealCount = earningInfo[1];
  STORE.earningsInfo.avgTipPerMeal = earningInfo[2];

}

// convert string to numbers
function convertToNumbers(strArray) {
  let numArray = [];
  for (let i = 0; i < strArray.length; i++) {
    numArray.push(parseFloat(strArray[i]));
  }
  return numArray;
}

// return customer charges data
function calculateCustomerCharges(mealPriceVal, tipPercentageVal, taxRateVal) {
  let tax = (mealPriceVal / 100) * taxRateVal;
  let subTotal = tax + mealPriceVal;
  let tip = (tipPercentageVal / 100) * subTotal;
  let total = subTotal + tip;
  
  subTotal = subTotal.toFixed(2), tip = tip.toFixed(2), total = total.toFixed(2);

  return [subTotal, tip, total];
}

// return earning info
function calculateEarningInfo(input) {
  let tipTotal = STORE.earningsInfo.tipTotal;
  let avgTipPerMeal = STORE.earningsInfo.avgTipPerMeal;
  let mealCount = STORE.earningsInfo.mealCount;
  
  tipTotal += input[1];
  mealCount += 1;
  avgTipPerMeal = tipTotal / mealCount;
 
  tipTotal = tipTotal.toFixed(2), mealCount = mealCount.toFixed(), avgTipPerMeal = avgTipPerMeal.toFixed(2);
  
  return [tipTotal, mealCount, avgTipPerMeal];
}

// handle submit button on form
function handleSubmit() {
  $('#js-meal-details-form').submit((event) => {
    event.preventDefault();
    const input = getUserInput();
    addInputToDatabase(input);
    renderHTML();
  });
}

// handle cancel button
function handleCancelFormInput() {
  $('.js-cancel-btn').click(() => { $(':input').val(''); });
  renderHTML();
}

// reset STORE
function resetStore() {
  const keys = Object.keys(STORE);
  for (let key in STORE[keys[0]]) {
    STORE[keys[0]][key] = 0;
  }

  for (let key in STORE[keys[1]]) {
    STORE[keys[1]][key] = 0;
  }
}

// handle reset button
function handleResetWebpage() {
  $('.js-reset-btn').click(() => {
    resetStore(STORE);
    renderHTML();
  });
}

// main function
function main() {
  renderHTML();
  handleCancelFormInput();
  handleResetWebpage();
  handleSubmit();

}

$(main);