"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import config from "@/assets/js/config";

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ["pages/home", "pages/canvas"],
            window: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#fff",
                navigationBarTitleText: "Demos",
                navigationBarTextStyle: "black"
            }
        };

        _this.use("requestfix");
        _this.use("promisify");
        // 拦截request请求
        _this.intercept("request", {
            // 发出请求时的回调函数
        });
        return _this;
    }

    _createClass(_default, [{
        key: "onLaunch",
        value: function onLaunch() {}
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJpbnRlcmNlcHQiLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBQ0E7Ozs7O0FBZ0JJLHdCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0FiZEEsTUFhYyxHQWJMO0FBQ0xDLG1CQUFPLENBQ0gsWUFERyxFQUVILGNBRkcsQ0FERjtBQUtMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixPQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEI7QUFMSCxTQWFLOztBQUVWLGNBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsY0FBS0EsR0FBTCxDQUFTLFdBQVQ7QUFDQTtBQUNBLGNBQUtDLFNBQUwsQ0FBZSxTQUFmLEVBQTBCO0FBQ3RCO0FBRHNCLFNBQTFCO0FBTFU7QUFRYjs7OzttQ0FFVSxDQUFFOzs7O0VBeEJZQyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgXCJ3ZXB5LWFzeW5jLWZ1bmN0aW9uXCI7XHJcbi8vIGltcG9ydCBjb25maWcgZnJvbSBcIkAvYXNzZXRzL2pzL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgXCJwYWdlcy9ob21lXCIsXHJcbiAgICAgICAgICAgIFwicGFnZXMvY2FudmFzXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiBcImxpZ2h0XCIsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIkRlbW9zXCIsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiYmxhY2tcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudXNlKFwicmVxdWVzdGZpeFwiKTtcclxuICAgICAgICB0aGlzLnVzZShcInByb21pc2lmeVwiKTtcclxuICAgICAgICAvLyDmi6bmiKpyZXF1ZXN06K+35rGCXHJcbiAgICAgICAgdGhpcy5pbnRlcmNlcHQoXCJyZXF1ZXN0XCIsIHtcclxuICAgICAgICAgICAgLy8g5Y+R5Ye66K+35rGC5pe255qE5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25MYXVuY2goKSB7fVxyXG59XHJcbiJdfQ==