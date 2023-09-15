import {MongoClient} from 'mongodb'

// Connection URL
// const url = 'mongodb://127.0.0.1:27017/test';
const url = 'mongodb://192.168.19.128:27017/'


// 实例化链接对象
const client = new MongoClient(url);


// 实例对象connect连接
// client.connect((err) => {
//   if (err) {
//     console.log('数据库连接失败....')
//   } else {
//     console.log('数据库连接成功....')
//     client.close();
//   }
// })

async function insertMany() {
  const db = client.db('test')
  const coll = db.collection('coll')

  let docs = [
    {name: 'Chris',   age: 24, city: '北京市'},
    {name: 'Wilson',  age: 26, city: '南京市'},
    {name: 'Alan',    age: 22, city: '重庆市'},
    {name: 'Jimmy',   age: 21, city: '杭州市'},
    {name: 'Elvis',   age: 20, city: '长沙市'},
    {name: 'Danny',   age: 18, city: '合肥市'},
  ]

  const res = await coll.insertMany(docs)
  console.log('insert many -->  ', res)

}

insertMany()









