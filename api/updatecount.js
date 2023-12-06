import db from './dbconnect';

export default async function handler(request, response) {
try {
    response.setHeader('Access-Control-Allow-Origin', '*'); // 允许任何来源
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const mytype = request.query.type;
    if(mytype=="check"){
        const result = await db.oneOrNone('SELECT num FROM download WHERE id = $1', [1]);
        if (result==null) {
            return response.status(500).json({ error: '禁止访问' });
          }
          const mynum = result.num;
          return response.status(200).json({ mynum });
    }else if(mytype=="update"){
        const permission = request.query.permission;
        const result = await db.oneOrNone("SELECT pw FROM ps WHERE un = 'yht'");
        if(permission==result.pw){
        // 开始一个事务
        await db.tx(async t => {
        // 执行更新操作
        await t.none('UPDATE download SET num = num + 1 WHERE id = $1', [1]);
        });
        }else{
        throw new Error('禁止访问。');
        }
        return response.status(200).json({ message: '更新成功' });
    }else{
        throw new Error('禁止访问。');
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

