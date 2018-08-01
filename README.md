# wepy_canvas_drawer

> 基于[kuckboy1994](https://github.com/kuckboy1994)的[mp_canvas_drawer](https://github.com/kuckboy1994/mp_canvas_drawer)开发的wepy版本

> mpvue版本：[mpvue_canvas_drawer](https://github.com/kuckboy1994/mpvue_canvas_drawer)

## 使用

把 `src/components/canvasdrawer` 组件移动到 `wepy` 项目的 `components` 目录下

在调用页面内引入

```javascript
// 路径根据结构自定义
import canvasdrawer from "@/components/canvasdrawer/canvasdrawer";
```

注册组件：

```javascript
export default {
    components = {
        canvasdrawer
    };
}
```

使用组件
```html
<image src="{{shareImage}}" class="share-image"></image>
<canvasdrawer :painting.sync="painting" @getImage.user="eventGetImage"></canvasdrawer>
```

API及说明可参考：
[掘金：一个json帮你完成分享朋友圈图片](https://juejin.im/post/5b481d216fb9a04fdb16a88f)

## Build Setup

``` bash
npm install

npm run dev

npm run build:dev
```
