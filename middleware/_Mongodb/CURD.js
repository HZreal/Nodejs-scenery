const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// 实例化链接对象
const client = new MongoClient(url);


// 实现插入数据的方法
function insertDocuments(db, callback) {
  // 获取操作数据库的集合
  const collection = db.collection('colle');
  // 通过集合对象来插入文档
  collection.insertMany([
    {name: 'Chris',   age: 24, city: '北京市'},
    {name: 'Wilson',  age: 26, city: '南京市'},
    {name: 'Alan',    age: 22, city: '重庆市'},
    {name: 'Jimmy',   age: 21, city: '杭州市'},
    {name: 'Elvis',   age: 20, city: '长沙市'},
    {name: 'Danny',   age: 18, city: '合肥市'},
  ], (err, res) => {
    if (err) {
      console.log('数据插入失败...')
     } else {
       console.log('数据插入成功...');
       callback(res)
     }
  })

}

// 删除数据
function delDocuments(db, callback) {
  const collection = db.collection('stu_db');
  collection.deleteOne({name:'Elvis'}, function(err, result) {
    if(err) {
      console.log('数据删除失败...')
    } else {
      console.log('数据删除成功...')
      callback(result)
    } 
  })
}

// 修改数据
function updateDocuments(db, callback) {
  // 获取操作数据库的集合
  const collection = db.collection('stu_db');
  collection.updateMany(
    {name: 'Alan'},
    {
      $set: {
        name: 'Lison'
      }
    },
    function (err, result) {
      if (err) {
        console.log('数据更新失败...')
      } else {
        console.log('数据更新成功...');
        callback(result)
      } 
    }
  )
}

// 查询数据
function findDocuments(db, callback) {
  // 获取操作数据库的集合
  const collection = db.collection('stu_db');
  collection.find({age: 20}).toArray(function(err, result){
    if(err) {
      console.log('数据查询失败...')
    } else {
      console.log('数据查询成功...');
      callback(result)
    }
  })
}

client.connect((err) => {
  if (err) {
    console.log('数据库连接失败....')
  } else {
    console.log('数据库连接成功....')
    const db = client.db('test');
    insertDocuments(db, (res) => {
      console.log(res);
    })
    client.close();
  }
})