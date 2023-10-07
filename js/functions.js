// Функция для проверки длины строки

const stringLength = 22;
const stringToCheck = 'I like JavaScript';

function checksStringLength() {
  return (stringToCheck.length <= stringLength) ? 'true' : 'false';
}

checksStringLength(stringToCheck, stringLength);


// Функция для проверки, является ли строка палиндромом

const isPolindrom = 'Город дорог';
let isPolindromNew = '';

function palindromeChecker() {
  const isStringPolindrom = isPolindrom.replaceAll().toLowerCase();
  for (let i = isStringPolindrom.length - 1; i >= 0; i--) {
    isPolindromNew += isStringPolindrom[i];
  }
  return isStringPolindrom === isPolindromNew;
}

palindromeChecker(isPolindrom);
