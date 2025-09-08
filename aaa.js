// 在这里，我们需要一个更复杂的代理，来监听数组内部的变化
function createArrayProxy(arr) {
    return new Proxy(arr, {
        set(target, property, value, receiver) {
            // 检查被修改的属性是否是 length
            if (property === 'length') {
                // 如果是 length，说明数组内容发生了 push 或 pop 等变化
                console.log(`数组长度发生变化，新长度为: ${value}`);
                console.log(`当前数组状态:`, target);
            }

            // 保持原始行为，执行赋值操作
            return Reflect.set(target, property, value, receiver);
        }
    });
}