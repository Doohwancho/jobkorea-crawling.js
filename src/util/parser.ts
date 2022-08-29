/**
 * 파라미터가 string이면 false, number이면 true를 반환
 * @param { string | number } value 
 * @returns  { Boolean }
 */
const isNumber = (value: string | number): boolean => {
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

import { errorParameterNone } from './error';
/**
 * 파라미터 배열을 받아 필요한 파라미터만 뽑고 숫자면 숫자 타입으로 변환
 * ex. 
 * node main.js 자바스크립트 10 20 -> ['자바스크립트', 10, 20]
 * @param { string[] } argv 
 * @returns { Boolean }
 */
export const parseArgs = (argv?: string[]) => {
    if(argv === undefined || argv === null) errorParameterNone();
    
    return argv!.slice(2, 5).map(str => {
        if(isNumber(str))
        return Number(str)
    });
}