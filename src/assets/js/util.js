/* eslint valid-typeof: 0, no-cond-assign: 0 */
const toString = Object.prototype.toString;
const Util = {};

// 类型判断
["Array", "Function", "Object", "RegExp"].forEach((type) => {
    Util[`is${type}`] = (obj) => {
        return obj && toString.call(obj) === `[object ${type}]`;
    };
});

["Boolean", "Number", "String"].forEach((type) => {
    Util[`is${type}`] = (obj) => {
        return typeof obj === type.toLowerCase();
    };
});

// 标准浏览器使用原生的判断方法
if (Array.isArray) {
    Util.isArray = Array.isArray;
}

// 判断是否为空对象
Util.isEmptyObject = (obj) => {
    for (const name in obj) {
        return false;
    }
    return true;
};

// 判断是否为纯粹的对象
Util.isPlainObject = (obj) => {
    if (!obj || !Util.isObject(obj)) {
        return false;
    }

    try {
        for (const name in obj) {
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
Util.capitalize = (str) => {
    const firstStr = str.charAt(0);
    return firstStr.toUpperCase() + str.replace(firstStr, "");
};

/**
 * 对象深拷贝
 * JSON.parse(JSON.stringify(obj));
 */
Util.clone = (obj) => {
    if (JSON && JSON.parse) {
        return JSON.parse(JSON.stringify(obj));
    }

    let o;
    if (typeof obj === "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (let i = 0, len = obj.length; i < len; i++) {
                    o.push(Util.clone(obj[i]));
                }
            } else {
                o = {};
                for (const j in obj) {
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
Util.uniqueId = (length = 16, namespace = "vk") => {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text = `${text}${possible.charAt(Math.floor(Math.random() * possible.length))}`;
    }
    return `${namespace}-${text}`;
};


/**
 * 获取小程序当前页面的路由, 也可以赋值数字获取存在于页面栈中的历史页。
 * 例：getCurrentPage(-1) 获取上一页实例，num 不能大于0，默认为0。
 */
Util.getCurrentPage = (num) => {
    const page = getCurrentPages();

    if (num > 0) num = 0;
    return page[page.length - 1 + (num || 0)];
};

export default Util;
