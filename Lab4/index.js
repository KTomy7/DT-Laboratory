const express = require('express')
const app = express()
const port = 3000
const huffmanEncode = require('./huffman')
const shannonEncode = require('./shannon')
const computeCompresionRate = require('./compression-rate');

app.use('/', express.static('public'))

app.get('/huffman-encoded', (req, res) => {
  const input = req.query.clearText;
  console.debug(input);
  const { encodedStr: result, freqTable: frequencyTable, encodingTable } = huffmanEncode(input);
  console.debug(frequencyTable);
  res.json({
    result: result,
    frequencyTable: frequencyTable,
    table: encodingTable,
    compressionRate: computeCompresionRate(input, encodingTable, result),
  });
})

app.get('/shannon-encoded', (req, res) => {
  const input = req.query.clearText;
  const {
      encodedStr: result,
      freqTable: frequencyTable,
      encodingTable
  } = shannonEncode(input);
  res.json({
    result: result,
    frequencyTable: frequencyTable,
    table: encodingTable,
    compressionRate: computeCompresionRate(input, encodingTable, result),
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})