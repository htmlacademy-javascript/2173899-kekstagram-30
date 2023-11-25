const MINUTES_IN_TIME = 60;

const checkStringLength = (string, number) => (string.length <= number);

checkStringLength('I like JavaScript', 22);


const isPalindrome = (string) => {
  const stringChecked = string.replaceAll(/\s/g, '').toLowerCase();
  let stringPalindrome = '';
  for (let i = stringChecked.length - 1; i >= 0; i--) {
    stringPalindrome += stringChecked[i];
  }
  return stringChecked === stringPalindrome;
};

isPalindrome('Город дорог');


const returnNumber = (string) => {
  const numb = string.toString().match(/\d/g);
  if (numb) {
    return parseInt(numb.join(''), 10);
  } else {
    return NaN;
  }

};

returnNumber('ECMAScript 2022');


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
