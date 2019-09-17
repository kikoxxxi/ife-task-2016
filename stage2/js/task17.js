/* 数据格式演示
let aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

let wrapper = document.getElementById("aqi-chart-wrap");
let spans = document.querySelectorAll('span');


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    let y = dat.getFullYear();
    let m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    let returnData = {};
    let dat = new Date("2016-01-01");
    let datStr = '';
    for (let i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

let aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
let chartData = {};
let colors = ['#16324a', '#996699', '#24385e', '#393f65', '#4e4a67', '#9999cc', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8', '#ffcccc', '#cc9999'
];

// 记录当前页面的表单选项
let pageState = {
    nowSelectCity: "北京",
    nowGraTime: "日"
};

function getTitle() {
    switch (pageState.nowGraTime) {
        case "日":
            return "每日";
        case "周":
            return "周平均";
        case "月":
            return "月平均";
    }
}
/**
 * 渲染图表
 */
function renderChart() {
    let innerHTML = "";
    innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市" + getTitle() + "空气质量报告</div>"
    for (let date in chartData) {
        let count = chartData[date];
        innerHTML += "<div title='" + date + " : " + count + "'class='aqi-bar' style='height:" + count + "px; background-color:" + colors[Math.floor(Math.random() * 10)] + "'></div>";
    }
    wrapper.innerHTML = innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    let target = getTarget(e);
    if (target.nodeName.toLowerCase() === "span") {
        // 确定是否选项发生了变化
        if (pageState.nowGraTime === target.innerHTML) {
            return;
        }
        [...spans].map(span => span.className = "");
        target.className = 'selected';
        pageState.nowGraTime = target.innerHTML;
        // 设置对应数据
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化
    if (pageState.nowSelectCity === this.value) {
        return;
    }
    pageState.nowSelectCity = this.value;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    let grade = document.getElementsByClassName('grade');
    addHandler(grade[0], "click", graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    let citySelect = document.getElementById('city-select');
    let citys = Object.keys(aqiSourceData);
    citys.map(city => {
        let option = document.createElement("option");
        option.innerHTML = city;
        citySelect.appendChild(option);
    });
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    addHandler(citySelect, "change", citySelectChange);
}

function initData(graTime, nowSelectCityData) {
    let countSum = 0,
        daySum = 0,
        dimention,
        dates = Object.keys(nowSelectCityData);
    if (graTime === '周') {
        dimention = 0;
        dates.map(date => {
            countSum += nowSelectCityData[date];
            daySum++;
            if ((new Date(date)).getDay() == 6) {
                dimention++;
                chartData['第' + dimention + '周'] = Math.floor(countSum / daySum);
                countSum = 0;
                daySum = 0;
            }
        });
        if (daySum != 0) {
            dimention++;
            chartData['第' + dimention + '周'] = Math.floor(countSum / daySum);
        }
    } else {
        dimention = new Date(dates[0]).getMonth() + 1;
        dates.map(date => {
            let currentMonth = new Date(date).getMonth() + 1;
            if (currentMonth !== dimention) {
                chartData[dimention + '月份'] = Math.floor(countSum / daySum);
                daySum = 0;
                countSum = 0;
                dimention = currentMonth;
            }
            daySum++;
            countSum += nowSelectCityData[date];
        });
        if (daySum != 0) {
            chartData[dimention + '月份'] = Math.floor(countSum / daySum);
        }
    }
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    let nowSelectCityData = aqiSourceData[pageState.nowSelectCity];
    let graTime = pageState.nowGraTime;
    chartData = {};
    if (graTime === "日") {
        chartData = nowSelectCityData;
        return;
    }
    initData(graTime, nowSelectCityData);
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();