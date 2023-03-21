async function main() { 
try {
  const a = await bbb('c');
  console.log(a);
  
}catch(err) {
 console.log(11111111111);
}
}


async function bbb(c){
 try {
  // 数据库查询c
   throw new Error();
 } catch (err) {
   console.log(2222222);
  return null
}
}

main();