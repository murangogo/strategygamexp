import db from './dbconnect';
 
export default async function handler(request, response) {
  try {
    const username = request.query.username;

    if (!username || username.trim() === '') {
        throw new Error('非法创建。');
    }

    const idgroup = await db.one(
        'INSERT INTO chessdb (chessboard, creator, partner, cst, pst, turn, winner) VALUES ($1, $2, \'\', 0, 0, 1, \'\') RETURNING id;',
        [
          [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          ],
          username
        ]
      );

      return response.status(200).json({ message:'创建成功，',idnum : idgroup.id });
} catch (error) {
    return response.status(500).json({ error:error.message });
  }
}