import db from './dbconnect';

export default async function handler(request, response) {
  try {

    // 查询chessdb中的记录
    const chessData = await db.manyOrNone('SELECT id, creator, partner, winner FROM chessdb ORDER BY id DESC;');

    // 返回查询结果
    return response.status(200).json({ chessData });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
