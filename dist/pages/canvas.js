"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _canvasdrawer = require('./../components/canvasdrawer/canvasdrawer.js');

var _canvasdrawer2 = _interopRequireDefault(_canvasdrawer);

var _drawerdata = require('./../components/canvasdrawer/drawerdata.js');

var _drawerdata2 = _interopRequireDefault(_drawerdata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_wepy$page) {
    _inherits(Canvas, _wepy$page);

    function Canvas() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Canvas);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: "生成图片",
            navigationBarBackgroundColor: "#fff",
            navigationBarTextStyle: "black"
        }, _this.$repeat = {}, _this.$props = { "canvasdrawer": { "xmlns:v-bind": "", "v-bind:painting.sync": "painting", "xmlns:v-on": "" } }, _this.$events = { "canvasdrawer": { "v-on:getImage": "eventGetImage" } }, _this.components = {
            canvasdrawer: _canvasdrawer2.default
        }, _this.data = {
            shareImage: "",
            painting: null
        }, _this.computed = {}, _this.methods = {
            eventDraw: function eventDraw() {
                _wepy2.default.showLoading({
                    title: "绘制分享图片中",
                    mask: true
                });
                this.painting = _drawerdata2.default;
                this.$apply();
            },
            eventSave: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var res;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _wepy2.default.saveImageToPhotosAlbum({
                                        filePath: this.shareImage
                                    });

                                case 2:
                                    res = _context.sent;

                                    if (res.errMsg === "saveImageToPhotosAlbum:ok") {
                                        _wepy2.default.showToast({
                                            title: "保存图片成功",
                                            icon: "success",
                                            duration: 2000
                                        });
                                    }

                                case 4:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function eventSave() {
                    return _ref2.apply(this, arguments);
                }

                return eventSave;
            }(),
            eventGetImage: function eventGetImage(event) {
                _wepy2.default.hideLoading();
                var tempFilePath = event.tempFilePath,
                    errMsg = event.errMsg;

                if (errMsg === "canvasdrawer:ok") this.shareImage = tempFilePath;
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Canvas, [{
        key: "onLoad",
        value: function onLoad() {}
    }]);

    return Canvas;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Canvas , 'pages/canvas'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhcy5qcyJdLCJuYW1lcyI6WyJDYW52YXMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjYW52YXNkcmF3ZXIiLCJkYXRhIiwic2hhcmVJbWFnZSIsInBhaW50aW5nIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnREcmF3Iiwid2VweSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiRHJhd2VyRGF0YSIsIiRhcHBseSIsImV2ZW50U2F2ZSIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInJlcyIsImVyck1zZyIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImV2ZW50R2V0SW1hZ2UiLCJldmVudCIsImhpZGVMb2FkaW5nIiwidGVtcEZpbGVQYXRoIiwiZXZlbnRzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLE1BRG5CO0FBRUxDLDBDQUE4QixNQUZ6QjtBQUdMQyxvQ0FBd0I7QUFIbkIsUyxRQU1WQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFxRCxjQUFhLEVBQWxFLEVBQWhCLEUsUUFDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxpQkFBZ0IsZUFBakIsRUFBaEIsRSxRQUNUQyxVLEdBQWE7QUFDTkM7QUFETSxTLFFBSVZDLEksR0FBTztBQUNIQyx3QkFBWSxFQURUO0FBRUhDLHNCQUFVO0FBRlAsUyxRQUtQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ007QUFDUkMsK0JBQUtDLFdBQUwsQ0FBaUI7QUFDYkMsMkJBQU8sU0FETTtBQUViQywwQkFBTTtBQUZPLGlCQUFqQjtBQUlBLHFCQUFLUCxRQUFMLEdBQWdCUSxvQkFBaEI7QUFDQSxxQkFBS0MsTUFBTDtBQUNILGFBUks7QUFTQUMscUJBVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJDQVdnQk4sZUFBS08sc0JBQUwsQ0FBNEI7QUFDMUNDLGtEQUFVLEtBQUtiO0FBRDJCLHFDQUE1QixDQVhoQjs7QUFBQTtBQVdJYyx1Q0FYSjs7QUFjRix3Q0FBSUEsSUFBSUMsTUFBSixLQUFlLDJCQUFuQixFQUFnRDtBQUM1Q1YsdURBQUtXLFNBQUwsQ0FBZTtBQUNYVCxtREFBTyxRQURJO0FBRVhVLGtEQUFNLFNBRks7QUFHWEMsc0RBQVU7QUFIQyx5Q0FBZjtBQUtIOztBQXBCQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQXNCTkMseUJBdEJNLHlCQXNCUUMsS0F0QlIsRUFzQmU7QUFDakJmLCtCQUFLZ0IsV0FBTDtBQURpQixvQkFFVEMsWUFGUyxHQUVnQkYsS0FGaEIsQ0FFVEUsWUFGUztBQUFBLG9CQUVLUCxNQUZMLEdBRWdCSyxLQUZoQixDQUVLTCxNQUZMOztBQUdqQixvQkFBSUEsV0FBVyxpQkFBZixFQUFrQyxLQUFLZixVQUFMLEdBQWtCc0IsWUFBbEI7QUFDckM7QUExQkssUyxRQTZCVkMsTSxHQUFTLEU7Ozs7O2lDQUVBLENBQUU7Ozs7RUFwRHFCbEIsZUFBS21CLEk7O2tCQUFwQm5DLE0iLCJmaWxlIjoiY2FudmFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBjYW52YXNkcmF3ZXIgZnJvbSBcIkAvY29tcG9uZW50cy9jYW52YXNkcmF3ZXIvY2FudmFzZHJhd2VyXCI7XHJcbmltcG9ydCBEcmF3ZXJEYXRhIGZyb20gXCJAL2NvbXBvbmVudHMvY2FudmFzZHJhd2VyL2RyYXdlcmRhdGFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLnlJ/miJDlm77niYdcIixcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmZmZcIixcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcImJsYWNrXCJcclxuICAgIH07XHJcblxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNhbnZhc2RyYXdlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFpbnRpbmcuc3luY1wiOlwicGFpbnRpbmdcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJjYW52YXNkcmF3ZXJcIjp7XCJ2LW9uOmdldEltYWdlXCI6XCJldmVudEdldEltYWdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgY2FudmFzZHJhd2VyXHJcbiAgICB9O1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2hhcmVJbWFnZTogXCJcIixcclxuICAgICAgICBwYWludGluZzogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZXZlbnREcmF3KCkge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIue7mOWItuWIhuS6q+WbvueJh+S4rVwiLFxyXG4gICAgICAgICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYWludGluZyA9IERyYXdlckRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBldmVudFNhdmUoKSB7XHJcbiAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh+iHs+acrOWcsFxyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB3ZXB5LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IHRoaXMuc2hhcmVJbWFnZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bTpva1wiKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5L+d5a2Y5Zu+54mH5oiQ5YqfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBldmVudEdldEltYWdlKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGgsIGVyck1zZyB9ID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIGlmIChlcnJNc2cgPT09IFwiY2FudmFzZHJhd2VyOm9rXCIpIHRoaXMuc2hhcmVJbWFnZSA9IHRlbXBGaWxlUGF0aDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGV2ZW50cyA9IHt9O1xyXG5cclxuICAgIG9uTG9hZCgpIHt9XHJcbn1cclxuIl19