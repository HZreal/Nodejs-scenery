// Crypto 加密模块是 C／C++ 实现这些算法后，暴露为 javascript 接口的模块，包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

// AES/ECB/PKCS5Padding
// AES：代表算法
//
// ECB：代表模式
//
// PKCS5Padding：代表填充量

import {createCipheriv, createDecipheriv, createHash} from 'crypto'

// 数据加密
function cipher(str) {
    try {
        // crypto.createCipheriv(algorithm, pwd, iv)  指定算法、密码、向量创建 cipher 加密对象
        const cipher = createCipheriv('des-ecb', '12345678', '');

        /**
         * update方法
         * 第一个参数代表加密的数据
         * 第二参数代表传入数据的格式，可以是'utf8', 'ascii', 'latin1'
         * 第三个参数代表加密数据的输出格式，可以是'latin1'， 'base64' 或者 'hex'。没有执行则返回Buffer
         */
        let encrypted = cipher.update(str, 'utf8', 'hex');

        /**
         * final方法，返回任何加密的内容
         * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
         */
        encrypted += cipher.final('hex');

        return encrypted;

    } catch (e) {
        console.log('加密失败');
        return e.message || e;
    }
}

const encryptedStr = cipher('hello world ！！！') // 28dba02eb5f6dd479a6144f98622a55caa67f06240f93005
console.log(encryptedStr)

// 数据解密

function decipher(encrypted){
    try{
        // crypto.createDecipheriv(algorithm, pwd, iv)   // 指定算法、密码、向量创建 decipher 解密对象
        const decipher = createDecipheriv('des-ecb', '12345678', '');

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;

    }catch(e){
        console.log('解密失败');
        return e.message || e;
    }
}

const originStr = decipher(encryptedStr);
console.log(originStr)    // hello world ！！！



// MD5加密
// 是让大容量信息在数字签名软件签署私人秘钥前被 “压缩” 成一种保密格式，也就是把一个任意长度的字节串变换成一定长度的十六进制数字串（32个字符） 一致性验证

// 特点
// 不可逆
// 输入两个不同的明文不会得到相同的输出值
// 根据输出值，不能得到原始的明文，即过程不可逆

// MD5三种实现方式
//     crypto.createHash(algorithm)
//     创建并返回一个 hash 对象，它是一个指定算法的加密 hash，用于生成 hash 摘要。
//
//     参数 algorithm 可选择系统上安装的 OpenSSL 版本所支持的算法。例如：sha1、md5、sha256、sha512 等。在近期发行的版本中，openssl list-message-digest-algorithms 会显示这些可用的摘要算法。
//
//     hash.update(data)
//     更新 hash 的内容为指定的 data。当使用流数据时可能会多次调用该方法。
//
//     hash.digest(encoding='binary')
//     计算所有传入数据的 hash 摘要。参数 encoding（编码方式）可以为 hex、binary、base64。
const md5 = (str) => {
    return createHash('md5').update(str, 'utf8').digest('hex')
};

// 默认输出长度为32位小写字母
// 25f9e794323b453885f5181f1b624d0b
console.log(md5('123456789'));

// 以下转换为32位大写字母
// 25F9E794323B453885F5181F1B624D0B
console.log(md5('123456789').toUpperCase());