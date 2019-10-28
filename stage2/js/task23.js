let $ = function(ele) {
    return document.querySelector(ele);
};

let root = $(".one");
let dfsBtn = $("#DFS");
let bfsBtn = $("#BFS");
let input = $("#search");
let searchContent;
let queue = [];
let queueHelper;
let find;
let findNode;

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

    // if (isDone) {
    //     return true;
    // }
    // if (node) {
    //     queue.push(node);
    //     if (node.firstChild.nodeValue.replace(/\s+/g, "") === searchContent) {
    //         return true;
    //     }
    //     isDone = dfs(node.firstElementChild, searchContent, isDone);
    //     if(isDone){
    //         return true;
    //     }
    //     if (node.firstElementChild) {
    //         let sibling = node.firstElementChild.nextElementSibling;
    //         while (sibling) {
    //             isDone = dfs(sibling, searchContent, isDone);
    //             if (isDone) {
    //                return true;
    //            }
    //             sibling = sibling.nextElementSibling;
    //         }
    //     }
    // }
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

// let temp = queueHelper.shift();
// if (temp) {
//     queue.push(temp);
//     firstEle = temp.firstElementChild;
//     if (firstEle) {
//         queueHelper.push(firstEle);
//         let sibling = firstEle.nextElementSibling;
//         while (sibling) {
//             queueHelper.push(sibling);
//             sibling = sibling.nextElementSibling;
//         }
//     }
//     bfs();
// }

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