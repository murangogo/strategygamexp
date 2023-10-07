import db from './dbconnect';

export default async function gameover(request, response) {
  try {
    const chessnum = request.query.chessid;

    if (!chessnum || chessnum.trim() === '') {
        throw new Error('非法请求。');
    }

    const resultcr = await db.one('SELECT creator FROM chessdb WHERE id = $1', [chessnum]);
    const creatorover = resultcr.creator;
    const resultpa = await db.one('SELECT partner FROM chessdb WHERE id = $1', [chessnum]);
    const partnerover = resultpa.partner;
    const overarray = await db.one('SELECT chessboard FROM chessdb WHERE id = $1', [chessnum]);
    let myarray = overarray.chessboard;
    let cre = 0;
    let par = 0;
    for(let i = 0; i < myarray.length; i++) {
        for(let j = 0; j < myarray[i].length; j++) {
          if(myarray[i][j] === 1) {
            cre++;
          } else if(myarray[i][j] === 2) {
            par++;
          }
        }
      }
    let winresult = ""; 
    if(cre>par){
        await db.none("UPDATE chessdb SET winner = $1 WHERE id = $2;",[creatorover,chessnum]);
        winresult = `${creatorover}：${cre}目，${partnerover}：${par}目，${creatorover}获胜。`;
    }else if(cre<par){
        await db.none("UPDATE chessdb SET winner = $1 WHERE id = $2;",[partnerover,chessnum]);
        winresult = `${creatorover}：${cre}目，${partnerover}：${par}目，${partnerover}获胜。`;
    }else{
        await db.none("UPDATE chessdb SET winner = '和局' WHERE id = $1;",[chessnum]);
        winresult = `${creatorover}：${cre}目，${partnerover}：${par}目，和局。`;
    }
    return response.status(200).json({ message:winresult });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}