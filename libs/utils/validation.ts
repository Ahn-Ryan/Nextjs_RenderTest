// 천원단위로 쉼표넣기
export const validateMeasureUp = (num: number | string) => {
  if (typeof num == 'string') {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else if (typeof num == 'number') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};

// 연-월-일 일제거
export const validateSplitDay = (date: string) => {
  return date.split('-')[0] + '-' + date.split('-')[1];
};

// Mile 변환
export const validateMile = (number: number) => {
  return Math.floor(number / 1000) / 10;
};

// Miliseconds 변환
export const validateMiliseconds = (time: number) => {
  let seconds: string | number = Math.floor(time % 60);
  let minutes: string | number = Math.floor((time / 60) % 60);
  let hours: string | number = Math.floor((time / (60 * 60)) % 24);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return hours + ' : ' + minutes + ' : ' + seconds;
};
