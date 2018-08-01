module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: "airbnb-base",
    // required to lint *.wpy files
    plugins: [
        "html"
    ],
    settings: {
        "html/html-extensions": [".html", ".wpy"]
    },
    // add your custom rules here
    rules: {
        //  beta 3.0.0
        "import/extensions": ["error", "always", {
            "js": "never",
            "wepy": "never"
        }],
        "import/extensions": 0, // 扩展名称
        "import/no-unresolved": 0, // 找不到路径
        "import/no-extraneous-dependencies": 0,
        "func-names": 0, // 使用具名函数
        "arrow-body-style": 0, // 箭头函数要求必须有函数体
        "no-return-assign": 0, // 返回的结果中使用了等于
        // 限制单行不得超过 230 个字符
        "max-len": ["error", {
            "code": 230,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreRegExpLiterals": true
        }],
        "consistent-return": 0, // 检测返回值的类型是否一致
        "comma-dangle": ["error", "never"],
        // warnning
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 1,
        "no-console": process.env.NODE_ENV === "production" ? 2 : 1,


        "indent": ["error", 4, { "SwitchCase": 1 }], // indent 为4空格
        "quotes": ["error", "double"], // 双引号
        "semi": ["error", "always"], // 结尾分号
        "vars-on-top": 2, // var必须放在作用域顶部

        // 永久关闭
        "no-await-in-loop": 0,  // for循环中可以用await ？
        "no-mixed-operators": 0, // 检测混合使用的操作符，为什么要关 ？
        "no-restricted-syntax": 0, // 语法检查不要太严格
        "no-unused-vars": 0, // 回调函数中进程有无用参数，所以这个规则不要打开为好
        "no-else-return": 0, // return之后可以接else
        "no-lonely-if": 0, // 检测 if 作为唯一语句出现在 esls 语句块中，为什么关 ？
        "global-require": 0, // require要在头部
        "radix": 0, // 默认10进制
        "no-continue": 0, // 允许使用continue
        "linebreak-style": 0,
        "class-methods-use-this": 0, // 没用this的方法要改为静态的
        "quote-props": 0, // object的key不用引号
        "arrow-parens": 0, // 箭头函数的参数括号问题
        "guard-for-in": 0, // for in 要对key类型判断
        "no-plusplus": 0, // 暂时允许++
        "no-param-reassign": ["error", { "props": false }],
        "no-unused-expressions": ["error", {
            "allowShortCircuit": true
        }],
        "no-extra-boolean-cast": 0,
        "spaced-comment": [2, "always"],
        "no-useless-escape":"off"
    }
};
