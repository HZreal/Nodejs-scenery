import moment from 'moment';


const nowDate = new Date()
console.log('nowDate  ------>  ', nowDate);

const nowMoment = moment()
console.log('nowMoment  ------>  ', nowMoment);




const timestamp = 1646182619999.9973

const date = new Date(timestamp)  
console.log('date  ------>  ', date);      // 未补时区
const toString = date.toString()
const ISOString = date.toISOString()
console.log('toString ---->  ', toString)    // 补时区的时间  GMT+0800 (中国标准时间)
console.log('ISOString ---->  ', ISOString)


const momentObj = moment(timestamp)
console.log('momentObj  ------>  ', momentObj);   // 补时区的时间
console.log('format ---->  ', momentObj.format('YYYY-MM-DD HH:mm:ss.SSS'))   // 补时区的时间  GMT+0800 (中国标准时间)
console.log('toString ---->  ', momentObj.toString())  // 补时区的时间  GMT+0800 (中国标准时间)
console.log('ISOString ---->  ', momentObj.toISOString())



// UTC与本地时间之间的时差(以分钟为单位)
const diff = new Date().getTimezoneOffset()
console.log('当前是东八区，相差8h，也就是480分钟  ------>  ', diff);


