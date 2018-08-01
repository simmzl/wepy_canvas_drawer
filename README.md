# wepy_canvas_drawer

把 `src/components/canvasdrawer` 组件移动到 `wepy` 项目的 `components` 目录下

在调用页面引入

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

就可以直接在 `wepy` 项目页面中使用 `wepy_canvas_drawer`
```html
<image src="{{shareImage}}" class="share-image"></image>
<canvasdrawer :painting.sync="painting" @getImage.user="eventGetImage"></canvasdrawer>
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build:dev

# build for production and view the bundle analyzer report
npm run build --report
```
