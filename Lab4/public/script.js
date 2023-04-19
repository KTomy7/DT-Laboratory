const huffmanEncode = async () => {
    const clearText = document.getElementById('clearText');
    const response = await fetch('http://localhost:3000/huffman-encoded?clearText=' + clearText.value);
    const body = await response.json();
    document.getElementById('huffmanEncoded').value = body.result;
    setEncodingTable(document.getElementById('huffmanTable'), body.table, body.frequencyTable);
    document.getElementById('huffmanCompressionRate').innerHTML = body.compressionRate;
}
const shannonEncode = async () => {
    const clearText = document.getElementById('clearText');
    const response = await fetch('http://localhost:3000/shannon-encoded?clearText=' + clearText.value);
    const body = await response.json();
    document.getElementById('shannonEncoded').value = body.result;
    setEncodingTable(document.getElementById('shannonTable'), body.table, body.frequencyTable);
    document.getElementById('shannonCompressionRate').innerHTML = body.compressionRate;
}

const setEncodingTable = (table, encodingTable, frequencyTable) => {
    table.innerHTML = '<tr><th>Character</th><th>Frequency</th><th>Encoding</th></tr>';

    let data = [];
    for (const [character, encoding] of Object.entries(encodingTable)) {
        let frequency = 0;
        if (character in frequencyTable) {
            frequency = frequencyTable[character];
        }
        data.push([character, frequency, encoding]);
    }

    data = data.sort((a, z) => z[1] - a[1]);

    console.debug(data);
    for (const datum of data) {
        table.innerHTML += `<tr><td>${datum[0]}</td><td>${datum[1]}</td><td>${datum[2]}</td></tr>`
    }
}