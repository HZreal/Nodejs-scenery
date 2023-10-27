// ES6之前，由于JS中没有类的概念（在ES6的时候引入了class，但其也只是语法糖），在实际开发中想要将所有的对象关联起来就成了问题，于是原型和原型链的概念应运而生。
// 原型可以理解为是一个JS方法的属性，每次在创建函数方法的时候，JS会将一个名字为prototype的属性添加到函数方法上，这个prototype就是该函数方法的原型对象，它默认有一个constructor的属性指向原来方法的对象，任何添加到prototype的属性和方法都在这个constructor里面，所有同类的实例会共享这个原型对象，实例对象__proto__属性指向这个对象，方法的prototype属性指向这个对象。


const obj = {a: 1, b: 'abc'}
// __proto__属性
// hasOwnProperty方法
// getPrototypeOf()
// setPrototypeOf()


// 原型链


// JS中实现类的继承（ES6以前）分为两步：继承构造函数中的属性和方法（构造函数继承）；继承对象原型中的属性和方法（原型链继承）。
// ES6以后的继承，可利用class关键字结合extends关键字来实现继承。ES6中引入了class关键字来声明类， 而class（类）可通过extends来继承父类中属性和方法，语法为“class 子类名 extends 父类名{...};”。