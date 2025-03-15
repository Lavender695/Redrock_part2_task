async function foo() {
    console.log("start");
    await bar();
    console.log("end");
}

async function bar() {
    console.log("bar");
}

console.log(1);

setTimeout(() => {
    console.log("time");
});
//由于没有第二个参数，所以浏览器会将这段代码放入事件队列中，等待当前执行栈清空后再执行

foo();

new Promise((resolve) => {
    console.log("p1");
    resolve();
}).then(() => {
    console.log("p2");
});

console.log(2);
