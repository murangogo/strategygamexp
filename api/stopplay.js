import db from './dbconnect';
 
export default async function handler(request, response) {
  try {
    const chessnum = request.query.chessid;
    const chara = request.query.chara;
    if (!chessnum || chessnum.trim() === ''){
        throw new Error('非法请求');
    }else{
        if (!chara || chara.trim() === ''){
            throw new Error('非法请求');
        }else{
            if(chara==1){
                const result = await db.none("UPDATE chessdb SET cst = 1 WHERE id = $1;",[chessnum]);
            }else{
                const result = await db.none("UPDATE chessdb SET pst = 1 WHERE id = $1;",[chessnum]);
            }
        }
    }  
  } catch (error) {
    return response.status(500).json({ error:error.message });
  }
  return response.status(200).json({message:"停手成功。"});
}