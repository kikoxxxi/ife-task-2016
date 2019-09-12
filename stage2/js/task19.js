let GLOBAL = {
    btns: document.querySelectorAll("button"),
    queue: document.querySelector("ul"),
    input: document.querySelector("input"),
};

(function() {
    var btns = GLOBAL.btns,
        lin = btns[0],
        rin = btns[1],
        lout = btns[2],
        rout = btns[3],
        messBtn = btns[4],
        bubbleBtn = btns[5],
        selectionBtn = btns[6],
        insertionBtn = btns[7],
        quickBtn = btns[8],
        queue = GLOBAL.queue;

    addHandler(lin, "click", leftIn);
    addHandler(rin, "click", rightIn);
    addHandler(lout, "click", leftOut);
    addHandler(rout, "click", rightOut);
    addHandler(queue, "click", deleteEle);
    addHandler(messBtn, "click", function() {
        init(queue, lin);
    });
    addHandler(bubbleBtn, "click", function() {
        bubbleSort(queue);
    });
    addHandler(selectionBtn, "click", function() {
        slectionSort(queue);
    });
    addHandler(insertionBtn, "click", function() {
        insertionSort(queue);
    });
    addHandler(quickBtn, "click", function() {
        quickSort(queue);
    });

    init(queue, lin);
})();

function init(queue, lin) {
    var randHeight, i, input = GLOBAL.input;
    queue.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        input.value = Math.floor(Math.random() * 90) + 10;
        lin.click();
        input.value = "";
    }
}

function leftIn() {
    var queue = GLOBAL.queue,
        input = GLOBAL.input,
        newEle = document.createElement("li"),
        oldEle = document.querySelector("ul li"),
        temp;

    if (!(temp = transValue(input))) {
        return false;
    }
    newEle.style.height = temp + "px";
    if (queueLength(queue) >= 60) {
        alert("队列满了");
    } else if (!oldEle) {
        queue.appendChild(newEle);
    } else {
        queue.insertBefore(newEle, oldEle);
    }
}

function rightIn() {
    var queue = GLOBAL.queue,
        input = GLOBAL.input,
        newEle = document.createElement("li"),
        temp;

    if (!(temp = transValue(input))) {
        return false;
    }
    newEle.style.height = temp + "px";
    if (queueLength(queue) >= 60) {
        alert("队列满了");
    } else {
        queue.appendChild(newEle);
    }
}

function leftOut() {
    var queue = GLOBAL.queue,
        oldEle = document.querySelector("ul li");

    if (!oldEle) {
        alert("队列空了");
    } else {
        alert(oldEle.offsetHeight);
        queue.removeChild(oldEle);
    }
}

function rightOut() {
    var queue = GLOBAL.queue,
        oldEle = queue.lastChild;

    if (!oldEle) {
        alert("队列空了");
    } else {
        alert(oldEle.offsetHeight);
        queue.removeChild(oldEle);
    }
}

function deleteEle(event) {
    var oldEle = getTarget(event),
        queue = GLOBAL.queue;

    if (oldEle.tagName == "LI") {
        queue.removeChild(oldEle);
    }
}

function queueLength(queue) {
    return GLOBAL.queue.querySelectorAll("li").length;
}

function transValue(input) {
    var result = parseInt(input.value.replace(/\D/g, ""), 10);

    if (result > 100 || result < 10) {
        input.value = "必须为10-100的整数！";
        return false;
    }
    return result;
}

function swap(ele1, ele2) {
    var temp = ele1.offsetHeight;
    ele1.offsetHeight = ele2.offsetHeight;
    ele1.style.height = ele2.offsetHeight + "px";
    ele2.offsetHeight = temp;
    ele2.style.height = temp + "px";
}

function bubbleSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len = eles.length,
        i = 0,
        delay = 1000,
        timer,
        j;

    let bubble = function() {
        if (i < len - 1) {
            j = len - 1;
            while (j > i) {
                if (eles[j].offsetHeight < eles[j - 1].offsetHeight) {
                    swap(eles[j], eles[j - 1]);
                }
                j--;
            }
            i++;
        }
        setTimeout(bubble, delay);
    };
    setTimeout(bubble, delay);
}

function slectionSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len = eles.length,
        i = 0,
        delay = 1000,
        j,
        min,
        timer;

    timer = setInterval(function() {
        if (i >= len - 1) {
            clearInterval(timer);
            return;
        }
        min = i;
        for (j = i; j < len; j++) {
            if (eles[j].offsetHeight < eles[min].offsetHeight) {
                min = j;
            }
        }
        swap(eles[i], eles[min]);
        i++;
    }, delay);
}

function insertionSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len = eles.length,
        i = 0,
        j,
        delay = 1000;
    let insert = function() {
        if (i < len - 1) {
            let currentNode = eles[i + 1].offsetHeight;
            j = i;
            while (j >= 0 && currentNode < eles[j].offsetHeight) {
                swap(eles[j + 1], eles[j]);
                j--;
            }
            eles[j + 1].offsetHeight = currentNode;
            eles[j + 1].style.height = currentNode + "px";
            i++;
        }
        setTimeout(insert, delay);
    };
    setTimeout(insert, delay);
}

function quickSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len = eles.length,
        delay = 1000;

    let quickSortHelper = function(eles, start, end) {
        if (start < end) {
            let splitPoint = findSplitPoint(eles, start, end);
            quickSortHelper(eles, start, splitPoint - 1);
            quickSortHelper(eles, splitPoint + 1, end);
        }
    };

    let findSplitPoint = function(eles, start, end) {
        let pivot = eles[start];
        let isDone = false;
        let left = start + 1;
        let right = end;
        while (!isDone) {
            while (left <= right && eles[left].offsetHeight <= pivot.offsetHeight) {
                left++;
            }
            while (right >= left && eles[right].offsetHeight >= pivot.offsetHeight) {
                right--;
            }
            if (right < left) {
                isDone = true;
            } else {
                swap(eles[left], eles[right]);
            }
        }
        swap(eles[right], eles[start]);
        return right;
    };

    quickSortHelper(eles, 0, len - 1);
}