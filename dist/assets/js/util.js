"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint valid-typeof: 0, no-cond-assign: 0 */
var toString = Object.prototype.toString;
var Util = {};

// 类型判断
["Array", "Function", "Object", "RegExp"].forEach(function (type) {
    Util["is" + type] = function (obj) {
        return obj && toString.call(obj) === "[object " + type + "]";
    };
});

["Boolean", "Number", "String"].forEach(function (type) {
    Util["is" + type] = function (obj) {
        return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === type.toLowerCase();
    };
});

// 标准浏览器使用原生的判断方法
if (Array.isArray) {
    Util.isArray = Array.isArray;
}

// 判断是否为空对象
Util.isEmptyObject = function (obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};

// 判断是否为纯粹的对象
Util.isPlainObject = function (obj) {
    if (!obj || !Util.isObject(obj)) {
        return false;
    }

    try {
        for (var name in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, name)) {
                return false;
            }
        }
    } catch (_) {
        return false;
    }

    return true;
};

// 首字母大写转换
Util.capitalize = function (str) {
    var firstStr = str.charAt(0);
    return firstStr.toUpperCase() + str.replace(firstStr, "");
};

/**
 * 对象深拷贝
 * JSON.parse(JSON.stringify(obj));
 */
Util.clone = function (obj) {
    if (JSON && JSON.parse) {
        return JSON.parse(JSON.stringify(obj));
    }

    var o = void 0;
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(Util.clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = Util.clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }

    return o;
};

/**
 * 生成唯一 ID
 * 注意：并不能真正确保唯一性，但对前端来说足够用了
 */
Util.uniqueId = function () {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "vk";

    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text = "" + text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return namespace + "-" + text;
};

/**
 * 获取小程序当前页面的路由, 也可以赋值数字获取存在于页面栈中的历史页。
 * 例：getCurrentPage(-1) 获取上一页实例，num 不能大于0，默认为0。
 */
Util.getCurrentPage = function (num) {
    var page = getCurrentPages();

    if (num > 0) num = 0;
    return page[page.length - 1 + (num || 0)];
};

