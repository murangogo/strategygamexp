import db from './dbconnect';

export default async function gameover(request, response) {
  try {
    const chessnum = request.query.chessid;
    const chara = request.query.chara;
    let winresult = ""; 
    if (!chessnum || chessnum.trim() === ''){
        throw new Error('非法请求');
    }else{
        if (!chara || chara.trim() === ''){
            throw new Error('非法请求');
        }else{
            const resultpa = await db.one('SELECT partner FROM chessdb WHERE id = $1', [chessnum]);
            const resultcr = await db.one('SELECT creator FROM chessdb WHERE id = $1', [chessnum]);
            const partnerover = resultpa.partner;
            const creatorover = resultcr.creator;
            if(chara==1){
                await db.none("UPDATE chessdb SET winner = $1 WHERE id = $2;",[partnerover,chessnum]);
                winresult = `${creatorover}认输，${partnerover}获胜。`
            }else{
                await db.none("UPDATE chessdb SET winner = $1 WHERE id = $2;",[creatorover,chessnum]);
                winresult = `${partnerover}认输，${creatorover}获胜。`
            }
        }
    }  
    return response.status(200).json({ message:winresult });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}