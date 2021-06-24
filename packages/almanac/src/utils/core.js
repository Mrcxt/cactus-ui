//
import { isToday, isWeekend, format } from "date-fns";
import { activities, tools, varNames } from "./const";

const iday = Number(format(new Date(), "yyyyMMdd"));

function random(dayseed, indexseed = 0) {
  let n = dayseed % 11117;
  for (let i = 0; i < 100 + indexseed; i++) {
    n = n * n;
    n = n % 11117; // 11117 是个质数
  }
  return n;
}

export function getTodayStar() {
  const num = (random(iday, 1) % 5) + 1;
  const createStar = (star, num) => Array.from(Array(num), () => star).join("");
  const on = createStar("★", num);
  const off = createStar("☆", 5 - num);

  return on + off;
}

// 生成今日运势
export function getTodayLuck() {
  let good = [],
    bad = [];
  let _activities = filter(activities);

  let numGood = (random(iday, 98) % 3) + 2;
  let numBad = (random(iday, 87) % 3) + 2;
  let eventArr = pickRandomActivity(_activities, numGood + numBad);

  for (let i = 0; i < numGood; i++) {
    good.push(eventArr[i]);
  }

  for (let i = 0; i < numBad; i++) {
    bad.push(eventArr[numGood + i]);
  }
  return { good, bad };
}

// 去掉一些不合今日的事件
function filter(activities) {
  // 周末的话，只留下 weekend = true 的事件
  if (isWeekend(new Date())) {
    return activities.filter((item) => item.weekend);
  }

  return activities;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
  var picked_events = pickRandom(activities, size);

  for (var i = 0; i < picked_events.length; i++) {
    picked_events[i] = parse(picked_events[i]);
  }

  return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
  var result = [];

  for (var i = 0; i < array.length; i++) {
    result.push(array[i]);
  }

  for (var j = 0; j < array.length - size; j++) {
    var index = random(iday, j) % result.length;
    result.splice(index, 1);
  }

  return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
  var result = { name: event.name, good: event.good, bad: event.bad }; // clone

  if (result.name.indexOf("%v") != -1) {
    result.name = result.name.replace(
      "%v",
      varNames[random(iday, 12) % varNames.length]
    );
  }

  if (result.name.indexOf("%t") != -1) {
    result.name = result.name.replace(
      "%t",
      tools[random(iday, 11) % tools.length]
    );
  }

  if (result.name.indexOf("%l") != -1) {
    result.name = result.name.replace(
      "%l",
      ((random(iday, 12) % 247) + 30).toString()
    );
  }

  return result;
}

export function getLunar(time = new Date()) {
  const tg = "甲乙丙丁戊己庚辛壬癸";
  const dz = "子丑寅卯辰巳午未申酉戌亥";
  const sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
  const month = "正二三四五六七八九十冬腊";
  const day = "一二三四五六七八九十";

  const _tg = (yyyy) => tg.charAt((yyyy - 4) % 10);
  const _dz = (yyyy) => dz.charAt((yyyy - 4) % 12);
  const _sx = (yyyy) => sx.charAt((yyyy - 4) % 12);
  const _mm = (mm) => month[mm - 1] + "月";
  const _dd = (dd) => {
    let _dd = "";
    _dd += dd < 11 ? "初" : dd < 20 ? "十" : dd < 30 ? "廿" : "三十";
    if (dd % 10 != 0 || dd == 10) {
      _dd += day.charAt((dd - 1) % 10);
    }
    return _dd;
  };

  const zh_lunar = new Date(time).toLocaleString("zh-CN-u-ca-chinese");
  const jp_lunar = new Date(time).toLocaleString("ja-JP-u-ca-chinese");

  const [yyyy] = zh_lunar.match(/(^\d{4})/i).slice(1);
  const [mm, dd] = jp_lunar.match(/(\d{1,2}).(\d{1,2})/i).slice(1);

  return {
    tg: _tg(yyyy),
    dz: _dz(yyyy),
    tgdz: _tg(yyyy) + _dz(yyyy),
    sx: _sx(yyyy),
    mm: _mm(mm),
    dd: _dd(dd),
    toString: function () {
      return `${this.tgdz}(${this.sx})年 ${this.mm}${this.dd}`;
    },
  };
}
