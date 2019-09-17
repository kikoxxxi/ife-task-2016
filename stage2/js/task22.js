$ = function(ele) {
    return document.querySelector(ele);
};
let btnStart = $('#btnStart');
let selectMode = $('#selectMode');
let root = $('#tree');
let method = "0";
let queue = [];

// 按钮监听
btnStart.onclick = function() {
    // 将按钮disable   
    btnStart.disabled = true;
    // 获取选择的遍历方式
    method = selectMode[selectMode.selectedIndex].value;
    // 遍历动画
    traverTree();
};

let queueOption = function() {
    let node = queue.shift();
    if (node) {
        node.style.backgroundColor = "pink";
        setTimeout(function() {
            node.style.backgroundColor = "white";
            queueOption();
        }, 2000);
    } else {
        btnStart.disabled = false;
    }
};

// 遍历动画
let traverTree = function() {
    if (method === "0") {
        prevTraveTree(root);
    } else if (method === "1") {
        midTraveTree(root);
    } else {
        postTraveTree(root);
    }
    return queueOption();
};

let prevTraveTree = function(root) {
    if (root) {
        queue.push(root);
        prevTraveTree(root.firstElementChild);
        prevTraveTree(root.lastElementChild);
    }
};

let midTraveTree = function(root) {
    if (root) {
        midTraveTree(root.firstElementChild);
        queue.push(root);
        midTraveTree(root.lastElementChild);
    }
};

let postTraveTree = function(root) {
    if (root) {
        postTraveTree(root.firstElementChild);
        postTraveTree(root.lastElementChild);
        queue.push(root);
    }
};