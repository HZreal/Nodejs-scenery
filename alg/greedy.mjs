/*
贪婪算法
*/


// 硬币问题
// 给定不同面额的硬币 coins 和一个总金额money。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

const money = 36
const coins = [25, 10 , 5, 1]
function minCoinCount(money, coins) {
    let coin_map = {};
    for (let coin of coins) {
        let count = parseInt(money / coin)
        coin_map['面值'+coin] = count
        money -= coin * count
        if (money <= 0) {
            break
        }
    }
    return coin_map
}
console.log(minCoinCount(money, coins))




// 背包问题


