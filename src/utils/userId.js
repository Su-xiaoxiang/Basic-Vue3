// 引入 crypto-js
import CryptoJS from 'crypto-js';

// 加密密钥（应该保存在安全的地方）
const secretKey = 'Sxx';

// 加密函数
export function encryptUserId(userId) {
   // 将 userId 转为字符串
   const StringiFiedUserId = JSON.stringify(userId);

   // 使用 AES 进行加密
   const encrypted = CryptoJS.AES.encrypt(StringiFiedUserId, secretKey).toString();

   return encrypted;
}

// 解密函数
export function decryptUserId(encryptedUserId) {
   // 使用 AES 进行解密
   const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);

   // 将解密后的数据转换为字符串
   const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

   // 将解密后的字符串转换为原来的 userId
   const decryptedUserId = JSON.parse(decryptedString);

   return decryptedUserId;
}
