function say() {
    console.log("节流输入框发送了一次请求！");
}

const throttle = function(fn, interval = 2000) {
    let timer, firstTime = true;

    return function() {
        if (firstTime) {
            fn();
            return firstTime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn();
        }, interval);
    }
}

let input = document.querySelector('.throttle');
input.addEventListener('input', throttle(say, 2000));