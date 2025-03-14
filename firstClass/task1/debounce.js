function say() {
    console.log("防抖输入框发送了一条请求！")
}

function debounce(fn, delay = 500) {
    let timer = null;

    return function() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, delay);
    }
}

let inputElement = document.querySelector(".debounce");
inputElement.addEventListener('input', debounce(say, 500))