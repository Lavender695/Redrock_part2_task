const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100;


const compose = (...funcs) => {
    return (...args) => funcs.reduceRight((accumulator, func) => func(accumulator), ...args)
}

let res = compose(add10, mul10, add100)(10);
console.log(res);
