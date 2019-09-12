/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

let cityInput = document.getElementById('aqi-city-input');
let valueInput = document.getElementById('aqi-value-input');
let addBtn = document.getElementById('add-btn');
let table = document.getElementById('aqi-table');

// 聚焦显示黄色
cityInput.onfocus = function() {
    if (cityInput.style.backgroundColor != "red") {
        cityInput.style.backgroundColor = "yellow";
    }
};

// 用户输入的城市名必须为中英文字符
cityInput.onblur = function() {
    // 用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
    let city = cityInput.value;
    cityInput.value = city.trim();
    let path = /[^a-z\u4E00-\u9FA5]/gi;
    if (path.test(cityInput.value)) {
        cityInput.style.backgroundColor = "red";
        alert("输入的城市名必须为中英文字符！");
    } else {
        cityInput.style.backgroundColor = "";
    }
    if (cityInput.style.backgroundColor === "red" || valueInput.style.backgroundColor === "red") {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
};

// // 输入不合格数据修改背景色
// cityInput.onchange = function() {
//     // 用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
//     let city = cityInput.value;
//     cityInput.value = city.trim();
//     let path = /[^a-z\u4E00-\u9FA5]/gi;
//     if (path.test(city)) {
//         cityInput.style.backgroundColor = "red";
//         alert("输入的城市名必须为中英文字符！");
//     } else {
//         cityInput.style.backgroundColor = "";
//     }
// }



// 聚焦显示黄色
valueInput.onfocus = function() {
    if (valueInput.style.backgroundColor != "red") {
        valueInput.style.backgroundColor = "yellow";
    }
};

// 空气质量指数必须为整数
valueInput.onblur = function() {
    let value = valueInput.value;
    valueInput.value = value.trim();
    let path = /[\D]/g;
    if (path.test(valueInput.value)) {
        valueInput.style.backgroundColor = "red";
        alert("空气质量指数必须为整数！");
    } else {
        valueInput.style.backgroundColor = "";
    }
    if (cityInput.style.backgroundColor === "red" || valueInput.style.backgroundColor === "red") {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    // 用户可以点击表格列中的“ 删除” 按钮， 删掉那一行的数据
    let city = cityInput.value;
    let value = valueInput.value;
    aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    let aqiDataArr = Object.entries(aqiData);
    let headHtml = "<tr><td>城市</td><td>空气质量</td ><td>操作</td></tr>";
    aqiDataArr = aqiDataArr.map(x => {
        return "<tr><td>" + x[0] + "</td><td>" + x[1] + "</td><td><button>删除</button></td></tr>";
    });
    let innerHtml = headHtml + aqiDataArr.join("");
    table.innerHTML = innerHtml;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    var target = e.target;
    if (target.nodeName.toLowerCase() == "button") {
        let city=target.parentNode.parentNode.children[0].innerHTML;
        delete aqiData[city];
    }
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.addEventListener("click", addBtnHandle, false);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener("click", delBtnHandle, false);
}

init();