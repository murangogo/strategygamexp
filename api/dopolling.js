import db from './dbconnect';

export default async function getchessdb(request, response) {
  try {
    const chessnum = request.query.chessid;

    // 检查是否提供了用户名
    if (!chessnum || chessnum.trim() === '') {
      throw new Error('非法请求。');
  }

    const result = await db.one('SELECT * FROM chessdb WHERE id = $1', [chessnum]);
    
    console.log(result);
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}