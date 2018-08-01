'use strict';

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
                console.log(newVal, oldVal);
                if (!this.isPainting) {
                    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                        if (newVal && newVal.width && newVal.height) {
                            this.showCanvas = true;
                            this.isPainting = true;
                            this.$apply();
                            this.readyPigment();
                        }
                    } else {
                        if (newVal && newVal.mode !== 'same') {
                            this.$emit('getImage', {
                                errMsg: 'canvasdrawer:samme params'
                            });
                        }
                    }
                }
            }
        }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Drawer, [{
        key: 'readyPigment',
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
                    console.log("开始inter");
                    clearInterval(inter);
                    _this2.ctx.clearActions();
                    _this2.ctx.save();
                    _this2.getImageList(views);
                    _this2.downLoadImages(0);
                }
            }, 100);
        }
    }, {
        key: 'getImageList',
        value: function getImageList(views) {
            console.log("遍历json");
            var imageList = [];
            for (var i = 0; i < views.length; i++) {
                if (views[i].type === 'image') {
                    imageList.push(views[i].url);
                }
            }
            console.log('imageList:' + imageList + ',\u957F\u5EA6\uFF1A' + imageList.length);
            this.imageList = imageList;
        }
    }, {
        key: 'downLoadImages',
        value: function downLoadImages(index) {
            var _this3 = this;

            var imageList = this.imageList,
                tempFileList = this.tempFileList;

            if (index < imageList.length) {
                // console.log(imageList[index])
                this.getImageInfo(imageList[index]).then(function (file) {
                    console.log("获取了一张图片");
                    tempFileList.push(file);
                    _this3.tempFileList = tempFileList;
                    _this3.downLoadImages(index + 1);
                });
            } else {
                this.startPainting();
            }
        }
    }, {
        key: 'startPainting',
        value: function startPainting() {
            var _this4 = this;

            console.log("开始画了");
            var tempFileList = this.tempFileList,
                views = this.painting.views;

            for (var i = 0, imageIndex = 0; i < views.length; i++) {
                if (views[i].type === 'image') {
                    this.drawImage(_extends({}, views[i], {
                        url: tempFileList[imageIndex]
                    }));
                    imageIndex++;
                } else if (views[i].type === 'text') {
                    if (!this.ctx.measureText) {
                        _wepy2.default.showModal({
                            title: '提示',
                            content: '当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。'
                        });
                        this.$emit('getImage', {
                            errMsg: 'canvasdrawer:version too low'
                        });
                        return;
                    } else {
                        this.drawText(views[i]);
                    }
                } else if (views[i].type === 'rect') {
                    this.drawRect(views[i]);
                }
            }
            console.warn("循环完了，保存！");
            console.log(this.ctx);
            this.ctx.draw(false, function () {
                _wepy2.default.setStorageSync('canvasdrawer_pic_cache', _this4.cache);
                _this4.saveImageToLocal();
            });
        }
    }, {
        key: 'drawImage',
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
            // if (borderRadius) {
            //   this.ctx.beginPath()
            //   this.ctx.arc(left + borderRadius, top + borderRadius, borderRadius, 0, 2 * Math.PI)
            //   this.ctx.clip()
            //   this.ctx.drawImage(url, left, top, width, height)
            // } else {

            this.ctx.drawImage(url, left, top, width, height);
            // }
            this.ctx.restore();
            console.log("画了一张图");
        }
    }, {
        key: 'drawText',
        value: function drawText(params) {
            console.log("画文字了");
            this.ctx.save();
            var _params$MaxLineNumber = params.MaxLineNumber,
                MaxLineNumber = _params$MaxLineNumber === undefined ? 2 : _params$MaxLineNumber,
                _params$breakWord = params.breakWord,
                breakWord = _params$breakWord === undefined ? false : _params$breakWord,
                _params$color = params.color,
                color = _params$color === undefined ? 'black' : _params$color,
                _params$content = params.content,
                content = _params$content === undefined ? '' : _params$content,
                _params$fontSize = params.fontSize,
                fontSize = _params$fontSize === undefined ? 16 : _params$fontSize,
                _params$top2 = params.top,
                top = _params$top2 === undefined ? 0 : _params$top2,
                _params$left2 = params.left,
                left = _params$left2 === undefined ? 0 : _params$left2,
                _params$lineHeight = params.lineHeight,
                lineHeight = _params$lineHeight === undefined ? 20 : _params$lineHeight,
                _params$textAlign = params.textAlign,
                textAlign = _params$textAlign === undefined ? 'left' : _params$textAlign,
                width = params.width,
                _params$bolder = params.bolder,
                bolder = _params$bolder === undefined ? false : _params$bolder,
                _params$textDecoratio = params.textDecoration,
                textDecoration = _params$textDecoratio === undefined ? 'none' : _params$textDecoratio;


            this.ctx.beginPath();
            this.ctx.setTextBaseline('top');
            this.ctx.setTextAlign(textAlign);
            this.ctx.setFillStyle(color);
            this.ctx.setFontSize(fontSize);

            if (!breakWord) {
                this.ctx.fillText(content, left, top);
                this.drawTextLine(left, top, textDecoration, color, fontSize, content);
            } else {
                var fillText = '';
                var fillTop = top;
                var lineNum = 1;
                for (var i = 0; i < content.length; i++) {
                    fillText += [content[i]];
                    if (this.ctx.measureText(fillText).width > width) {
                        if (lineNum === MaxLineNumber) {
                            if (i !== content.length) {
                                fillText = fillText.substring(0, fillText.length - 1) + '...';
                                this.ctx.fillText(fillText, left, fillTop);
                                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
                                fillText = '';
                                break;
                            }
                        }
                        this.ctx.fillText(fillText, left, fillTop);
                        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
                        fillText = '';
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
                    textDecoration: 'none'
                }));
            }
        }
    }, {
        key: 'drawTextLine',
        value: function drawTextLine(left, top, textDecoration, color, fontSize, content) {
            console.log("画线");
            if (textDecoration === 'underline') {
                this.drawRect({
                    background: color,
                    top: top + fontSize * 1.2,
                    left: left - 1,
                    width: this.ctx.measureText(content).width + 3,
                    height: 1
                });
            } else if (textDecoration === 'line-through') {
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
        key: 'drawRect',
        value: function drawRect(params) {
            console.log("画矩形！");
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
        key: 'getImageInfo',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var objExp, res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log("获取图片信息");
                                // return new Promise((resolve, reject) => {

                                if (!this.cache[url]) {
                                    _context.next = 6;
                                    break;
                                }

                                console.error("缓存有了");
                                return _context.abrupt('return', this.cache[url]);

                            case 6:
                                console.log("调用wxapi");
                                objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);

                                if (!objExp.test(url)) {
                                    _context.next = 27;
                                    break;
                                }

                                console.log("开始调用wxapi");
                                console.log(url);
                                _context.next = 13;
                                return _wepy2.default.getImageInfo({
                                    src: url
                                    // complete: res => {
                                    //     console.log(`调用完成：${res}`);
                                    //     if (res.errMsg === 'getImageInfo:ok') {
                                    //         this.cache[url] = res.path;
                                    //         resolve(res.path);
                                    //     } else {
                                    //         this.$emit('getImage', {
                                    //             errMsg: 'canvasdrawer:download fail'
                                    //         })
                                    //         reject(new Error('getImageInfo fail'));
                                    //     }
                                    // }
                                });

                            case 13:
                                res = _context.sent;

                                if (!(res.errMsg === "getImageInfo:ok")) {
                                    _context.next = 20;
                                    break;
                                }

                                console.log("获取图片完成了");
                                this.cache[url] = res.path;
                                return _context.abrupt('return', res.path);

                            case 20:
                                console.log("获取图片失败了");
                                this.$emit('getImage', {
                                    errMsg: 'canvasdrawer:download fail'
                                });
                                return _context.abrupt('return', new Error('getImageInfo fail'));

                            case 23:
                                console.log('\u7528await');
                                console.log(res);
                                _context.next = 30;
                                break;

                            case 27:
                                console.log("不是链接什么意思");
                                this.cache[url] = url;
                                resolve(url);

                            case 30:
                            case 'end':
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
        key: 'saveImageToLocal',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var width, height, res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                console.log("画完保存临时文件");
                                width = this.width, height = this.height;
                                _context2.next = 4;
                                return _wepy2.default.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: width,
                                    height: height,
                                    canvasId: 'canvasdrawer'
                                }, this);

                            case 4:
                                res = _context2.sent;

                                if (res.errMsg === 'canvasToTempFilePath:ok') {
                                    this.showCanvas = false;
                                    this.isPainting = false;
                                    this.imageList = [];
                                    this.tempFileList = [];
                                    this.$apply();
                                    console.log("画完了，该给父组件回调了");
                                    this.$emit('getImage', {
                                        tempFilePath: res.tempFilePath,
                                        errMsg: 'canvasdrawer:ok'
                                    });
                                } else {
                                    console.log("画失败");
                                    this.$emit('getImage', {
                                        errMsg: 'canvasdrawer:fail'
                                    });
                                }

                            case 6:
                            case 'end':
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
        key: 'onLoad',
        value: function onLoad() {
            _wepy2.default.removeStorageSync('canvasdrawer_pic_cache');
            this.cache = _wepy2.default.getStorageSync('canvasdrawer_pic_cache') || {};
            this.ctx = _wepy2.default.createCanvasContext('canvasdrawer', this);
            console.log(this.ctx);
        }
    }]);

    return Drawer;
}(_wepy2.default.component);

