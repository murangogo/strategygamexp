import db from './dbconnect';
 
export default async function handler(request, response) {
  try {
    const username = request.query.username;
    const password = request.query.password;
    const permission = request.query.permission;
    const result = await db.oneOrNone("SELECT pw FROM ps WHERE un = 'yht'");
    if(permission==result.pw){
      if (!username || !password) throw new Error('username and password required.');
      await db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, password]);
    }else{
      throw new Error('禁止访问。');
    }
  } catch (error) {
    return response.status(500).json({ error:error.message });
  }
  db.none('SELECT * FROM users;');
  const uslis = await db.none('SELECT * FROM users;');
  return response.status(200).json({ uslis });
}