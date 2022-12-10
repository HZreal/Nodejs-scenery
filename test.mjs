import moment from 'moment';


const SECONDS_IN_DAY = 24 * 60 * 60; // 一天的秒数
const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000; // 一天的毫秒数
const MAGIC_NUMBER_OF_DAYS = 25567 + 2;

const utc = new Date()
const timestamp = ('44622.0395833333' - MAGIC_NUMBER_OF_DAYS) * MISSING_LEAP_YEAR_DAY + utc.getTimezoneOffset() * 1000 * 60
console.log('timestamp  ------>  ', timestamp);  // 1646153819999.9973  小8h

// const timestamp = ('44622.0395833333' - MAGIC_NUMBER_OF_DAYS) * MISSING_LEAP_YEAR_DAY
// console.log('timestamp  ------>  ', timestamp);  // 1646182619999.9973
// console.log('timestamp 1 ------>  ', ('44622.0395833333' - MAGIC_NUMBER_OF_DAYS) * MISSING_LEAP_YEAR_DAY);  // 1646182619999.9973
// console.log('timestamp 2 ------>  ', ('44622.0395833333' - MAGIC_NUMBER_OF_DAYS) * MISSING_LEAP_YEAR_DAY + utc.getTimezoneOffset() * 1000 * 60);  // 1646182619999.9973
// console.log(utc.getTimezoneOffset(), utc.getTimezoneOffset() * 1000 * 60, 28800000 / 1000 / 60 / 60);  // 1646182619999.9973

// excel time-- > 时间戳 用


const date = new Date(timestamp)  
console.log('date  ------>  ', date);      // 未补时区
const toString = date.toString()
const ISOString = date.toISOString()
console.log('toString ---->  ', toString)    // 补时区的时间  GMT+0800 (中国标准时间)
console.log('ISOString ---->  ', ISOString)


const momentObj = moment(timestamp)
console.log('momentObj  ------>  ', momentObj);   // 补时区的时间
console.log(momentObj.format('YYYY-MM-DD HH:mm:ss'))   // 补时区的时间  GMT+0800 (中国标准时间)
console.log('toString ---->  ', momentObj.toString())  // 补时区的时间  GMT+0800 (中国标准时间)
console.log('ISOString ---->  ', momentObj.toISOString())
console.log('toLocaleString ---->  ', momentObj.toLocaleString())



const gg = new Date('2022-03-02T01:43:59.999Z')
console.log('gg  ------>  ', gg);     





