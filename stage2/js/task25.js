/**
 * 节点的折叠与展开
 * 允许增加节点与删除节点
 * 按照内容进行节点查找，并且把找到的节点进行特殊样式呈现
 * 如果找到的节点处于被父节点折叠隐藏的状态，则需要做对应的展开
 */

// 封装TreeNode
function TreeNode(obj) {
    this.parent = obj.parent;
    this.childs = obj.childs || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement; // 访问对应的DOM结点
    this.toggle = obj.toggle || true;
    this.selfElement.TreeNode = this; // 对应的DOM结点访问回来
}
// 组合构造函数模式和原型模式
TreeNode.prototype = {
    constructor: TreeNode,

    // 删除结点
    deleteNode: function() {
        for (i = 0; i < this.parent.childs.length; i++) {
            if (this.parent.childs[i] === this) {
                this.parent.childs.splice(i, 1);
                break;
            }
        }
        this.parent.selfElement.removeChild(this.selfElement);
        // 调整父结点箭头样式
        this.parent.renderArrowIcon();
    },

    // 渲染箭头和图标
    renderArrowIcon: function() {
        let arrowNode = this.selfElement.getElementsByClassName("arrow")[0];
        let icon = this.selfElement.getElementsByClassName("icon")[0];
        // 是个叶节点，设为空箭头
        if (this.isLeaf()) {
            arrowNode.className = "arrow empty-arrow";
            icon.className = "fa fa-2x fa-file icon";
        }
        // 折叠状态，设为右箭头
        else if (this.isFolded()) {
            arrowNode.className = "arrow right-arrow";
            icon.className = "fa fa-2x fa-folder icon";
        }
        // 展开状态，设为下箭头
        else {
            arrowNode.className = "arrow down-arrow";
            icon.className = "fa fa-2x fa-folder-open icon";
        }
    },

    // 设置节点的可见状态
    setNodeDisplay: function() {
        // 本不可见，改为可见
        let className = this.selfElement.className;
        if (className === "hidden") {
            this.selfElement.className = "";
        }
        //改为不可见
        else {
            this.selfElement.className = "hidden";
        }
    },

    // 增加子节点
    addChild: function(text) {
        if (text == null) return this;
        if (text.trim() == "") {
            alert("节点内容不能为空！");
            return this;
        }
        // 先增加子节点，再渲染自身样式
        // 创建新的DOM结点并附加
        let li = document.createElement("li");
        let arrow = document.createElement("div");
        arrow.className = "arrow empty-arrow";
        let icon = document.createElement("i");
        icon.className = "fa fa-2x fa-file icon";
        let span = document.createElement("span");
        span.innerHTML = text;
        let addButton = document.createElement('i');
        addButton.className = "hidden";
        let deleteButton = document.createElement("i");
        deleteButton.className = "hidden";
        li.appendChild(arrow);
        li.appendChild(icon);
        li.appendChild(span);
        li.appendChild(addButton);
        li.appendChild(deleteButton);
        let ul = document.createElement("ul");
        ul.appendChild(li);
        if (this.isFolded()) {
            ul.className = "hidden";
        }
        this.selfElement.appendChild(ul);
        // 创建子目录
        let newTreeNode = new TreeNode({ parent: this, childs: [], data: text, selfElement: ul, toggle: true });
        this.childs.push(newTreeNode);
        // 渲染自身样式
        // 折叠状态展开
        if (this.isFolded()) {
            this.toggleFold();
        }
        this.renderArrowIcon();
        return this;
    },

    // 展开、收拢结点
    toggleFold: function() {
        if (this.isLeaf()) return this;
        if (this.isFolded()) {
            this.toggle = false;
        } else {
            this.toggle = true;
        }
        // 改变所有子节点的可见状态
        for (let i = 0; i < this.childs.length; i++)
            this.childs[i].setNodeDisplay();
        // 渲染本节点的箭头
        this.renderArrowIcon();
        return this;
    },

    // 判断是否为叶结点
    isLeaf: function() {
        return this.childs.length === 0;
    },

    // 判断结点是否处于折叠状态
    isFolded: function() {
        return this.toggle;
    }
};

// 创建根节点对应的TreeNode对象
let rootNode = document.getElementById('root');
let root = new TreeNode({ parent: null, childs: [], data: "kikoxxxi's MacBook", selfElement: rootNode, toggle: true });
let treeArea = document.getElementById('tree-area');

