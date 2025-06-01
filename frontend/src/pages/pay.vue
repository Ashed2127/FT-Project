<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Your Logo</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">Services</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // Add any necessary logic here
};
</script>

<style scoped>
/* Add any custom styles here */
</style>

export default { name: 'Pay',}

<!-- <template>
  <div class="container">
    <div class="card p-4 shadow col-lg-7 ">
      <h5 class="card-title text-center mb-4">Payment Form</h5>

      <form @submit.prevent="initiatePayment">
        <div class="row mb-3">
          <label for="amount" class="col-sm-3 col-form-label ">Amount:</label>
          <div class="col-sm-9">
            <input
              type="number"
              class="form-control"
              id="amount"
              v-model="amount"
              :disabled="paymentProcessing"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="currency" class="col-sm-3 col-form-label">Currency:</label>
          <div class="col-sm-9">
            <select class="form-select" id="currency" v-model="currency" :disabled="paymentProcessing" required>
              <option value="ETB">ETB</option>
              </select>
          </div>
        </div>

        <div class="row mb-3">
          <label for="email" class="col-sm-3 col-form-label">Email:</label>
          <div class="col-sm-9">
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              :disabled="paymentProcessing"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="firstName" class="col-sm-3 col-form-label">First Name:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="first_name"
              :disabled="paymentProcessing"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="lastName" class="col-sm-3 col-form-label">Last Name:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="last_name"
              :disabled="paymentProcessing"
              required
            />
          </div>
        </div>

        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary" :disabled="paymentProcessing">
            Pay Now
            <span v-if="paymentProcessing && checkoutUrl.length>0" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
          </button>
        </div>

        <div class="mt-3">
          <div class="alert alert-danger" v-if="paymentError">{{ paymentError }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Assuming you have axios installed (`npm install axios`)
export default {
  name: 'Pay',
  data() {
    return {
      amount: 0,
      currency: '', // Or your preferred currency
      email: '',
      first_name: '',
      last_name: '',
      paymentProcessing: false, // Flag to indicate payment processing state
      paymentError: null, // Store any errors during payment processing
      checkoutUrl: '',
    };
  },
  methods: {
  async initiatePayment() {
    this.paymentProcessing = true; // Set processing flag
    // let checkoutUrl = '';
    let response = {
        amount: this.amount,
        currency: this.currency,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
    }
       await axios.post('/initiate-payment/', response);
      console.log('Payment initiated successfully!');
      const paymentCheckoutUrl = await axios.get('/checkout-url/', this.checkoutUrl)
          window.location.href = paymentCheckoutUrl.data;
          console.log('Checkout URL:', paymentCheckoutUrl);
          console.log('Checkout URL:', paymentCheckoutUrl.data);
          
  },
}

};

</script>
 -->
