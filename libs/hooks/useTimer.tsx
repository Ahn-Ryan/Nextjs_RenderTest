import { useState } from 'react';
import { validateMiliseconds } from '@libs/utils/validation';

type TCountDown = {
  attrDate: string;
  delay?: number;
};

const useIntervalCalculator = (calculator: any, delay: number) => {
  const [result, setResult] = useState(calculator());
  setInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);
  return result;
};

export const CountDownView = ({ attrDate, delay = 0 }: TCountDown) => {
  const time = useIntervalCalculator(
    () => Math.floor((+new Date(attrDate) - +new Date()) / 1000),
    delay,
  );
  return <p>{validateMiliseconds(time)}</p>;
};
