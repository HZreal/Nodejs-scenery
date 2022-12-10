import { ClickHouse } from 'clickhouse';
 


const clickhouse = new ClickHouse({
  url: 'http://192.168.19.128',
	port: 8123,
  basicAuth: {
    username: 'default',
    password: 'root123456',
  },
  config: {
		// session_id                              : 'session_id if neeed',
		session_timeout                         : 60,
		output_format_json_quote_64bit_integers : 0,
		enable_http_compression                 : 0,
		database                                : 'test',
	},
});


// await获取
async function createTable () {
  const queries = [
    'DROP TABLE IF EXISTS session_temp',
  
    `CREATE TABLE session_temp (
      date Date,
      time DateTime,
      mark String,
      ips Array(UInt32),
      queries Nested (
        act String,
        id UInt32
      )
    )
    ENGINE=MergeTree(date, (mark, time), 8192)`,
  
  ];

  for(const query of queries) {
    const r = await clickhouse.query(query).toPromise();
    console.log('执行结果是---->  ', r);
  }
  
}
// createTable()


// 回调形式
async function queryWithCallback() {
  const query = 'select * from tb_article'
  clickhouse.query(query).exec(async (err, rows) => {
    if (err) {
      console.log("🚀 ~ file: toClickhouse.js ~ line 51 ~ clickhouse.query ~ err", err)
    } else {
      console.log("🚀 ~ file: toClickhouse.js ~ line 53 ~ clickhouse.query ~ rows", rows)
      return rows
    }
  });
  
}
// queryWithCallback()


// 流获取，通过事件监听/回调
async function queryWithEventStream() {

  clickhouse.query(`SELECT * FROM test.numbers LIMIT 10`).stream()
	.on('data', function() {
		const stream = this;

		stream.pause();

		setTimeout(() => {
			stream.resume();
		}, 1000);
	})
	.on('error', err => {
		
	})
	.on('end', () => {
		
	});
}
// queryWithEventStream()


// async&await方式，等待获取所有
async function queryWithAsyncWay () {
  const sql = 'select * from tb_article'
  const rows = await clickhouse.query(sql).toPromise();
  console.log("🚀 ~ file: toClickhouse.js ~ line 91 ~ asyncWay ~ rows", rows)
  return rows
}
// queryWithAsyncWay()


// 流获取，await
async function queryWithAsyncStreamm () {
  const sql = 'select * from tb_article'
  let rows = []
  for await (const row of clickhouse.query(sql).stream()) {
    console.log('row ------>   ', row);
    rows.push(row)
  }
}
queryWithAsyncStreamm()



   // 查询多个sql
   async function multiQueryWithAsyncStreamm() {
    const client = this.connectClickhouse()

    const queries = [
      'select * from tb_article limit 2',
      'select * from tb_article',
    ]

    let res = {}
    for(const sql of queries) {
      let rows = []
      for await (const row of client.query(sql).stream()) {
        console.log('row ------>   ', row);
        rows.push(row)
      }
      res[sql] = rows
    }

    console.log('res -----------', res);
   }