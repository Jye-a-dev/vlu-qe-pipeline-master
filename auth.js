// auth.js
// Giả lập cơ sở dữ liệu người dùng
const USERS_DB = {
  admin: {
    password: '123',
    isLocked: false,
  },
  user_test: {
    password: 'Password123',
    isLocked: false,
  },
  locked_user: {
    password: '123',
    isLocked: true,
  },
};

/**
 * Hàm xác thực đăng nhập người dùng
 * @param {string} username - Tên đăng nhập....
 * @param {string} password - Mật khẩu
 * @returns {boolean} true nếu đăng nhập thành công, false nếu sai mật khẩu hoặc tài khoản không tồn tại
 * @throws {Error} khi dữ liệu đầu vào không hợp lệ hoặc tài khoản bị khóa
 */
function login(username, password) {
  // 1. Kiểm tra username rỗng / null / undefined / chỉ có khoảng trắng
  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new Error('Username không được để trống');
  }

  // 2. Kiểm tra password rỗng / null / undefined
  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('Mật khẩu không được để trống');
  }

  // 3. Kiểm tra mật khẩu chứa ký tự đặc biệt nguy hiểm hoặc không hợp lệ
  // Giả định hệ thống chỉ cho phép chữ cái và chữ số (alphanumeric)
  const specialCharsRegex = /[^a-zA-Z0-9]/;
  if (specialCharsRegex.test(password)) {
    throw new Error('Mật khẩu không được chứa ký tự đặc biệt');
  }

  const cleanUsername = username.trim();
  const user = USERS_DB[cleanUsername];

  // 4. Kiểm tra tài khoản có tồn tại không
  if (!user) {
    return false;
  }

  // 5. Kiểm tra tài khoản bị khóa
  if (user.isLocked) {
    throw new Error('Tài khoản đã bị khóa');
  }

  // 6. Kiểm tra mật khẩu đúng / sai
  if (user.password !== password) {
    return false;
  }

  return true;
}

module.exports = { login, USERS_DB };
