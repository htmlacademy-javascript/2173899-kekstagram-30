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


// Дополнительное задание

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция возврвщает NaN
*/
const returnNumber = (string) => {
  const numb = string.toString().match(/\d/g);
  if (numb) {
    return parseInt(numb.join(''), 10);
  } else {
    return NaN;
  }

};

returnNumber('ECMAScript 2022');


// Функция для задания 5.16. Функции возвращаются

const MINUTES_IN_TIME = 60;

/**
 * @param {`${number}:${number}`} time
 */
const getMinutes = (time) => {
  const [hour, minutes] = time.split(':').map(Number);
  return hour * MINUTES_IN_TIME + minutes;
};

/**
 * @param {`${number}:${number}`} startWorkShift
 * @param {`${number}:${number}`} endWorkShift
 * @param {`${number}:${number}`} starMeeting
 * @param {number} duration
 * @returns
 */
const isDateInDay = (startWorkShift, endWorkShift, starMeeting, duration) => {
  const startDayMinutes = getMinutes(startWorkShift);
  const endDayMinutes = getMinutes(endWorkShift);
  const startMeetMinutes = getMinutes(starMeeting);

  const isStartedInWorkShift = startMeetMinutes >= startDayMinutes;
  const isEndedDuringWork = (startMeetMinutes + duration) <= endDayMinutes;

  return isStartedInWorkShift && isEndedDuringWork;
};
isDateInDay();
