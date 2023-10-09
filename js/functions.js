// Функция для проверки длины строки

const checkStringLength = (string, number) => (string.length <= number);

checkStringLength('I like JavaScript', 22);


// Функция для проверки, является ли строка палиндромом 1й способ.


const isPalindrome = (string) => {
  const stringChecked = string.replaceAll(/\s/g, '').toLowerCase();
  let stringPalindrom = '';
  for (let i = stringChecked.length - 1; i >= 0; i--) {
    stringPalindrom += stringChecked[i];
  }
  return stringChecked === stringPalindrom;
};

isPalindrome('Город дорог');


// 2й способ.
const palindrome = (string) => string === string.split('').reverse().join('');

palindrome('racecar');


// Дополнительное задание

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция возврвщает NaN
*/
const returnNumber = (string) => {
  const numb = string.match(/\d/g);
  if (numb) {
    return parseInt(numb.join(''), 10);
  } else {
    return NaN;
  }
};

returnNumber('ECMAScript 2022');

