// auth.smoke.test.js
const { login } = require('./auth');

describe('Smoke Test - Authentication Service', () => {
  // Smoke test: Chỉ kiểm tra luồng hoạt động cơ bản và quan trọng nhất (Happy Path)
  test('Đăng nhập thành công với tài khoản hợp lệ (admin / 123) -> trả về true', () => {
    const result = login('admin', '123');
    expect(result).toBe(true);
  });
});
