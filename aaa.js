// 原始对象A（不方便直接加Proxy）
const objectA = {
    name: '张三',
    age: 25,
    city: '北京',
    hobbies: ['读书', '游泳'],
    updateAge(newAge) {
        this.age = newAge;
        console.log(`A内部方法：年龄更新为 ${newAge}`);
    }
};

// 创建代理对象B（空对象 + Proxy劫持）
function createProxyB(targetObject) {
    // B是一个空对象，只作为Proxy的target
    const objectB = {};

    return new Proxy(objectB, {
        // 劫持属性获取
        get(target, prop, receiver) {
            console.log(`🔍 GET操作: 获取字段 "${prop}"`);

            const value = targetObject[prop];

            // 如果是函数，需要绑定正确的this
            if (typeof value === 'function') {
                console.log(`📞 GET操作: "${prop}" 是一个方法`);
                return function (...args) {
                    console.log(`🚀 调用方法: ${prop}(${args.join(', ')})`);
                    const result = value.apply(targetObject, args);
                    console.log(`✅ 方法调用完成: ${prop}`);
                    return result;
                };
            }

            console.log(`📖 GET操作: "${prop}" = ${JSON.stringify(value)}`);
            return value;
        },

        // 劫持属性设置
        set(target, prop, value, receiver) {
            console.log(`✏️  SET操作: 设置字段 "${prop}" = ${JSON.stringify(value)}`);

            const oldValue = targetObject[prop];
            targetObject[prop] = value;

            console.log(`🔄 SET操作: "${prop}" 从 ${JSON.stringify(oldValue)} 变更为 ${JSON.stringify(value)}`);
            return true;
        },

        // 劫持属性删除
        deleteProperty(target, prop) {
            console.log(`🗑️  DELETE操作: 删除字段 "${prop}"`);

            const oldValue = targetObject[prop];
            delete targetObject[prop];

            console.log(`❌ DELETE操作: 已删除 "${prop}"，原值为 ${JSON.stringify(oldValue)}`);
            return true;
        },

        // 劫持属性枚举
        ownKeys(target) {
            console.log(`📝 KEYS操作: 获取所有属性键`);
            const keys = Object.keys(targetObject);
            console.log(`📋 KEYS操作: 找到属性 [${keys.join(', ')}]`);
            return keys;
        },

        // 劫持属性描述符获取
        getOwnPropertyDescriptor(target, prop) {
            console.log(`🔍 DESCRIPTOR操作: 获取 "${prop}" 的属性描述符`);
            return Object.getOwnPropertyDescriptor(targetObject, prop);
        },

        // 劫持 in 操作符
        has(target, prop) {
            console.log(`❓ HAS操作: 检查是否存在字段 "${prop}"`);
            const exists = prop in targetObject;
            console.log(`${exists ? '✅' : '❌'} HAS操作: "${prop}" ${exists ? '存在' : '不存在'}`);
            return exists;
        }
    });
}

// 创建代理对象B
const proxyB = createProxyB(objectA);

// 测试代码
console.log('=== 开始测试代理对象B ===\n');

// 1. 获取属性
console.log('1. 获取属性测试:');
console.log('姓名:', proxyB.name);
console.log('年龄:', proxyB.age);
console.log();

// 2. 设置属性
console.log('2. 设置属性测试:');
proxyB.name = '李四';
proxyB.age = 30;
proxyB.newField = '新字段';
console.log();

// // 3. 调用方法
// console.log('3. 调用方法测试:');
// proxyB.updateAge(28);
// console.log();

// // 4. 删除属性
// console.log('4. 删除属性测试:');
// delete proxyB.newField;
// console.log();

// // 5. 检查属性存在
// console.log('5. 检查属性存在测试:');
// console.log('name in proxyB:', 'name' in proxyB);
// console.log('nonExistent in proxyB:', 'nonExistent' in proxyB);
// console.log();

// // 6. 遍历属性
// console.log('6. 遍历属性测试:');
// for (let key of Object.keys(proxyB)) {
//     console.log(`遍历到: ${key} = ${JSON.stringify(proxyB[key])}`);
// }
// console.log();

// // 7. 验证原对象A的状态
// console.log('7. 验证原对象A的最终状态:');
// console.log('objectA:', JSON.stringify(objectA, null, 2));

// // 高级用法：带条件的代理
// console.log('\n=== 高级用法：条件代理 ===');

// function createConditionalProxy(targetObject, options = {}) {
//     const {
//         readonly = [],           // 只读字段
//         private = [],           // 私有字段
//         validator = {},         // 字段验证器
//         beforeSet = () => { },   // 设置前钩子
//         afterSet = () => { }     // 设置后钩子
//     } = options;

//     const objectB = {};

//     return new Proxy(objectB, {
//         get(target, prop, receiver) {
//             // 私有字段检查
//             if (private.includes(prop)) {
//                 console.log(`🚫 访问被拒绝: "${prop}" 是私有字段`);
//                 return undefined;
//             }

//             console.log(`🔍 GET: ${prop}`);
//             return targetObject[prop];
//         },

//         set(target, prop, value, receiver) {
//             // 只读字段检查
//             if (readonly.includes(prop)) {
//                 console.log(`🚫 设置被拒绝: "${prop}" 是只读字段`);
//                 return false;
//             }

//             // 私有字段检查
//             if (private.includes(prop)) {
//                 console.log(`🚫 设置被拒绝: "${prop}" 是私有字段`);
//                 return false;
//             }

//             // 字段验证
//             if (validator[prop]) {
//                 if (!validator[prop](value)) {
//                     console.log(`🚫 设置被拒绝: "${prop}" 验证失败，值 ${JSON.stringify(value)}`);
//                     return false;
//                 }
//             }

//             const oldValue = targetObject[prop];

//             // 设置前钩子
//             beforeSet(prop, value, oldValue);

//             targetObject[prop] = value;
//             console.log(`✅ SET: ${prop} = ${JSON.stringify(value)}`);

//             // 设置后钩子
//             afterSet(prop, value, oldValue);

//             return true;
//         }
//     });
// }

// // 测试条件代理
// const user = { name: '王五', age: 20, password: '123456' };

// const protectedProxy = createConditionalProxy(user, {
//     readonly: ['name'],
//     private: ['password'],
//     validator: {
//         age: (value) => typeof value === 'number' && value >= 0 && value <= 150
//     },
//     beforeSet: (prop, value, oldValue) => {
//         console.log(`⏰ 即将设置 ${prop}: ${oldValue} -> ${value}`);
//     },
//     afterSet: (prop, value, oldValue) => {
//         console.log(`✨ 已完成设置 ${prop}`);
//     }
// });

// console.log('\n条件代理测试:');
// protectedProxy.name = '新名字';        // 只读，应该失败
// protectedProxy.password = '新密码';    // 私有，应该失败
// protectedProxy.age = -5;              // 验证失败
// protectedProxy.age = 25;              // 应该成功
// console.log('password:', protectedProxy.password);  // 私有字段，返回undefined
