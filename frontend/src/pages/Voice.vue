<!-- <template>
  <div>
    <h1>Chapa Payment</h1>
    <form @submit.prevent="handleSubmit">
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model="amount" required>
      <label for="currency">Currency:</label>
      <select id="currency" v-model="currency" required>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="firstName" required>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="lastName" required>
      <button type="submit">Pay</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
      currency: null,
      email: null,
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        amount: this.amount,
        currency: this.currency,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      axios.post('http://localhost:3000/checkout', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script> -->