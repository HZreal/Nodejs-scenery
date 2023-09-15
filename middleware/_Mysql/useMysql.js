// 1. 引入mysql模块
import {mysql} from 'mysql'

// 2. 创建连接配置
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123456',
    database:'test'
})

// 3. 建立连接
conn.connect();

// 4. 准备sql语句
let sql = 'select * from stu';  // 查询语句
// let sql = 'insert into student values(null,"冉祎航",20,1,"计算机",2)'
// let sql = 'update student set age = 30 where id = 31'
// let sql = 'delete from student where id = 31'

// 5. 执行sql语句
conn.query(sql, (err, res) => {
    if(err){
        return err;
    }
    console.log('------------------------');
    console.log(res);
})

// 6. 结束连接；如果不再有sql被执行，一定要关闭连接，否则会一直占用资源
conn.end();

/*
对于增删改查而言，只有查询的语句，返回值是一个数据，包含所有查询结果，每一条记录是一条数据；
其他的返回的都是对象，affectRows表示受影响的行数，一般情况下通过该字段判断增删改的结果
*/
