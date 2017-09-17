const _ = require('lodash');
const ERR = '#ERR';

//Takes an postfix expression and evaluates to a value
function eval(expression){

  if(_.isNumber(expression))
    return expression; //If a number return immediately the same
  if(ERR == expression)
    return expression; //If expression is err return immediately the same
  if(_.isEqual('',_.trim(expression)))
    return 0; //Spaces & empty string evaluates to zero

  var postfixArray = _.split(_.trim(expression), /[ ]+/);
  var postfixStack = [];

  _.map(postfixArray,(current) => {
    if ( isOperator(current) ) {
      postfixStack.push(
        compute( postfixStack.pop(),
        symbolToOperator(current),
        postfixStack.pop()
      ));
    }
    else {
      postfixStack.push(current);
    }
  });
  var val = postfixStack[0];
  if (postfixStack.length != 1 || _.isNaN(val)){
    return ERR; //Return err, Final Stack with more than one element is a invalid postfic expression or value isn't a number
  }else{
    return _.toNumber(val);
  }
}

function isOperator(toCheck) {
  switch (toCheck) {
    case '+':
    case '-':
    case '*':
    case '/':
    return true;
    default:
    return false;
  }
}

function compute(a, operator, b) {
  return operator(b,a);
}

function symbolToOperator(symbol) {
  switch (symbol) {
    case '+': return plus;
    case '-': return minus;
    case '*': return multiply;
    case '/': return divide;
  }
}

function plus(a,b) { return parseInt(a) + parseInt(b); }
function minus(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) {  return a / b; }

//console.log(eval('3.5 4 *'));

module.exports = { eval : eval };
