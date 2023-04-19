class ShannonFanoNode {
    constructor(chars, freq, left, right) {
        this.chars = chars;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

const buildFrequencyTable = (str) => {
    const freqTable = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!freqTable[char]) {
            freqTable[char] = 1;
        } else {
            freqTable[char]++;
        }
    }
    return freqTable;
}

const buildShannonFanoTree = (freqTable) => {
    const chars = Object.keys(freqTable);
    if (chars.length === 1) {
        return new ShannonFanoNode(chars, freqTable[chars[0]]);
    }
    const totalFreq = chars.reduce((acc, char) => acc + freqTable[char], 0);
    let currFreq = 0;
    let splitIndex = 0;
    for (let i = 0; i < chars.length; i++) {
        currFreq += freqTable[chars[i]];
        const diff = Math.abs(totalFreq - 2 * currFreq);
        if (i === 0 || diff < smallestDiff) {
            smallestDiff = diff;
            splitIndex = i;
        }
    }
    const leftChars = chars.slice(0, splitIndex + 1);
    const rightChars = chars.slice(splitIndex + 1);
    const leftFreq = leftChars.reduce((acc, char) => acc + freqTable[char], 0);
    const rightFreq = rightChars.reduce((acc, char) => acc + freqTable[char], 0);
    const leftNode = buildShannonFanoTree(leftChars.reduce((acc, char) => {
        acc[char] = freqTable[char];
        return acc;
    }, {}));
    const rightNode = buildShannonFanoTree(rightChars.reduce((acc, char) => {
        acc[char] = freqTable[char];
        return acc;
    }, {}));
    return new ShannonFanoNode(chars, totalFreq, leftNode, rightNode);
}

const buildEncodingTable = (shannonFanoTree) => {
    const encodingTable = {};

    function buildCode(node, code) {
        if (node.chars.length === 1) {
            encodingTable[node.chars[0]] = code;
            return;
        }
        buildCode(node.left, code + "0");
        buildCode(node.right, code + "1");
    }
    buildCode(shannonFanoTree, "");
    return encodingTable;
}

const encode = (str, encodingTable) => {
    let encodedStr = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        encodedStr += encodingTable[char];
    }
    return encodedStr;
}

module.exports = (str) => {
    const freqTable = buildFrequencyTable(str);
    const shannonFanoTree = buildShannonFanoTree(freqTable);
    const encodingTable = buildEncodingTable(shannonFanoTree);
    const encodedStr = encode(str, encodingTable);
    return {
        encodedStr,
        freqTable,
        encodingTable
    };
}