exports.default = Drawer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdlci5qcyJdLCJuYW1lcyI6WyJEcmF3ZXIiLCJwcm9wcyIsInBhaW50aW5nIiwidHlwZSIsIk9iamVjdCIsImRlZmF1bHQiLCJkYXRhIiwic2hvd0NhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiaW5kZXgiLCJpbWFnZUxpc3QiLCJ0ZW1wRmlsZUxpc3QiLCJpc1BhaW50aW5nIiwiY3R4IiwiY2FjaGUiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiJGFwcGx5IiwicmVhZHlQaWdtZW50IiwibW9kZSIsIiRlbWl0IiwiZXJyTXNnIiwibWV0aG9kcyIsInZpZXdzIiwiaW50ZXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJjbGVhckFjdGlvbnMiLCJzYXZlIiwiZ2V0SW1hZ2VMaXN0IiwiZG93bkxvYWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsInVybCIsImdldEltYWdlSW5mbyIsInRoZW4iLCJmaWxlIiwic3RhcnRQYWludGluZyIsImltYWdlSW5kZXgiLCJkcmF3SW1hZ2UiLCJtZWFzdXJlVGV4dCIsIndlcHkiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJkcmF3VGV4dCIsImRyYXdSZWN0Iiwid2FybiIsImRyYXciLCJzZXRTdG9yYWdlU3luYyIsInNhdmVJbWFnZVRvTG9jYWwiLCJwYXJhbXMiLCJ0b3AiLCJsZWZ0IiwiYm9yZGVyUmFkaXVzIiwicmVzdG9yZSIsIk1heExpbmVOdW1iZXIiLCJicmVha1dvcmQiLCJjb2xvciIsImZvbnRTaXplIiwibGluZUhlaWdodCIsInRleHRBbGlnbiIsImJvbGRlciIsInRleHREZWNvcmF0aW9uIiwiYmVnaW5QYXRoIiwic2V0VGV4dEJhc2VsaW5lIiwic2V0VGV4dEFsaWduIiwic2V0RmlsbFN0eWxlIiwic2V0Rm9udFNpemUiLCJmaWxsVGV4dCIsImRyYXdUZXh0TGluZSIsImZpbGxUb3AiLCJsaW5lTnVtIiwic3Vic3RyaW5nIiwiYmFja2dyb3VuZCIsImZpbGxSZWN0IiwiZXJyb3IiLCJvYmpFeHAiLCJSZWdFeHAiLCJ0ZXN0Iiwic3JjIiwicmVzIiwicGF0aCIsIkVycm9yIiwicmVzb2x2ZSIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwieCIsInkiLCJjYW52YXNJZCIsInRlbXBGaWxlUGF0aCIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiZ2V0U3RvcmFnZVN5bmMiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNJOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBRWpCQyxLLEdBQVE7QUFDSkMsc0JBQVU7QUFDTkMsc0JBQU1DLE1BREE7QUFFTkMseUJBQVM7QUFGSDtBQUROLFMsUUFPUkMsSSxHQUFPO0FBQ0hDLHdCQUFZLEtBRFQ7O0FBR0hDLG1CQUFPLEdBSEo7QUFJSEMsb0JBQVEsR0FKTDs7QUFNSEMsbUJBQU8sQ0FOSjtBQU9IQyx1QkFBVyxFQVBSO0FBUUhDLDBCQUFjLEVBUlg7O0FBVUhDLHdCQUFZLEtBVlQ7QUFXSEMsaUJBQUssSUFYRjtBQVlIQyxtQkFBTztBQVpKLFMsUUFlUEMsSyxHQUFRO0FBQ0pkLG9CQURJLG9CQUNLZSxNQURMLEVBQ2FDLE1BRGIsRUFDcUI7QUFDckJDLHdCQUFRQyxHQUFSLENBQVlILE1BQVosRUFBb0JDLE1BQXBCO0FBQ0Esb0JBQUksQ0FBQyxLQUFLTCxVQUFWLEVBQXNCO0FBQ2xCLHdCQUFJUSxLQUFLQyxTQUFMLENBQWVMLE1BQWYsTUFBMkJJLEtBQUtDLFNBQUwsQ0FBZUosTUFBZixDQUEvQixFQUF1RDtBQUNuRCw0QkFBSUQsVUFBVUEsT0FBT1QsS0FBakIsSUFBMEJTLE9BQU9SLE1BQXJDLEVBQTZDO0FBQ3pDLGlDQUFLRixVQUFMLEdBQWtCLElBQWxCO0FBQ0EsaUNBQUtNLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxpQ0FBS1UsTUFBTDtBQUNBLGlDQUFLQyxZQUFMO0FBQ0g7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IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHByb3BzID0ge1xyXG4gICAgICAgICAgICBwYWludGluZzoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHNob3dDYW52YXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXHJcblxyXG4gICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgaW1hZ2VMaXN0OiBbXSxcclxuICAgICAgICAgICAgdGVtcEZpbGVMaXN0OiBbXSxcclxuXHJcbiAgICAgICAgICAgIGlzUGFpbnRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjdHg6IG51bGwsXHJcbiAgICAgICAgICAgIGNhY2hlOiB7fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdhdGNoID0ge1xyXG4gICAgICAgICAgICBwYWludGluZyhuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3VmFsLCBvbGRWYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGFpbnRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsKSAhPT0gSlNPTi5zdHJpbmdpZnkob2xkVmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsICYmIG5ld1ZhbC53aWR0aCAmJiBuZXdWYWwuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDYW52YXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BhaW50aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWR5UGlnbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCAmJiBuZXdWYWwubW9kZSAhPT0gJ3NhbWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRJbWFnZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJNc2c6ICdjYW52YXNkcmF3ZXI6c2FtbWUgcGFyYW1zJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0aG9kcyA9IHt9O1xyXG4gICAgICAgIHJlYWR5UGlnbWVudCgpIHtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB2aWV3c1xyXG4gICAgICAgICAgICB9ID0gdGhpcy5wYWludGluZztcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4tpbnRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5jbGVhckFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRJbWFnZUxpc3Qodmlld3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkxvYWRJbWFnZXMoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldEltYWdlTGlzdCh2aWV3cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumBjeWOhmpzb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld3NbaV0udHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlTGlzdC5wdXNoKHZpZXdzW2ldLnVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgaW1hZ2VMaXN0OiR7aW1hZ2VMaXN0fSzplb/luqbvvJoke2ltYWdlTGlzdC5sZW5ndGh9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VMaXN0ID0gaW1hZ2VMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb3duTG9hZEltYWdlcyhpbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUxpc3QsXHJcbiAgICAgICAgICAgICAgICB0ZW1wRmlsZUxpc3RcclxuICAgICAgICAgICAgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGltYWdlTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEltYWdlSW5mbyhpbWFnZUxpc3RbaW5kZXhdKS50aGVuKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5LqG5LiA5byg5Zu+54mHXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBGaWxlTGlzdC5wdXNoKGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcEZpbGVMaXN0ID0gdGVtcEZpbGVMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkxvYWRJbWFnZXMoaW5kZXggKyAxKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQYWludGluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXJ0UGFpbnRpbmcoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL55S75LqGXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRmlsZUxpc3QsXHJcbiAgICAgICAgICAgICAgICBwYWludGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaW1hZ2VJbmRleCA9IDA7IGkgPCB2aWV3cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdzW2ldLnR5cGUgPT09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnZpZXdzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRlbXBGaWxlTGlzdFtpbWFnZUluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlld3NbaV0udHlwZSA9PT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN0eC5tZWFzdXJlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55SoIG1lYXN1cmVUZXh0IOWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0SW1hZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJNc2c6ICdjYW52YXNkcmF3ZXI6dmVyc2lvbiB0b28gbG93J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RleHQodmlld3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlld3NbaV0udHlwZSA9PT0gJ3JlY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UmVjdCh2aWV3c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5b6q546v5a6M5LqG77yM5L+d5a2Y77yBXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN0eCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXcoZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2NhbnZhc2RyYXdlcl9waWNfY2FjaGUnLCB0aGlzLmNhY2hlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUltYWdlVG9Mb2NhbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd0ltYWdlKHBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zYXZlKClcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgdG9wID0gMCxcclxuICAgICAgICAgICAgICAgIGxlZnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggPSAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMCxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1cyA9IDBcclxuICAgICAgICAgICAgfSA9IHBhcmFtcztcclxuICAgICAgICAgICAgLy8gaWYgKGJvcmRlclJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXHJcbiAgICAgICAgICAgIC8vICAgdGhpcy5jdHguYXJjKGxlZnQgKyBib3JkZXJSYWRpdXMsIHRvcCArIGJvcmRlclJhZGl1cywgYm9yZGVyUmFkaXVzLCAwLCAyICogTWF0aC5QSSlcclxuICAgICAgICAgICAgLy8gICB0aGlzLmN0eC5jbGlwKClcclxuICAgICAgICAgICAgLy8gICB0aGlzLmN0eC5kcmF3SW1hZ2UodXJsLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpXHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh1cmwsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUu+S6huS4gOW8oOWbvlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd1RleHQocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55S75paH5a2X5LqGXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIE1heExpbmVOdW1iZXIgPSAyLFxyXG4gICAgICAgICAgICAgICAgYnJlYWtXb3JkID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gJycsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZSA9IDE2LFxyXG4gICAgICAgICAgICAgICAgdG9wID0gMCxcclxuICAgICAgICAgICAgICAgIGxlZnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodCA9IDIwLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBib2xkZXIgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uID0gJ25vbmUnXHJcbiAgICAgICAgICAgIH0gPSBwYXJhbXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc2V0VGV4dEJhc2VsaW5lKCd0b3AnKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc2V0VGV4dEFsaWduKHRleHRBbGlnbik7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnNldEZpbGxTdHlsZShjb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnNldEZvbnRTaXplKGZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYnJlYWtXb3JkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChjb250ZW50LCBsZWZ0LCB0b3ApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGV4dExpbmUobGVmdCwgdG9wLCB0ZXh0RGVjb3JhdGlvbiwgY29sb3IsIGZvbnRTaXplLCBjb250ZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWxsVGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbGxUb3AgPSB0b3A7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluZU51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWxsVGV4dCArPSBbY29udGVudFtpXV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3R4Lm1lYXN1cmVUZXh0KGZpbGxUZXh0KS53aWR0aCA+IHdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lTnVtID09PSBNYXhMaW5lTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gY29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsVGV4dCA9IGZpbGxUZXh0LnN1YnN0cmluZygwLCBmaWxsVGV4dC5sZW5ndGggLSAxKSArICcuLi4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGZpbGxUZXh0LCBsZWZ0LCBmaWxsVG9wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZXh0TGluZShsZWZ0LCBmaWxsVG9wLCB0ZXh0RGVjb3JhdGlvbiwgY29sb3IsIGZvbnRTaXplLCBmaWxsVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChmaWxsVGV4dCwgbGVmdCwgZmlsbFRvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RleHRMaW5lKGxlZnQsIGZpbGxUb3AsIHRleHREZWNvcmF0aW9uLCBjb2xvciwgZm9udFNpemUsIGZpbGxUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFRvcCArPSBsaW5lSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoZmlsbFRleHQsIGxlZnQsIGZpbGxUb3ApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGV4dExpbmUobGVmdCwgZmlsbFRvcCwgdGV4dERlY29yYXRpb24sIGNvbG9yLCBmb250U2l6ZSwgZmlsbFRleHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYm9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5wYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCArIDAuMyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIDAuMyxcclxuICAgICAgICAgICAgICAgICAgICBib2xkZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3VGV4dExpbmUobGVmdCwgdG9wLCB0ZXh0RGVjb3JhdGlvbiwgY29sb3IsIGZvbnRTaXplLCBjb250ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55S757q/XCIpO1xyXG4gICAgICAgICAgICBpZiAodGV4dERlY29yYXRpb24gPT09ICd1bmRlcmxpbmUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvcixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIGZvbnRTaXplICogMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQgLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmN0eC5tZWFzdXJlVGV4dChjb250ZW50KS53aWR0aCArIDMsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXh0RGVjb3JhdGlvbiA9PT0gJ2xpbmUtdGhyb3VnaCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JlY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdG9wICsgZm9udFNpemUgKiAwLjYsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KGNvbnRlbnQpLndpZHRoICsgMyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYXdSZWN0KHBhcmFtcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUu+efqeW9ou+8gVwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgdG9wID0gMCxcclxuICAgICAgICAgICAgICAgIGxlZnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggPSAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMFxyXG4gICAgICAgICAgICB9ID0gcGFyYW1zO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zZXRGaWxsU3R5bGUoYmFja2dyb3VuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXN5bmMgZ2V0SW1hZ2VJbmZvKHVybCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWbvueJh+S/oeaBr1wiKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVbdXJsXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIue8k+WtmOacieS6hlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW3VybF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiwg+eUqHd4YXBpXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqRXhwID0gbmV3IFJlZ0V4cCgvXmh0dHAocyk/OlxcL1xcLyhbXFx3LV0rXFwuKStbXFx3LV0rKFxcL1tcXHctIC5cXC8/JSY9XSopPy8pXHJcbiAgICAgICAgICAgICAgICBpZiAob2JqRXhwLnRlc3QodXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL6LCD55Sod3hhcGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXJsKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB3ZXB5LmdldEltYWdlSW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbXBsZXRlOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coYOiwg+eUqOWujOaIkO+8miR7cmVzfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdnZXRJbWFnZUluZm86b2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jYWNoZVt1cmxdID0gcmVzLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmVzb2x2ZShyZXMucGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEltYWdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBlcnJNc2c6ICdjYW52YXNkcmF3ZXI6ZG93bmxvYWQgZmFpbCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEltYWdlSW5mbyBmYWlsJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwiZ2V0SW1hZ2VJbmZvOm9rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5blm77niYflrozmiJDkuoZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IHJlcy5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5blm77niYflpLHotKXkuoZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEltYWdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiAnY2FudmFzZHJhd2VyOmRvd25sb2FkIGZhaWwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2dldEltYWdlSW5mbyBmYWlsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDnlKhhd2FpdGApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiN5piv6ZO+5o6l5LuA5LmI5oSP5oCdXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbdXJsXSA9IHVybDtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgYXN5bmMgc2F2ZUltYWdlVG9Mb2NhbCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlLvlrozkv53lrZjkuLTml7bmlofku7ZcIik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB3ZXB5LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBjYW52YXNJZDogJ2NhbnZhc2RyYXdlcidcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAnY2FudmFzVG9UZW1wRmlsZVBhdGg6b2snKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDYW52YXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQYWludGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcEZpbGVMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlLvlrozkuobvvIzor6Xnu5nniLbnu4Tku7blm57osIPkuoZcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRJbWFnZScsIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiAnY2FudmFzZHJhd2VyOm9rJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUu+Wksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEltYWdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGVyck1zZzogJ2NhbnZhc2RyYXdlcjpmYWlsJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb25Mb2FkKCkge1xyXG4gICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCdjYW52YXNkcmF3ZXJfcGljX2NhY2hlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjYW52YXNkcmF3ZXJfcGljX2NhY2hlJykgfHwge307XHJcbiAgICAgICAgICAgIHRoaXMuY3R4ID0gd2VweS5jcmVhdGVDYW52YXNDb250ZXh0KCdjYW52YXNkcmF3ZXInLCB0aGlzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19