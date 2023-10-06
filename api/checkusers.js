// import { sql } from '@vercel/postgres';

// export default async function handler(request, response) {
//   try {
//     const inputUsername = request.query.username;

//     // 检查是否提供了用户名
//     if (!inputUsername) throw new Error('需要用户名。');

//     // 查询用户名对应的密码
//     const result = await sql`SELECT password FROM users WHERE username = ${inputUsername};`;

//     // 检查查询结果
//     if (result.rowCount === 0) {
//       return response.status(404).json({ error: '你不能使用。' });
//     }

//     const password = result.rows[0].password;

//     return response.status(200).json({ password });

//   } catch (error) {
//     return response.status(500).json({ error: error.message });
//   }
// }
