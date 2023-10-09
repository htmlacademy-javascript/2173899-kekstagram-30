// Функция для проверки длины строки

function checksStringLength(string, number) {
  return (string.length <= number);
}

checksStringLength('I like JavaScript', 22);


// Функция для проверки, является ли строка палиндромом 1й способ.


function palindromeChecker(string) {
  const stringChecked = string.replaceAll(/\s/g, '').toLowerCase();
  let stringPalindrom = '';
  for (let i = stringChecked.length - 1; i >= 0; i--) {
    stringPalindrom += stringChecked[i];
  }
  return stringChecked === stringPalindrom;
}

palindromeChecker('Город дорог');


// 2й способ.
function palindrome(string) {
  return string === string.split('').reverse().join('');
}

palindrome('racecar');


// Дополнительное задание

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция возврвщает NaN
*/
function returnNumber(string) {
  const numb = string.match(/\d/g);
  if (numb) {
    return parseInt(numb.join(''), 10);
  } else {
    return NaN;
  }
}

returnNumber('ECMAScript 2022');

