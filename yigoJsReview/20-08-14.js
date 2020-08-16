/*
 * @Author: yigo
 * @Date: 2020-08-02 10:19:06
 * @LastEditTime: 2020-08-16 09:55:10
 * @LastEditors: yigo
 */


//  js里两个数组的拼接
// 方法1：for循环
var arr1 = [1, 2]
var arr2 = [3, 4]
for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
}
console.log(arr1);
// 方法2：使用concat（），该方法返回的是新数组，不改变原数组
var arr = ['tom', 'jerry'];
var arr2 = [1, 2];

var newArr = arr.concat(arr2);
console.log(newArr);
// 方法3：使用es6的扩展运算符
var arr = ['tom', 'jerry'];
var arr2 = [1, 2];

arr.push(...arr2);
console.log(arr)


// 方法1：Obeject.assgin方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
const target = {
    a: 1
}
const source1 = {
    b: 2
}
const source2 = {
    c: 3
}
Object.assign(target, source1, source2)
console.log('target:', target); //target: { a: 1, b: 2, c: 3 }
// 方法2：for循环遍历赋值