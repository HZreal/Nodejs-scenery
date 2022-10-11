## 模块化规范

运行ES6模块时，需要在package.json文件中添加"type":"module",并且在引入时路径中不能省略文件后缀名；

运行CommonJS时，需要在package.json文件中添加"type":"commonjs"，在引入路径时可以省略文件后缀名

### 1.ES6模块化（静态加载，编译时加载)

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

#### ES6模块化语法

-  **export**命令用于规定模块的对外接口，即模块的暴露
-  **import**命令用于输入其他模块提供的功能，即模块的导入。

①单个属性的导出、导入

```js
// hello.js           暴露模块
export let a = 1;
export function count(){
  console.log(++a);
}
```

```javascript
// index.js           引入模块
import {a, count} from './hello.js'
console.log(a)   //  1   
count()        //  2
```

②列表和重命名的导出、导入

```javascript
// hello.js          暴露模块
let firstName = "liu"
let lastName = "kaka"
//列表导出
export {firstName , lastName}
//重命名导出
export { firstName as first, lastName as last}

```

```javascript
//index.js           引入模块  
//列表方式引入
import { firstName, lastName } from "./hello.js";
console.log("列表" + firstName, lastName);        //列表 liu kaka
//重命名引入
import { first, last } from "./hello.js";
console.log("重命名" + first, last);              //重命名 liu kaka
```

③默认导出

使用import命令的时候，我们需要知道所要加载的变量名或函数名，否则无法加载。为了方便，能使我们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

模块内部的默认导出，有且只能有一个

```javascript
//文件名 hello.js   模块暴露
export default function foo(){                         
    console.log("default 默认导出");
}
```

```javascript
//文件名 index.js   引入默认导出的模块
import func from "./hello.js"        // 这里的func可自定义名称，可以任意变量名来接收这个模块
func()        // default  默认导出

```

④导入所有模块

```javascript
//文件名 index.js
import * as hello from './hello.js';        // as 后面取别名，自定义的变量名来接收
console.log(hello);                        
// 打印结果 [Module: null prototype] {
	a: 1,
    count: [Function: count],
    default: [Function: default],
    first: 'liu',
    firstName: 'liu',
    last: 'kaka',
    lastName: 'kaka'
}
```

⑤ 运行模块

类似于script标签的导入形式

```javascript
//文件名 index.js
import "./hello.js"            //可以运行hello.js中的js代码
```

### 2.CommonJS(运行时加载)

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

CommonJS 模块的特点：

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存
- 模块加载的顺序，按照其在代码中出现的顺序

```javascript
// 导出   文件名  b.js
let a =1;
let add = () => {
    ++a
}
module.exports = {
    a,
    add
}
```

```javascript
// 导入     文件名  index.js      
// 要运用 require() 命令
let obj = require('./modules/b')
console.log(obj);

//对象的解构形式         
let {a, add} = require('./modules/b')
console.log(a, add);
```

差异：

  ① CommonJS 模块输出的是一个值的拷贝(理解起来类似于值传递)，ES6 模块输出的是值的引用(理解起来类似于引用传递)。

  ② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。


在package.json中指定加载模块方式：

- type字段的产生用于定义package.json文件和该文件所在目录根目录中，.js文件和无拓展名文件的处理方式。

  值为'moduel'则当作es模块处理；

  值为'commonjs'则被当作commonJs模块处理

- 目前node默认的是如果pacakage.json没有定义type字段，则按照commonJs规范处理

- node官方建议包的开发者明确指定package.json中type字段的值

- 无论package.json中的type字段为何值，.mjs的文件都按照es模块来处理，.cjs的文件都按照commonJs模块来处理