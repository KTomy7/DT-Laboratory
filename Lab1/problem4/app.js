function getFibonacci(n) {
    if (typeof n !== 'number' || n <= 1 || n > 10) {
        return 'not allowed';
    }

    var f = new Array(n - 1);
    f[0] = 0;
    f[1] = 1;
    for (var i = 2; i < n; i++) {
        f[i] = f[i - 2] + f[i - 1];
    }
    return f;
}