exports.default = Util;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsidG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJVdGlsIiwiZm9yRWFjaCIsInR5cGUiLCJvYmoiLCJjYWxsIiwidG9Mb3dlckNhc2UiLCJBcnJheSIsImlzQXJyYXkiLCJpc0VtcHR5T2JqZWN0IiwibmFtZSIsImlzUGxhaW5PYmplY3QiLCJpc09iamVjdCIsImhhc093blByb3BlcnR5IiwiXyIsImNhcGl0YWxpemUiLCJzdHIiLCJmaXJzdFN0ciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicmVwbGFjZSIsImNsb25lIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibyIsImkiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwiaiIsInVuaXF1ZUlkIiwibmFtZXNwYWNlIiwidGV4dCIsInBvc3NpYmxlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0Q3VycmVudFBhZ2UiLCJudW0iLCJwYWdlIiwiZ2V0Q3VycmVudFBhZ2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsSUFBTUEsV0FBV0MsT0FBT0MsU0FBUCxDQUFpQkYsUUFBbEM7QUFDQSxJQUFNRyxPQUFPLEVBQWI7O0FBRUE7QUFDQSxDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFFBQXRCLEVBQWdDLFFBQWhDLEVBQTBDQyxPQUExQyxDQUFrRCxVQUFDQyxJQUFELEVBQVU7QUFDeERGLGdCQUFVRSxJQUFWLElBQW9CLFVBQUNDLEdBQUQsRUFBUztBQUN6QixlQUFPQSxPQUFPTixTQUFTTyxJQUFULENBQWNELEdBQWQsbUJBQWtDRCxJQUFsQyxNQUFkO0FBQ0gsS0FGRDtBQUdILENBSkQ7O0FBTUEsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixRQUF0QixFQUFnQ0QsT0FBaEMsQ0FBd0MsVUFBQ0MsSUFBRCxFQUFVO0FBQzlDRixnQkFBVUUsSUFBVixJQUFvQixVQUFDQyxHQUFELEVBQVM7QUFDekIsZUFBTyxRQUFPQSxHQUFQLHlDQUFP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QVdELEtBQUtFLE1BQUwsS0FBZ0JILFNBQVNOLE1BQXBDLENBQWhCLENBQWpCO0FBQ0g7QUFDRCxXQUFVSSxTQUFWLFNBQXVCQyxJQUF2QjtBQUNILENBUkQ7O0FBV0E7Ozs7QUFJQWhDLEtBQUtxQyxjQUFMLEdBQXNCLFVBQUNDLEdBQUQsRUFBUztBQUMzQixRQUFNQyxPQUFPQyxpQkFBYjs7QUFFQSxRQUFJRixNQUFNLENBQVYsRUFBYUEsTUFBTSxDQUFOO0FBQ2IsV0FBT0MsS0FBS0EsS0FBS1osTUFBTCxHQUFjLENBQWQsSUFBbUJXLE9BQU8sQ0FBMUIsQ0FBTCxDQUFQO0FBQ0gsQ0FMRDs7a0JBT2V0QyxJIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgdmFsaWQtdHlwZW9mOiAwLCBuby1jb25kLWFzc2lnbjogMCAqL1xyXG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbmNvbnN0IFV0aWwgPSB7fTtcclxuXHJcbi8vIOexu+Wei+WIpOaWrVxyXG5bXCJBcnJheVwiLCBcIkZ1bmN0aW9uXCIsIFwiT2JqZWN0XCIsIFwiUmVnRXhwXCJdLmZvckVhY2goKHR5cGUpID0+IHtcclxuICAgIFV0aWxbYGlzJHt0eXBlfWBdID0gKG9iaikgPT4ge1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgdG9TdHJpbmcuY2FsbChvYmopID09PSBgW29iamVjdCAke3R5cGV9XWA7XHJcbiAgICB9O1xyXG59KTtcclxuXHJcbltcIkJvb2xlYW5cIiwgXCJOdW1iZXJcIiwgXCJTdHJpbmdcIl0uZm9yRWFjaCgodHlwZSkgPT4ge1xyXG4gICAgVXRpbFtgaXMke3R5cGV9YF0gPSAob2JqKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IHR5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgIH07XHJcbn0pO1xyXG5cclxuLy8g5qCH5YeG5rWP6KeI5Zmo5L2/55So5Y6f55Sf55qE5Yik5pat5pa55rOVXHJcbmlmIChBcnJheS5pc0FycmF5KSB7XHJcbiAgICBVdGlsLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xyXG59XHJcblxyXG4vLyDliKTmlq3mmK/lkKbkuLrnqbrlr7nosaFcclxuVXRpbC5pc0VtcHR5T2JqZWN0ID0gKG9iaikgPT4ge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG9iaikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLy8g5Yik5pat5piv5ZCm5Li657qv57K555qE5a+56LGhXHJcblV0aWwuaXNQbGFpbk9iamVjdCA9IChvYmopID0+IHtcclxuICAgIGlmICghb2JqIHx8ICFVdGlsLmlzT2JqZWN0KG9iaikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgbmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vLyDpppblrZfmr43lpKflhpnovazmjaJcclxuVXRpbC5jYXBpdGFsaXplID0gKHN0cikgPT4ge1xyXG4gICAgY29uc3QgZmlyc3RTdHIgPSBzdHIuY2hhckF0KDApO1xyXG4gICAgcmV0dXJuIGZpcnN0U3RyLnRvVXBwZXJDYXNlKCkgKyBzdHIucmVwbGFjZShmaXJzdFN0ciwgXCJcIik7XHJcbn07XHJcblxyXG4vKipcclxuICog5a+56LGh5rex5ou36LSdXHJcbiAqIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAqL1xyXG5VdGlsLmNsb25lID0gKG9iaikgPT4ge1xyXG4gICAgaWYgKEpTT04gJiYgSlNPTi5wYXJzZSkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvO1xyXG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG8gPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ucHVzaChVdGlsLmNsb25lKG9ialtpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBqIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9bal0gPSBVdGlsLmNsb25lKG9ialtqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG8gPSBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG87XHJcbn07XHJcblxyXG4vKipcclxuICog55Sf5oiQ5ZSv5LiAIElEXHJcbiAqIOazqOaEj++8muW5tuS4jeiDveecn+ato+ehruS/neWUr+S4gOaAp++8jOS9huWvueWJjeerr+adpeivtOi2s+Wkn+eUqOS6hlxyXG4gKi9cclxuVXRpbC51bmlxdWVJZCA9IChsZW5ndGggPSAxNiwgbmFtZXNwYWNlID0gXCJ2a1wiKSA9PiB7XHJcbiAgICBsZXQgdGV4dCA9IFwiXCI7XHJcbiAgICBjb25zdCBwb3NzaWJsZSA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRleHQgPSBgJHt0ZXh0fSR7cG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYCR7bmFtZXNwYWNlfS0ke3RleHR9YDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICog6I635Y+W5bCP56iL5bqP5b2T5YmN6aG16Z2i55qE6Lev55SxLCDkuZ/lj6/ku6XotYvlgLzmlbDlrZfojrflj5blrZjlnKjkuo7pobXpnaLmoIjkuK3nmoTljoblj7LpobXjgIJcclxuICog5L6L77yaZ2V0Q3VycmVudFBhZ2UoLTEpIOiOt+WPluS4iuS4gOmhteWunuS+i++8jG51bSDkuI3og73lpKfkuo4w77yM6buY6K6k5Li6MOOAglxyXG4gKi9cclxuVXRpbC5nZXRDdXJyZW50UGFnZSA9IChudW0pID0+IHtcclxuICAgIGNvbnN0IHBhZ2UgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuXHJcbiAgICBpZiAobnVtID4gMCkgbnVtID0gMDtcclxuICAgIHJldHVybiBwYWdlW3BhZ2UubGVuZ3RoIC0gMSArIChudW0gfHwgMCldO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbDtcclxuIl19