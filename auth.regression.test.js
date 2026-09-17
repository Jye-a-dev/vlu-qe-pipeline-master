// auth.regression.test.js
const { login } = require('./auth');

describe('Regression Test - Authentication Service (Ngoại lệ & Biên)', () => {
  describe('1. Kiểm tra xác thực thông tin tài khoản (Authentication)', () => {
    test('Mật khẩu sai -> trả về false', () => {
      const result = login('admin', 'wrong_password');
      expect(result).toBe(false);
    });

    test('Tài khoản không tồn tại trong hệ thống -> trả về false', () => {
      const result = login('non_existent_user', '123');
      expect(result).toBe(false);
    });
  });

  describe('2. Kiểm tra tài khoản bị khóa', () => {
    test('Tài khoản đã bị khóa -> ném ngoại lệ "Tài khoản đã bị khóa"', () => {
      expect(() => {
        login('locked_user', '123');
      }).toThrow('Tài khoản đã bị khóa');
    });
  });

  describe('3. Kiểm tra tính hợp lệ của Username', () => {
    test('Username là chuỗi rỗng -> ném ngoại lệ "Username không được để trống"', () => {
      expect(() => {
        login('', '123');
      }).toThrow('Username không được để trống');
    });

    test('Username chỉ chứa khoảng trắng -> ném ngoại lệ "Username không được để trống"', () => {
      expect(() => {
        login('   ', '123');
      }).toThrow('Username không được để trống');
    });

    test('Username là null hoặc undefined -> ném ngoại lệ "Username không được để trống"', () => {
      expect(() => {
        login(null, '123');
      }).toThrow('Username không được để trống');

      expect(() => {
        login(undefined, '123');
      }).toThrow('Username không được để trống');
    });
  });

  describe('4. Kiểm tra tính hợp lệ của Mật khẩu', () => {
    test('Mật khẩu rỗng hoặc chỉ chứa khoảng trắng -> ném ngoại lệ "Mật khẩu không được để trống"', () => {
      expect(() => {
        login('admin', '');
      }).toThrow('Mật khẩu không được để trống');

      expect(() => {
        login('admin', '   ');
      }).toThrow('Mật khẩu không được để trống');
    });

    test('Mật khẩu chứa ký tự đặc biệt (@, #, $, !, ...) -> ném ngoại lệ "Mật khẩu không được chứa ký tự đặc biệt"', () => {
      const specialPasswordList = ['123@', 'pass#word', 'admin!123', 'p@$$w0rd', '123 456'];
      
      specialPasswordList.forEach((pwd) => {
        expect(() => {
          login('admin', pwd);
        }).toThrow('Mật khẩu không được chứa ký tự đặc biệt');
      });
    });
  });
});
