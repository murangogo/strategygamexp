import db from './dbconnect';
 
export default async function handler(request, response) {
  try {
    const username = request.query.username;
    const gameid = request.query.gameid;

    if (!username || username.trim() === '') {
        throw new Error('非法加入。');
    }

    const num = await db.one(
        'SELECT COUNT(*) AS count FROM chessdb WHERE id = $1;',[gameid]
    );

    if(num.count==0){
        throw new Error('房间号不存在。');
    }else{
        await db.none(
            'UPDATE chessdb SET partner = $1 WHERE id = $2;', 
            [username, gameid]
        );
        return response.status(200).json({ message:'加入成功。'});
    }
} catch (error) {
    return response.status(500).json({ error:error.message });
  }
}