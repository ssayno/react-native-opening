import {useEffect, useState} from 'react';

function useDebounce<T>(value: T, delay?: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('debounce change this value', value);
      setDebounceValue(value);
    }, delay || 400);
    console.log(`Create timer is ${timer}`);
    // react will call return function in useEffect callback function when next useEffect is trigger.
    return () => {
      clearTimeout(timer);
      console.log(`Clear timer is ${timer}, ${debounceValue}`);
    };
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
