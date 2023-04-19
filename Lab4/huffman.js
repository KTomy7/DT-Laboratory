class HuffmanNode {
    constructor(char, freq, left, right) {
        this.char = char;
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

const buildHuffmanTree = (freqTable) => {
    const priorityQueue = Object.keys(freqTable).map(char => new HuffmanNode(char, freqTable[char]));
    while (priorityQueue.length > 1) {
        priorityQueue.sort((a, b) => a.freq - b.freq);
        const left = priorityQueue.shift();
        const right = priorityQueue.shift();
        const newNode = new HuffmanNode(null, left.freq + right.freq, left, right);
        priorityQueue.push(newNode);
    }
    return priorityQueue[0];
}

const buildEncodingTable = (huffmanTree) => {
    const encodingTable = {};

    function buildCode(node, code) {
        if (!node.char) {
            buildCode(node.left, code + "0");
            buildCode(node.right, code + "1");
        } else {
            encodingTable[node.char] = code;
        }
    }
    buildCode(huffmanTree, "");
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
    const huffmanTree = buildHuffmanTree(freqTable);
    const encodingTable = buildEncodingTable(huffmanTree);
    const encodedStr = encode(str, encodingTable);
    return {
        encodedStr,
        freqTable,
        encodingTable
    };
}