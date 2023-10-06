import db from './dbconnect';

export default async function getuserpw(request, response) {
  try {
    const inputUsername = request.query.username;

    // 检查是否提供了用户名
    if (!inputUsername || inputUsername.trim() === '') {
      throw new Error('需要用户名');
  }

    // 查询用户名对应的密码
    const result = await db.oneOrNone('SELECT password FROM users WHERE username = $1', [inputUsername]);
    // 检查查询结果
    if (result==null) {
      return response.status(404).json({ error: '你不能使用。' });
    }
    const password = result.password;
    return response.status(200).json({ password });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}