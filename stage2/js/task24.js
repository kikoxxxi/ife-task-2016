let $ = function(ele) {
    return document.querySelector(ele);
};

let root = $(".one");
let body = $("body");
let dfsBtn = $("#DFS");
let bfsBtn = $("#BFS");
let insertBtn = $("#insert");
let deleteBtn = $("#delete");
let input = $("#search");
let searchContent;
let queue = [];
let prev;
let queueHelper;
let find;
let findNode;
let selectNode;

let transeValue = function(str) {
    return str.replace(/\s+/g, "").toLowerCase();
};

let dfs = function(node, searchContent, isDone) {
    if (node) {
        queue.push(node);
        if (transeValue(node.firstChild.nodeValue) === searchContent) {
            return true;
        }
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            isDone = dfs(children[i], searchContent, isDone);
            if (isDone) {
                return true;
            }
        }
    }
};

let bfs = function(searchContent, isDone) {
    let temp = queueHelper.shift();
    if (temp) {
        queue.push(temp);
        if (transeValue(temp.firstChild.nodeValue) === searchContent) {
            return true;
        }
        let children = temp.children;
        for (let i = 0; i < children.length; i++) {
            queueHelper.push(children[i]);
        }
        isDone = bfs(searchContent, isDone);
        if (isDone) {
            return true;
        }
    }
};

let traverTree = function() {
    let node = queue.shift();
    if (node) {
        node.style.backgroundColor = window.getComputedStyle(node, null).borderColor;
        let timer = setTimeout(function() {
            node.style.backgroundColor = "";
            traverTree();
        }, 1000);
        if (find && queue.length === 0) {
            findNode = node;
            clearTimeout(timer);
            traverTree();
        }
    } else {
        if (!find) {
            alert("没有找到" + transeValue(input.value) + "！");
        }
        dfsBtn.disabled = false;
        bfsBtn.disabled = false;
        dfsBtn.className = "";
        bfsBtn.className = "";
    }

};

let commonOp = function() {
    if (findNode) {
        findNode.style.backgroundColor = "";
    }
    dfsBtn.disabled = true;
    bfsBtn.disabled = true;
    dfsBtn.className = "disabled";
    bfsBtn.className = "disabled";
    return transeValue(input.value);
};

dfsBtn.onclick = function() {
    searchContent = commonOp();
    find = dfs(root, searchContent, false);
    traverTree();
};

bfsBtn.onclick = function() {
    searchContent = commonOp();
    queueHelper = [root];
    find = bfs(searchContent, false);
    traverTree();
};

root.onclick = function(e) {
    let target = e.target;
    if (prev && prev !== target) {
        prev.style.backgroundColor = "";
        prev = null;
    }
    if (target.style.backgroundColor === "rgb(179, 142, 149)") {
        target.style.backgroundColor = "";
        selectNode = null;
    } else {
        target.style.backgroundColor = "rgb(179, 142, 149)";
        prev = target;
        selectNode = target;
    }

};

insertBtn.onclick = function() {
    if (!selectNode) {
        alert("请先选择节点！");
        return;
    }
    let newNodeValue = transeValue(input.value);
    if (newNodeValue.length <= 0) {
        alert("请先在下方输入！");
        return;
    }
    let newNode = document.createElement("div");
    let hasChild = selectNode.firstElementChild;
    if (hasChild) {
        newNode.className = hasChild.className;
    }
    let newTextNode = document.createTextNode(newNodeValue);
    newNode.appendChild(newTextNode);
    selectNode.appendChild(newNode);
};

deleteBtn.onclick = function() {
    if (!selectNode) {
        alert("请先选择节点！");
        return;
    }
    selectNode.parentNode.removeChild(selectNode);
    selectNode=null;
};