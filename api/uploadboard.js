import db from './dbconnect';

export default async function upload(request, response) {
  try {
    const chessnum = request.query.chessid;
    const { myboard } = request.body;

    if (!myboard || !Array.isArray(myboard)) {
        throw new Error('非法请求');
      }
      if (!myboard || !Array.isArray(myboard)) {
        throw new Error('Invalid board data');
      }

      console.log(myboard);

    await db.none("UPDATE chessdb SET chessboard = $1 WHERE id = $2;",[myboard,chessnum]);
    await db.none("UPDATE chessdb SET turn = turn + 1 WHERE id = $1;",[chessnum]);

    return response.status(200).json({ message: `upload success!` });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}