<template>
  <div class="flash flash-success mb-4 text-center">
    Your transaction is on the way! Here is the ID of the transaction:
    <p>{{ id }}</p>
    <a :href="`https://steemscan.com/transaction/${id}`" target="_blank"
      >Click here to view this transaction on Steemscan.com</a
    >
    <button v-if="isExtension" type="submit" class="btn btn-large btn-success mt-4" @click="close">
      Close
    </button>
  </div>
</template>

<script>
import { isChromeExtension } from '@/helpers/utils';

export default {
  props: {
    id: String,
  },
  data() {
    return {
      isExtension: isChromeExtension(),
    };
  },
  methods: {
    close() {
      window.close();
    },
  },
};
</script>
