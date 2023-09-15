// beCalled.js           暴露模块，供调用


// 单个属性的导出
export let a = 1;
export function count(){
    console.log(++a);
}


let firstName = "liu"
let lastName = "kaka"
//列表导出
export {firstName , lastName}
//重命名导出
export { firstName as first, lastName as last}


// 默认导出
export default function foo(){
    console.log("default 默认导出");
}












