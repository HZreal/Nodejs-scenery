// 一个普通类型，在赋值过程中改变类型是不被允许
// let myFavoriteNumber: string = "seven";
// myFavoriteNumber = 7;      // error
// 如果是 any 类型，则允许被赋值为任意类型。
let myFavoriteNumber1: any = "seven";
myFavoriteNumber1 = 7;

let anyThing: any = "hello";
console.log(anyThing.myName);

// 自动类型推断
let myFavoriteNumber2 = "seven"; // 自动识别为string类型
// myFavoriteNumber2 = 7;          // error

// 联合类型（Union Types）表示取值可以为多种类型中的一种
let myFavoriteNumber3: string | number;
myFavoriteNumber3 = "seven";
myFavoriteNumber3 = 7;
// myFavoriteNumber3 = true;           // error

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): any {
  //   return something.length; // error，因为number类型不存在length方法
}
// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
// console.log(myFavoriteNumber.length);   // 编译时error

// 接口（Interfaces）是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
// TypeScript 中的接口除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
// 定义的变量比接口少了一些属性是不允许的;多一些属性也是不允许的，即赋值的时候，变量的形状必须和接口的形状保持一致
interface Person1 {
  name1: string;
  age1: number;
}

let tom1: Person1 = {
  name1: "Tom",
  age1: 25,
};

// 可选属性
// 若不需要完全匹配一个形状，那么可以用可选属性
interface Person2 {
  name2: string;
  age2?: number;
}

let tom2: Person2 = {
  name2: "Tom",
  // age2: 22          // 可有可无
};

// 若需要一个接口允许有任意的属性，可以使用如下方式
interface Person3 {
  name3: string;
  age3?: number;
  [propName: string]: any; // 可添加一个未知属性,string类型
}

let tom3: Person3 = {
  name3: "Tom",
  gender3: "male",
};

// 注意: 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person4 {
  name4: string;
  //   age4?: number; // error，可选属性age4的类型number不是string类型的子集
  [propName4: string]: string; // 定义了任意属性
}

let tomf: Person4 = {
  name4: "Tom",
  //   age4: 25,
  gender4: "male",
};

// 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
interface Person5 {
  name5: string;
  [propName5: string]: string | number;
}

let tom5: Person5 = {
  name5: "Tom",
  gender5: "male",
};

// 接口中的只读属性
interface Person6 {
  readonly id6: number;
  name6: string;
  age6?: number;
  [propName6: string]: any;
}

let tom6: Person6 = {
  id6: 89757,
  name6: "Tom",
  gender6: "male",
};

// tom6.id6 = 9527;      // error

// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

// 数组
// 用「类型 + 方括号」来表示数组, 数组的项中不允许出现其他的类型
let fibonacci1: number[] = [1, 1, 2, 3, 5];
// 用使用数组泛型（Array Generic） Array<elemType> 来表示数组
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];
// 用接口表示数组，比前两种方式复杂得多
interface NumberArray3 {
  [index: number]: number;
}
let fibonacci3: NumberArray3 = [1, 1, 2, 3, 5];
// 类数组（Array-like Object）不是数组类型
function sum1() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

// 用 any 表示数组中允许出现任意类型
let list: any[] = ["xcatliu", 25, { website: "http://hello.com" }];

// 函数
// 函数声明（Function Declaration）和函数表达式（Function Expression）
// 函数声明（Function Declaration）
function sum2(x: number, y: number): number {
  return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
  return x + y;
};

// 不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// ES6 中的 => 去掉function关键字定义函数

// 用接口定义函数需要符合的形状
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};

// 可选参数， 用 ? 表示可选的参数，注意：可选参数必须接在必需参数后面，即可选参数后面不允许再出现必需参数
// TypeScript 会将添加了默认值的参数nickName识别为可选参数，此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName(
  firstName: string,
  lastName?: string,
  nickName: string = "jack"
) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");

// 剩余参数
// ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）
// 注意，rest 参数只能是最后一个参数
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);

// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
// 使用重载定义多个 reverse 的函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
// 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

// 断言
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  return animal.name;
}

// 有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法
// 注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}
