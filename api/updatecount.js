import db from './dbconnect';

export default async function handler(request, response) {
  try {
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
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

