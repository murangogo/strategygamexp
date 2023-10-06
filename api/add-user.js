// import { sql } from '@vercel/postgres';
 
// export default async function handler(request, response) {
//   try {
//     const username = request.query.username;
//     const password = request.query.password;
//     const permission = request.query.permission;
//     const result = await sql`SELECT pw FROM ps WHERE un = 'yht';`;
//     if(permission==result.rows[0].pw){
//       if (!username || !password) throw new Error('username and password required.');
//       await sql`INSERT INTO users (username, password) VALUES (${username}, ${password});`;
//     }else{
//       throw new Error('禁止访问。');
//     }
//   } catch (error) {
//     return response.status(500).json({ error:error.message });
//   }
//   const uslis = await sql`SELECT * FROM users;`;
//   return response.status(200).json({ uslis });
// }