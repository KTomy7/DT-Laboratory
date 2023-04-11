<script lang="ts">
export default {
  data() {
    return {
      dataBits: [] as Array<any>,
      status: '',
      numberOfDataBits: 4
    };
  },
  mounted() {
    this.initDataBits();
  },
  methods: {
    initDataBits() {
      this.dataBits = [];
      for (let i = 0; i < this.numberOfDataBits; ++i) {
        const bit = { data: null };
        this.dataBits.push(bit as never);
      }
    },
    send() {
      if (this.validate(this.dataBits) === true) {
        const encodedMessage = this.encode(this.dataBits);
        
        fetch('http://localhost:3000/message', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bits: encodedMessage
          })
        }).then(response => {
          return response.text();
        }).then(body => {
          this.status = body;
        });
      } else {
        this.status = 'Input not valid. Please use 0 or 1 as bit values';
      }
    },
    encode(bits: Array<any>): Array<number> {
      const output: Array<number> = [0];

      let index = 0;
      let i = 1;
      while (index < bits.length) {
        if ((i & (i - 1)) !== 0) { // nu e putere a lui 2
          output[i] = parseInt(bits[index++].data);
        } else {
          output[i] = 0;
        }
        ++i;
      }

      // Control
      for (let i = 1; i < output.length; i++) {
        if ((i & (i - 1)) === 0) {

          output[i] = output.filter((_, j) => {
            if (j === 0) {
              return false;
            }
            return (j & i) === i;
          }).reduce((accumulator, value) => {
            accumulator = accumulator ^ value;
            return accumulator;
          }, 0);
        }
      }

      return output;
    },
    validate(bits: Array<any>) {
      for (let i = 0; i < bits.length; i++) {
        const element = bits[i];
        if (!this.validateBit(element.data)) {
          return false;
        }
      }
      return true;
    },
    validateBit(character: string) {
      if (character === null) {
        return false;
      }
      return parseInt(character) === 0 || parseInt(character) === 1;
    }
  }
}
</script>

<template>
  <main>
    <h1>
      Hamming code for
      <select @change="initDataBits" v-model="numberOfDataBits">
        <option value="4">4</option>
        <option value="8">8</option>
      </select>
      bits
    </h1>

    <ul v-for="(bit, index) in dataBits">
      <li>
        <input type="numeric" min="0" max="1" maxlength="1" :placeholder="'D' + index" v-model="bit.data" :class="[validateBit(bit.data) ? 'valid-input' : 'invalid-input']">
      </li>
    </ul>

    <p>
      Data bits: <code>{{ dataBits }}</code>
    </p>

    <button @click="send">Send</button>

    <p>{{ status }}</p>
  </main>
</template>
