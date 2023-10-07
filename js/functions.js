// Функция для проверки длины строки

function checksStringLength(string, number) {
  return (string.length <= number);
}

checksStringLength('I like JavaScript', 22);


// Функция для проверки, является ли строка палиндромом 1й способ.


function palindromeChecker(string) {
  const isStringPalindrom = string.replaceAll(/\s/g, '').toLowerCase();
  let isPalindromNew = '';
  for (let i = isStringPalindrom.length - 1; i >= 0; i--) {
    isPalindromNew += isStringPalindrom[i];
  }
  return isStringPalindrom === isPalindromNew;
}

palindromeChecker('Город дорог');


// 2й способ.
function palindrome(string) {
  return string === string.split('').reverse().join('');
}

palindrome('racecar');


// Дополнительное задание не смог сделать, наверное нужно отдохнуть!


