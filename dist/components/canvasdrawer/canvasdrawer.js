"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = function (_wepy$component) {
    _inherits(Drawer, _wepy$component);

    function Drawer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Drawer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            painting: {
                type: Object,
                default: {}
            }
        }, _this.data = {
            showCanvas: false,

            width: 100,
            height: 100,

            index: 0,
            imageList: [],
            tempFileList: [],

            isPainting: false,
            ctx: null,
            cache: {}
        }, _this.watch = {
            painting: function painting(newVal, oldVal) {
                if (!this.isPainting) {
                    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                        if (newVal && newVal.width && newVal.height) {
                            this.showCanvas = true;
                            this.isPainting = true;
                            this.$apply();
                            this.readyPigment();
                        }
                    } else {
                        if (newVal && newVal.mode !== "same") {
                            this.$emit("getImage", {
                                errMsg: "canvasdrawer:samme params"
                            });
                        }
                    }
                }
            }
        }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
    * @argument
    * painting -- json数据
    * @event
    * getImage 渲染图片完成后的回调
    **/


    _createClass(Drawer, [{
        key: "readyPigment",
        value: function readyPigment() {
            var _this2 = this;

            var _painting = this.painting,
                width = _painting.width,
                height = _painting.height,
                views = _painting.views;

            this.width = width;
            this.height = height;

            var inter = setInterval(function () {
                if (_this2.ctx) {
                    clearInterval(inter);
                    _this2.ctx.clearActions();
                    _this2.ctx.save();
                    _this2.getImageList(views);
                    _this2.downLoadImages(0);
                }
            }, 100);
        }
    }, {
        key: "getImageList",
        value: function getImageList(views) {
            var imageList = [];
            for (var i = 0; i < views.length; i++) {
                if (views[i].type === "image") {
                    imageList.push(views[i].url);
                }
            }
            this.imageList = imageList;
        }
    }, {
        key: "downLoadImages",
        value: function downLoadImages(index) {
            var _this3 = this;

            var imageList = this.imageList,
                tempFileList = this.tempFileList;

            if (index < imageList.length) {
                this.getImageInfo(imageList[index]).then(function (file) {
                    tempFileList.push(file);
                    _this3.tempFileList = tempFileList;
                    _this3.downLoadImages(index + 1);
                });
            } else {
                this.startPainting();
            }
        }
    }, {
        key: "startPainting",
        value: function startPainting() {
            var _this4 = this;

            var tempFileList = this.tempFileList,
                views = this.painting.views;

            for (var i = 0, imageIndex = 0; i < views.length; i++) {
                if (views[i].type === "image") {
                    this.drawImage(_extends({}, views[i], {
                        url: tempFileList[imageIndex]
                    }));
                    imageIndex++;
                } else if (views[i].type === "text") {
                    if (!this.ctx.measureText) {
                        _wepy2.default.showModal({
                            title: "提示",
                            content: "当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。"
                        });
                        this.$emit("getImage", {
                            errMsg: "canvasdrawer:version too low"
                        });
                        return;
                    } else {
                        this.drawText(views[i]);
                    }
                } else if (views[i].type === "rect") {
                    this.drawRect(views[i]);
                }
            }
            this.ctx.draw(false, function () {
                _wepy2.default.setStorageSync("canvasdrawer_pic_cache", _this4.cache);
                _this4.saveImageToLocal();
            });
        }
    }, {
        key: "drawImage",
        value: function drawImage(params) {
            this.ctx.save();
            var url = params.url,
                _params$top = params.top,
                top = _params$top === undefined ? 0 : _params$top,
                _params$left = params.left,
                left = _params$left === undefined ? 0 : _params$left,
                _params$width = params.width,
                width = _params$width === undefined ? 0 : _params$width,
                _params$height = params.height,
                height = _params$height === undefined ? 0 : _params$height,
                _params$borderRadius = params.borderRadius,
                borderRadius = _params$borderRadius === undefined ? 0 : _params$borderRadius;

            this.ctx.drawImage(url, left, top, width, height);
            this.ctx.restore();
        }
    }, {
        key: "drawText",
        value: function drawText(params) {
            this.ctx.save();
            var _params$MaxLineNumber = params.MaxLineNumber,
                MaxLineNumber = _params$MaxLineNumber === undefined ? 2 : _params$MaxLineNumber,
                _params$breakWord = params.breakWord,
                breakWord = _params$breakWord === undefined ? false : _params$breakWord,
                _params$color = params.color,
                color = _params$color === undefined ? "black" : _params$color,
                _params$content = params.content,
                content = _params$content === undefined ? "" : _params$content,
                _params$fontSize = params.fontSize,
                fontSize = _params$fontSize === undefined ? 16 : _params$fontSize,
                _params$top2 = params.top,
                top = _params$top2 === undefined ? 0 : _params$top2,
                _params$left2 = params.left,
                left = _params$left2 === undefined ? 0 : _params$left2,
                _params$lineHeight = params.lineHeight,
                lineHeight = _params$lineHeight === undefined ? 20 : _params$lineHeight,
                _params$textAlign = params.textAlign,
                textAlign = _params$textAlign === undefined ? "left" : _params$textAlign,
                width = params.width,
                _params$bolder = params.bolder,
                bolder = _params$bolder === undefined ? false : _params$bolder,
                _params$textDecoratio = params.textDecoration,
                textDecoration = _params$textDecoratio === undefined ? "none" : _params$textDecoratio;


            this.ctx.beginPath();
            this.ctx.setTextBaseline("top");
            this.ctx.setTextAlign(textAlign);
            this.ctx.setFillStyle(color);
            this.ctx.setFontSize(fontSize);

            if (!breakWord) {
                this.ctx.fillText(content, left, top);
                this.drawTextLine(left, top, textDecoration, color, fontSize, content);
            } else {
                var fillText = "";
                var fillTop = top;
                var lineNum = 1;
                for (var i = 0; i < content.length; i++) {
                    fillText += [content[i]];
                    if (this.ctx.measureText(fillText).width > width) {
                        if (lineNum === MaxLineNumber) {
                            if (i !== content.length) {
                                fillText = fillText.substring(0, fillText.length - 1) + "...";
                                this.ctx.fillText(fillText, left, fillTop);
                                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
                                fillText = "";
                                break;
                            }
                        }
                        this.ctx.fillText(fillText, left, fillTop);
                        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
                        fillText = "";
                        fillTop += lineHeight;
                        lineNum++;
                    }
                }
                this.ctx.fillText(fillText, left, fillTop);
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
            }

            this.ctx.restore();

            if (bolder) {
                this.drawText(_extends({}, params, {
                    left: left + 0.3,
                    top: top + 0.3,
                    bolder: false,
                    textDecoration: "none"
                }));
            }
        }
    }, {
        key: "drawTextLine",
        value: function drawTextLine(left, top, textDecoration, color, fontSize, content) {
            if (textDecoration === "underline") {
                this.drawRect({
                    background: color,
                    top: top + fontSize * 1.2,
                    left: left - 1,
                    width: this.ctx.measureText(content).width + 3,
                    height: 1
                });
            } else if (textDecoration === "line-through") {
                this.drawRect({
                    background: color,
                    top: top + fontSize * 0.6,
                    left: left - 1,
                    width: this.ctx.measureText(content).width + 3,
                    height: 1
                });
            }
        }
    }, {
        key: "drawRect",
        value: function drawRect(params) {
            this.ctx.save();
            var background = params.background,
                _params$top3 = params.top,
                top = _params$top3 === undefined ? 0 : _params$top3,
                _params$left3 = params.left,
                left = _params$left3 === undefined ? 0 : _params$left3,
                _params$width2 = params.width,
                width = _params$width2 === undefined ? 0 : _params$width2,
                _params$height2 = params.height,
                height = _params$height2 === undefined ? 0 : _params$height2;

            this.ctx.setFillStyle(background);
            this.ctx.fillRect(left, top, width, height);
            this.ctx.restore();
        }
    }, {
        key: "getImageInfo",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var objExp, res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.cache[url]) {
                                    _context.next = 4;
                                    break;
                                }

                                return _context.abrupt("return", url);

                            case 4:
                                objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);

                                if (!objExp.test(url)) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 8;
                                return _wepy2.default.getImageInfo({
                                    src: url
                                });

                            case 8:
                                res = _context.sent;

                                if (!(res.errMsg === "getImageInfo:ok")) {
                                    _context.next = 14;
                                    break;
                                }

                                this.cache[url] = res.path;
                                return _context.abrupt("return", res.path);

                            case 14:
                                this.$emit("getImage", {
                                    errMsg: "canvasdrawer:download fail"
                                });
                                return _context.abrupt("return", new Error("getImageInfo fail"));

                            case 16:
                                _context.next = 20;
                                break;

                            case 18:
                                this.cache[url] = url;
                                return _context.abrupt("return", url);

                            case 20:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getImageInfo(_x) {
                return _ref2.apply(this, arguments);
            }

            return getImageInfo;
        }()
    }, {
        key: "saveImageToLocal",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var width, height, res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                width = this.width, height = this.height;
                                _context2.next = 3;
                                return _wepy2.default.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: width,
                                    height: height,
                                    canvasId: "canvasdrawer"
                                }, this);

                            case 3:
                                res = _context2.sent;

                                if (res.errMsg === "canvasToTempFilePath:ok") {
                                    this.showCanvas = false;
                                    this.isPainting = false;
                                    this.imageList = [];
                                    this.tempFileList = [];
                                    this.$apply();
                                    this.$emit("getImage", {
                                        tempFilePath: res.tempFilePath,
                                        errMsg: "canvasdrawer:ok"
                                    });
                                } else {
                                    this.$emit("getImage", {
                                        errMsg: "canvasdrawer:fail"
                                    });
                                }

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function saveImageToLocal() {
                return _ref3.apply(this, arguments);
            }

            return saveImageToLocal;
        }()
    }, {
        key: "onLoad",
        value: function onLoad() {
            _wepy2.default.removeStorageSync("canvasdrawer_pic_cache");
            this.cache = _wepy2.default.getStorageSync("canvasdrawer_pic_cache") || {};
            this.ctx = _wepy2.default.createCanvasContext("canvasdrawer", this);
        }
    }]);

    return Drawer;
}(_wepy2.default.component);

