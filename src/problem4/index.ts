/*
Provide 3 unique implementations of the following function in TypeScript.
Input: `n` - any integer

Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

Output: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`
*/

//Recursive Approach
//Note: This approach can lead to stack overflow if n is a large number.

//Time complexity: O(n)
//Space complexity: O(n)
function sum_to_n_a(n: number): number {
    if (n === 1) {
        return 1;
    }

    return n + sum_to_n_a(n - 1);
}

//Iterative Approach
//Time complexity: O(n)
//Space complexity: O(1)
function sum_to_n_b(n: number): number {
    let sum = 0

    for (let i = 1; i <= n; i++) {
        sum += i
    }

    return sum
}

//Mathematical Formula
//Time complexity: O(1)
//Space complexity: O(1)
function sum_to_n_c(n: number): number {
    return n * (n + 1) / 2
}

console.log(sum_to_n_a(10))
console.log(sum_to_n_b(10))
console.log(sum_to_n_c(10))