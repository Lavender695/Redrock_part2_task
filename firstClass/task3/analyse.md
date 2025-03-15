代码
```
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
```
第一轮事件循环流程分析如下：
- 整体script作为第一个宏任务进入主线程，遇到`console.log(1)`输出1。
- 遇到`setTimeout`，其回调函数被分发到宏任务Event Queue中。记为`setTimeout1`。
- 遇到异步函数`foo()`返回一个`Promise`，直接执行`console.log("start)"`输出start。
- 在`foo()`函数中遇到`await bar()`，`foo()`暂停执行，等待`bar()`被解决或拒绝，后面的代码被放入微任务Event Queue中，记为`process1`。
- 执行`bar()`中的`console.log("bar")`输出bar。
- 遇到`Promise`，new Promise直接执行输出p1。then被分发到微任务Event Queue中，记为`then1`。
- 遇到`console.log(2)`，立即执行输出2。

| 宏任务Event queue | 微任务event queue |
| ----------------- | ----------------- |
| setTimeout1       | process1          |
|                   | then1             |

- 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1，start，bar，end，p1，2。
- 我们发现了process1和then1两个微任务。
- 执行process1，输出end。
- 执行then1，输出p2。
第一轮事件循环结束，这一轮的结果是1，start，bar，p1，2，end，p2。第二轮事件循环从setTimeout1宏任务开始：
- 输出time。
第二轮事件循环结束，第二轮输出time。
整段代码，共进行了两次事件循环，完整的输出为1，start，bar，p1，2，end，p2，time。