exports.decode = (bits) => {
    let hasError = false;
    let errorPosition = 0;

    for (let i = 1; i < bits.length; i++) {
        if ((i & (i - 1)) === 0) {
            const ceArTrebuiSaFie = bits.filter((_, j) => {
                if (j === 0) {
                    return false;
                }
                if (i === j) {
                    return false;
                }
                return (j & i) === i;
            }).reduce((accumulator, value) => {
                accumulator = accumulator ^ value;
                return accumulator;
            }, 0);

            console.debug(i, ceArTrebuiSaFie, bits[i]);
            if (ceArTrebuiSaFie !== bits[i]) {
                hasError = true;
                errorPosition += i;
            }
        }
    }

    if (hasError) {
        bits[i] = (bits[i] + 1) % 2;
    }

    return {
        errorCorrected: hasError,
        errorPosition: errorPosition,
        bits
    };
};