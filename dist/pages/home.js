"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_wepy$page) {
    _inherits(Home, _wepy$page);

    function Home() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Home);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: "DEMOS",
            navigationBarBackgroundColor: "#fff",
            navigationBarTextStyle: "black"
        }, _this.components = {}, _this.data = {
            menus: [{
                cn: "图片分享",
                url: "/pages/canvas",
                isShow: true
            }]
        }, _this.computed = {}, _this.methods = {
            pageSwitch: function pageSwitch(url) {
                _wepy2.default.navigateTo({ url: url });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Home, [{
        key: "onLoad",
        value: function onLoad() {}
    }]);

    return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJkYXRhIiwibWVudXMiLCJjbiIsInVybCIsImlzU2hvdyIsImNvbXB1dGVkIiwibWV0aG9kcyIsInBhZ2VTd2l0Y2giLCJ3ZXB5IiwibmF2aWdhdGVUbyIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixPQURuQjtBQUVMQywwQ0FBOEIsTUFGekI7QUFHTEMsb0NBQXdCO0FBSG5CLFMsUUFNVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLG1CQUFPLENBQ0g7QUFDSUMsb0JBQUksTUFEUjtBQUVJQyxxQkFBSyxlQUZUO0FBR0lDLHdCQUFRO0FBSFosYUFERztBQURKLFMsUUFVUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLSixHQURMLEVBQ1U7QUFDWkssK0JBQUtDLFVBQUwsQ0FBZ0IsRUFBRU4sUUFBRixFQUFoQjtBQUNIO0FBSEssUyxRQU1WTyxNLEdBQVMsRTs7Ozs7aUNBR0EsQ0FDUjs7OztFQS9CNkJGLGVBQUtHLEk7O2tCQUFsQmpCLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCJERU1PU1wiLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiYmxhY2tcIlxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRzID0ge307XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBtZW51czogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbjogXCLlm77niYfliIbkuqtcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvcGFnZXMvY2FudmFzXCIsXHJcbiAgICAgICAgICAgICAgICBpc1Nob3c6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHBhZ2VTd2l0Y2godXJsKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgIH07XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgfVxyXG59XHJcbiJdfQ==