exports.default = Drawer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhc2RyYXdlci5qcyJdLCJuYW1lcyI6WyJEcmF3ZXIiLCJwcm9wcyIsInBhaW50aW5nIiwidHlwZSIsIk9iamVjdCIsImRlZmF1bHQiLCJkYXRhIiwic2hvd0NhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiaW5kZXgiLCJpbWFnZUxpc3QiLCJ0ZW1wRmlsZUxpc3QiLCJpc1BhaW50aW5nIiwiY3R4IiwiY2FjaGUiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIkpTT04iLCJzdHJpbmdpZnkiLCIkYXBwbHkiLCJyZWFkeVBpZ21lbnQiLCJtb2RlIiwiJGVtaXQiLCJlcnJNc2ciLCJtZXRob2RzIiwidmlld3MiLCJpbnRlciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImNsZWFyQWN0aW9ucyIsInNhdmUiLCJnZXRJbWFnZUxpc3QiLCJkb3duTG9hZEltYWdlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwidXJsIiwiZ2V0SW1hZ2VJbmZvIiwidGhlbiIsImZpbGUiLCJzdGFydFBhaW50aW5nIiwiaW1hZ2VJbmRleCIsImRyYXdJbWFnZSIsIm1lYXN1cmVUZXh0Iiwid2VweSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImRyYXdUZXh0IiwiZHJhd1JlY3QiLCJkcmF3Iiwic2V0U3RvcmFnZVN5bmMiLCJzYXZlSW1hZ2VUb0xvY2FsIiwicGFyYW1zIiwidG9wIiwibGVmdCIsImJvcmRlclJhZGl1cyIsInJlc3RvcmUiLCJNYXhMaW5lTnVtYmVyIiwiYnJlYWtXb3JkIiwiY29sb3IiLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJ0ZXh0QWxpZ24iLCJib2xkZXIiLCJ0ZXh0RGVjb3JhdGlvbiIsImJlZ2luUGF0aCIsInNldFRleHRCYXNlbGluZSIsInNldFRleHRBbGlnbiIsInNldEZpbGxTdHlsZSIsInNldEZvbnRTaXplIiwiZmlsbFRleHQiLCJkcmF3VGV4dExpbmUiLCJmaWxsVG9wIiwibGluZU51bSIsInN1YnN0cmluZyIsImJhY2tncm91bmQiLCJmaWxsUmVjdCIsIm9iakV4cCIsIlJlZ0V4cCIsInRlc3QiLCJzcmMiLCJyZXMiLCJwYXRoIiwiRXJyb3IiLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsIngiLCJ5IiwiY2FudmFzSWQiLCJ0ZW1wRmlsZVBhdGgiLCJyZW1vdmVTdG9yYWdlU3luYyIsImdldFN0b3JhZ2VTeW5jIiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQU9qQkMsSyxHQUFRO0FBQ0pDLHNCQUFVO0FBQ05DLHNCQUFNQyxNQURBO0FBRU5DLHlCQUFTO0FBRkg7QUFETixTLFFBT1JDLEksR0FBTztBQUNIQyx3QkFBWSxLQURUOztBQUdIQyxtQkFBTyxHQUhKO0FBSUhDLG9CQUFRLEdBSkw7O0FBTUhDLG1CQUFPLENBTko7QUFPSEMsdUJBQVcsRUFQUjtBQVFIQywwQkFBYyxFQVJYOztBQVVIQyx3QkFBWSxLQVZUO0FBV0hDLGlCQUFLLElBWEY7QUFZSEMsbUJBQU87QUFaSixTLFFBZVBDLEssR0FBUTtBQUNKZCxvQkFESSxvQkFDS2UsTUFETCxFQUNhQyxNQURiLEVBQ3FCO0FBQ3JCLG9CQUFJLENBQUMsS0FBS0wsVUFBVixFQUFzQjtBQUNsQix3QkFBSU0sS0FBS0MsU0FBTCxDQUFlSCxNQUFmLE1BQTJCRSxLQUFLQyxTQUFMLENBQWVGLE1BQWYsQ0FBL0IsRUFBdUQ7QUFDbkQsNEJBQUlELFVBQVVBLE9BQU9ULEtBQWpCLElBQTBCUyxPQUFPUixNQUFyQyxFQUE2QztBQUN6QyxpQ0FBS0YsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGlDQUFLTSxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsaUNBQUtRLE1BQUw7QUFDQSxpQ0FBS0MsWUFBTDtBQUNIO0FBQ0oscUJBUEQsTUFPTztBQUNILDRCQUFJTCxVQUFVQSxPQUFPTSxJQUFQLEtBQWdCLE1BQTlCLEVBQXNDO0FBQ2xDLGlDQUFLQyxL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Ozs7Ozs7O0FBTVg5QixxQyxHQUVBLEksQ0FGQUEsSyxFQUNBQyxNLEdBQ0EsSSxDQURBQSxNOzt1Q0FFY3FDLGVBQUt5QyxvQkFBTCxDQUEwQjtBQUN4Q0MsdUNBQUcsQ0FEcUM7QUFFeENDLHVDQUFHLENBRnFDO0FBR3hDakYsZ0RBSHdDO0FBSXhDQyxrREFKd0M7QUFLeENpRiw4Q0FBVTtBQUw4QixpQ0FBMUIsRUFNZixJQU5lLEM7OztBQUFaTixtQzs7QUFPTixvQ0FBSUEsSUFBSTNELE1BQUosS0FBZSx5QkFBbkIsRUFBOEM7QUFDMUMseUNBQUtsQixVQUFMLEdBQWtCLEtBQWxCO0FBQ0EseUNBQUtNLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSx5Q0FBS0YsU0FBTCxHQUFpQixFQUFqQjtBQUNBLHlDQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EseUNBQUtTLE1BQUw7QUFDQSx5Q0FBS0csS0FBTCxDQUFXLFVBQVgsRUFBdUI7QUFDbkJtRSxzREFBY1AsSUFBSU8sWUFEQztBQUVuQmxFLGdEQUFRO0FBRlcscUNBQXZCO0FBSUgsaUNBVkQsTUFVTztBQUNILHlDQUFLRCxLQUFMLENBQVcsVUFBWCxFQUF1QjtBQUNuQkMsZ0RBQVE7QUFEVyxxQ0FBdkI7QUFHSDs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUVJO0FBQ0xxQiwyQkFBSzhDLGlCQUFMLENBQXVCLHdCQUF2QjtBQUNBLGlCQUFLN0UsS0FBTCxHQUFhK0IsZUFBSytDLGNBQUwsQ0FBb0Isd0JBQXBCLEtBQWlELEVBQTlEO0FBQ0EsaUJBQUsvRSxHQUFMLEdBQVdnQyxlQUFLZ0QsbUJBQUwsQ0FBeUIsY0FBekIsRUFBeUMsSUFBekMsQ0FBWDtBQUNIOzs7O0VBeFMrQmhELGVBQUtpRCxTOztrQkFBcEIvRixNIiwiZmlsZSI6ImNhbnZhc2RyYXdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2VyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgICAvKipcclxuICAgICogQGFyZ3VtZW50XHJcbiAgICAqIHBhaW50aW5nIC0tIGpzb27mlbDmja5cclxuICAgICogQGV2ZW50XHJcbiAgICAqIGdldEltYWdlIOa4suafk+WbvueJh+WujOaIkOWQjueahOWbnuiwg1xyXG4gICAgICAqKi9cclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIHBhaW50aW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2hvd0NhbnZhczogZmFsc2UsXHJcblxyXG4gICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgaGVpZ2h0OiAxMDAsXHJcblxyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIGltYWdlTGlzdDogW10sXHJcbiAgICAgICAgdGVtcEZpbGVMaXN0OiBbXSxcclxuXHJcbiAgICAgICAgaXNQYWludGluZzogZmFsc2UsXHJcbiAgICAgICAgY3R4OiBudWxsLFxyXG4gICAgICAgIGNhY2hlOiB7fVxyXG4gICAgfTtcclxuXHJcbiAgICB3YXRjaCA9IHtcclxuICAgICAgICBwYWludGluZyhuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNQYWludGluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkgIT09IEpTT04uc3RyaW5naWZ5KG9sZFZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsICYmIG5ld1ZhbC53aWR0aCAmJiBuZXdWYWwuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NhbnZhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQYWludGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZHlQaWdtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsICYmIG5ld1ZhbC5tb2RlICE9PSBcInNhbWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KFwiZ2V0SW1hZ2VcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiBcImNhbnZhc2RyYXdlcjpzYW1tZSBwYXJhbXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG1ldGhvZHMgPSB7fTtcclxuICAgIHJlYWR5UGlnbWVudCgpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIHZpZXdzXHJcbiAgICAgICAgfSA9IHRoaXMucGFpbnRpbmc7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBpbnRlciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3R4KSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbWFnZUxpc3Qodmlld3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duTG9hZEltYWdlcygwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgICBnZXRJbWFnZUxpc3Qodmlld3MpIHtcclxuICAgICAgICBjb25zdCBpbWFnZUxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c1tpXS50eXBlID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlTGlzdC5wdXNoKHZpZXdzW2ldLnVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbWFnZUxpc3QgPSBpbWFnZUxpc3Q7XHJcbiAgICB9XHJcbiAgICBkb3duTG9hZEltYWdlcyhpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgaW1hZ2VMaXN0LFxyXG4gICAgICAgICAgICB0ZW1wRmlsZUxpc3RcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICBpZiAoaW5kZXggPCBpbWFnZUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SW1hZ2VJbmZvKGltYWdlTGlzdFtpbmRleF0pLnRoZW4oZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRmlsZUxpc3QucHVzaChmaWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcEZpbGVMaXN0ID0gdGVtcEZpbGVMaXN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duTG9hZEltYWdlcyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UGFpbnRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydFBhaW50aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgdGVtcEZpbGVMaXN0LFxyXG4gICAgICAgICAgICBwYWludGluZzoge1xyXG4gICAgICAgICAgICAgICAgdmlld3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpbWFnZUluZGV4ID0gMDsgaSA8IHZpZXdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c1tpXS50eXBlID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAuLi52aWV3c1tpXSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHRlbXBGaWxlTGlzdFtpbWFnZUluZGV4XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUluZGV4Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmlld3NbaV0udHlwZSA9PT0gXCJ0ZXh0XCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jdHgubWVhc3VyZVRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIuW9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqCBtZWFzdXJlVGV4dCDlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJnZXRJbWFnZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyck1zZzogXCJjYW52YXNkcmF3ZXI6dmVyc2lvbiB0b28gbG93XCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RleHQodmlld3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXdzW2ldLnR5cGUgPT09IFwicmVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWN0KHZpZXdzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5kcmF3KGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoXCJjYW52YXNkcmF3ZXJfcGljX2NhY2hlXCIsIHRoaXMuY2FjaGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVJbWFnZVRvTG9jYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRyYXdJbWFnZShwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIHRvcCA9IDAsXHJcbiAgICAgICAgICAgIGxlZnQgPSAwLFxyXG4gICAgICAgICAgICB3aWR0aCA9IDAsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IDAsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cyA9IDBcclxuICAgICAgICB9ID0gcGFyYW1zO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh1cmwsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG4gICAgZHJhd1RleHQocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgTWF4TGluZU51bWJlciA9IDIsXHJcbiAgICAgICAgICAgIGJyZWFrV29yZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICBjb2xvciA9IFwiYmxhY2tcIixcclxuICAgICAgICAgICAgY29udGVudCA9IFwiXCIsXHJcbiAgICAgICAgICAgIGZvbnRTaXplID0gMTYsXHJcbiAgICAgICAgICAgIHRvcCA9IDAsXHJcbiAgICAgICAgICAgIGxlZnQgPSAwLFxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0ID0gMjAsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbiA9IFwibGVmdFwiLFxyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgYm9sZGVyID0gZmFsc2UsXHJcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uID0gXCJub25lXCJcclxuICAgICAgICB9ID0gcGFyYW1zO1xyXG5cclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5zZXRUZXh0QmFzZWxpbmUoXCJ0b3BcIik7XHJcbiAgICAgICAgdGhpcy5jdHguc2V0VGV4dEFsaWduKHRleHRBbGlnbik7XHJcbiAgICAgICAgdGhpcy5jdHguc2V0RmlsbFN0eWxlKGNvbG9yKTtcclxuICAgICAgICB0aGlzLmN0eC5zZXRGb250U2l6ZShmb250U2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICghYnJlYWtXb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGNvbnRlbnQsIGxlZnQsIHRvcCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1RleHRMaW5lKGxlZnQsIHRvcCwgdGV4dERlY29yYXRpb24sIGNvbG9yLCBmb250U2l6ZSwgY29udGVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZpbGxUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IGZpbGxUb3AgPSB0b3A7XHJcbiAgICAgICAgICAgIGxldCBsaW5lTnVtID0gMTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsVGV4dCArPSBbY29udGVudFtpXV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdHgubWVhc3VyZVRleHQoZmlsbFRleHQpLndpZHRoID4gd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGluZU51bSA9PT0gTWF4TGluZU51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gY29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxUZXh0ID0gYCR7ZmlsbFRleHQuc3Vic3RyaW5nKDAsIGZpbGxUZXh0Lmxlbmd0aCAtIDEpfS4uLmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChmaWxsVGV4dCwgbGVmdCwgZmlsbFRvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZXh0TGluZShsZWZ0LCBmaWxsVG9wLCB0ZXh0RGVjb3JhdGlvbiwgY29sb3IsIGZvbnRTaXplLCBmaWxsVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChmaWxsVGV4dCwgbGVmdCwgZmlsbFRvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGV4dExpbmUobGVmdCwgZmlsbFRvcCwgdGV4dERlY29yYXRpb24sIGNvbG9yLCBmb250U2l6ZSwgZmlsbFRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmaWxsVG9wICs9IGxpbmVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZU51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGZpbGxUZXh0LCBsZWZ0LCBmaWxsVG9wKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3VGV4dExpbmUobGVmdCwgZmlsbFRvcCwgdGV4dERlY29yYXRpb24sIGNvbG9yLCBmb250U2l6ZSwgZmlsbFRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xyXG5cclxuICAgICAgICBpZiAoYm9sZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1RleHQoe1xyXG4gICAgICAgICAgICAgICAgLi4ucGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdCArIDAuMyxcclxuICAgICAgICAgICAgICAgIHRvcDogdG9wICsgMC4zLFxyXG4gICAgICAgICAgICAgICAgYm9sZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiBcIm5vbmVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGV4dExpbmUobGVmdCwgdG9wLCB0ZXh0RGVjb3JhdGlvbiwgY29sb3IsIGZvbnRTaXplLCBjb250ZW50KSB7XHJcbiAgICAgICAgaWYgKHRleHREZWNvcmF0aW9uID09PSBcInVuZGVybGluZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlY3Qoe1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogY29sb3IsXHJcbiAgICAgICAgICAgICAgICB0b3A6IHRvcCArIGZvbnRTaXplICogMS4yLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdCAtIDEsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5jdHgubWVhc3VyZVRleHQoY29udGVudCkud2lkdGggKyAzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGV4dERlY29yYXRpb24gPT09IFwibGluZS10aHJvdWdoXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UmVjdCh7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvcixcclxuICAgICAgICAgICAgICAgIHRvcDogdG9wICsgZm9udFNpemUgKiAwLjYsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0IC0gMSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmN0eC5tZWFzdXJlVGV4dChjb250ZW50KS53aWR0aCArIDMsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1JlY3QocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZCxcclxuICAgICAgICAgICAgdG9wID0gMCxcclxuICAgICAgICAgICAgbGVmdCA9IDAsXHJcbiAgICAgICAgICAgIHdpZHRoID0gMCxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gMFxyXG4gICAgICAgIH0gPSBwYXJhbXM7XHJcbiAgICAgICAgdGhpcy5jdHguc2V0RmlsbFN0eWxlKGJhY2tncm91bmQpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZ2V0SW1hZ2VJbmZvKHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlW3VybF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBvYmpFeHAgPSBuZXcgUmVnRXhwKC9eaHR0cChzKT86XFwvXFwvKFtcXHctXStcXC4pK1tcXHctXSsoXFwvW1xcdy0gLlxcLz8lJj1dKik/Lyk7XHJcbiAgICAgICAgICAgIGlmIChvYmpFeHAudGVzdCh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB3ZXB5LmdldEltYWdlSW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB1cmxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwiZ2V0SW1hZ2VJbmZvOm9rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlW3VybF0gPSByZXMucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnBhdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJnZXRJbWFnZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyck1zZzogXCJjYW52YXNkcmF3ZXI6ZG93bmxvYWQgZmFpbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcImdldEltYWdlSW5mbyBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVt1cmxdID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFzeW5jIHNhdmVJbWFnZVRvTG9jYWwoKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgd2VweS5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGNhbnZhc0lkOiBcImNhbnZhc2RyYXdlclwiXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwiY2FudmFzVG9UZW1wRmlsZVBhdGg6b2tcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDYW52YXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc1BhaW50aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudGVtcEZpbGVMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJnZXRJbWFnZVwiLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBlcnJNc2c6IFwiY2FudmFzZHJhd2VyOm9rXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdChcImdldEltYWdlXCIsIHtcclxuICAgICAgICAgICAgICAgIGVyck1zZzogXCJjYW52YXNkcmF3ZXI6ZmFpbFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKFwiY2FudmFzZHJhd2VyX3BpY19jYWNoZVwiKTtcclxuICAgICAgICB0aGlzLmNhY2hlID0gd2VweS5nZXRTdG9yYWdlU3luYyhcImNhbnZhc2RyYXdlcl9waWNfY2FjaGVcIikgfHwge307XHJcbiAgICAgICAgdGhpcy5jdHggPSB3ZXB5LmNyZWF0ZUNhbnZhc0NvbnRleHQoXCJjYW52YXNkcmF3ZXJcIiwgdGhpcyk7XHJcbiAgICB9XHJcbn1cclxuIl19