// 디바이드 체크
export const verificateDevice = (userAgent: any) => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};

// 이름은 한글,영어만 허용
export const NAME_REGEX = /^[가-힣a-zA-Z]{2,5}/;

// 비번은 숫자,영문 4자리 이상()
export const PW_REGEX = /^[a-zA-Z0-9]{4,20}/;