let setButtonVisible = function(buttons) {
    buttons[0].className = "fa fa-2x fa-plus-circle button";
    if (buttons.length > 1) {
        buttons[1].className = "fa fa-2x fa-trash button";
    }
};

let setButtonHidden = function(buttons) {
    buttons[0].className = "hidden";
    if (buttons.length > 1) {
        buttons[1].className = "hidden";
    }
};

let currentTarget = null;
addHandler(rootNode, "mouseout", function(e) {
    // 如果不在li里边直接返回不做处理
    if (!currentTarget) return;
    let relatedTarget = e.relatedTarget;
    // 如果是在当前是子孩子，直接不做处理
    if (relatedTarget) {
        while (relatedTarget) {
            if (relatedTarget == currentTarget) return;
            relatedTarget = relatedTarget.parentNode;
        }
    }
    setButtonHidden(currentTarget.querySelectorAll(".button"));
    currentTarget = null;
});

// enter显示按钮
addHandler(rootNode, "mouseover", function(e) {
    if (currentTarget) return;
    let target = getTarget(e);
    if (target.nodeName.toLowerCase() === "li") {
        currentTarget = target;
        setButtonVisible(target.querySelectorAll(".hidden"));
    }
});


// 为root绑定事件代理，处理所有节点的点击事件
addHandler(root.selfElement, "click", function(e) {
    let target = getTarget(e);
    let domNode = target;
    while (domNode.nodeName.toLowerCase() !== "ul") {
        domNode = domNode.parentNode;
    }
    // 获取DOM对象对应的TreeNode对象
    let selectedNode = domNode.TreeNode;
    // 如果点在节点文字或箭头上  
    if (target.className.indexOf("fa-plus-circle") > -1) {
        selectedNode.addChild(prompt("请输入子结点的内容："));
    } else if (target.className.indexOf("fa-trash") > -1) {
        selectedNode.deleteNode();
    } else {
        selectedNode.toggleFold();
    }
});

// 给root绑定广度优先搜索函数，无需访问DOM，返回一个搜索结果队列
root.search = function(query) {
    let resultList = [];
    let queue = [];
    let current = this;
    queue.push(current);
    while (queue.length > 0) {
        current = queue.shift();
        current.selfElement.firstElementChild.style.backgroundColor = "";
        if (current.data === query) {
            resultList.push(current);
        }
        for (let i = 0; i < current.childs.length; i++) {
            queue.push(current.childs[i]);
        }
    }
    return resultList;
};

// 搜索并显示结果
let searchBtn = document.getElementById("search-button");
let searchInput = document.getElementById("search");
let result = document.getElementById("result");
addHandler(searchBtn, "click", function() {
    let text = searchInput.value.trim();
    if (text.length <= 0) {
        result.innerHTML = "请先输入查询内容！";
        result.style.color = "#cc9999";
        return;
    }
    result.style.color = "#9999cc";
    let resultList = root.search(text);
    if (resultList.length == 0) {
        result.innerHTML = "没有查询到符合条件的结点！";
    } else {
        result.innerHTML = "查询到" + resultList.length + "个符合条件的结点";
        let pathNode;
        for (let x = 0; x < resultList.length; x++) {
            pathNode = resultList[x];
            pathNode.selfElement.firstElementChild.style.backgroundColor = "#cc9999";
            while (pathNode.parent != null) {
                if (pathNode.selfElement.className === "hidden") {
                    pathNode.parent.toggleFold();
                }
                pathNode = pathNode.parent;
            }
        }
    }
});

// 清除搜索结果
addHandler(document.getElementById("clear"), "click", function() {
    searchInput.value = "";
    root.search(null); // 清除高亮样式
    result.innerHTML = "";
});

// 测试
root.addChild("music").addChild("movie").addChild("desktop");
root.childs[0].addChild("love me do").addChild("lennons").addChild("lucy in the sky").addChild("strawberry fields forever").addChild("paul");
root.childs[0].childs[4].addChild("yesterday").toggleFold();
root.childs[1].addChild("spider man").addChild("avenger").addChild("gunp").toggleFold();
root.childs[2].addChild("resume").addChild("learn").addChild("project").toggleFold();
root.childs[2].childs[2].addChild("english").toggleFold();
document.getElementById("search").value = "yesterday";