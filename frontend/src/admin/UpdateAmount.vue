<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />

  <!-- Sidebar -->
  <div class="sidebar">
    <div class="admin-profile"><i class="fas fa-user"></i></div>

    <router-link
      @click="scrollToTop()"
      to="/admin/dashboard"
      class="sidebar-link"
      >order dashboard</router-link
    >
    <router-link
      @click="scrollToTop()"
      to="/tabledashboard"
      class="sidebar-link"
      >Table Dashboard</router-link
    >
    <router-link @click="scrollToTop()" to="/updateAmount" class="sidebar-link"
      >Update Food Detail</router-link
    >
    <router-link @click="scrollToTop()" to="/dpRegister" class="sidebar-link"
      >Create Delivery Person Account</router-link
    >
    <router-link @click="scrollToTop()" to="/dpDelete" class="sidebar-link-r"
      >Delete Delivery Person Account</router-link
    >
    <button class="sidebar-logout-btn" @click="handleLogout()">Logout</button>
  </div>
  <div class="register-container">
    <div class="register-form-container">
      <div class="container mt-3">
        <form @submit.prevent="updateFood" class="row">
          <h1>Update Food Price & Discount</h1>
          <div class="col-md-12 mb-3">
            <label for="foodName">Select food name</label>
            <select
              v-model="food.name"
              id="foodName"
              class="form-control"
              required
            >
              <option value="" disabled selected>Select food</option>
              <option value="chechebsa">chechebsa</option>
              <option value="burger">burger</option>
              <option value="tematem silse">tematem silse</option>
              <option value="dulet">dulet</option>
              <option value="tibs">tibs</option>
              <option value="tibs-ferfer">tibs-ferfer</option>
              <option value="special">special</option>
              <option value="bozena-shiro">bozena-shiro</option>
              <option value="fast shiro">fast shiro</option>
              <option value="Cake">Cake</option>
              <option value="bombolino">bombolino</option>
              <option value="Doughnut">Doughnut</option>
              <option value="coffee">coffee</option>
              <option value="macchiato">macchiato</option>
              <option value="special milk">special milk</option>
              <option value="coca cola">coca cola</option>
              <option value="ambo weeha">ambo weeha</option>
              <option value="pepsi">pepsi</option>

              <!-- Add more options as needed -->
            </select>
          </div>

          <div class="col-md-12 mb-3 text-danger" v-if="nameErr">
            {{ nameErr }}
          </div>
          <div class="col-md-12 mb-3">
            <label for="foodPrice">Update food price</label>

            <input
              type="number"
              min="0"
              id="foodPrice"
              placeholder="update food price"
              v-model.number="food.price"
              class="form-control"
              required
              
            />
          </div>
          <div class="col-md-12 mb-3 text-danger" v-if="priceErr">
            {{ priceErr }}
          </div>
          <div class="col-md-12 mb-3">
            <label for="foodDiscount">Update food discount</label>
            <input
              type="number"
              min="0"
              max="100"
              id="foodDiscount"
              placeholder=""
              v-model.number="food.discount"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-12">
            <button type="submit" class="btn r col-12">Update Food</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueBasicAlert from 'vue-basic-alert';

import { mapState, mapMutations } from "vuex";

export default {
  name: "UpdateAmount",
  data() {
    return {
      food: {
        name: "",
        price: 0,
        discount: 0,
      },
      nameErr: "",
      priceErr: "",
    };
  },
  created() {
    if (!this.admin) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["allFoods", "admin"]),
  },
  methods: {
    ...mapMutations(["setAdmin"]),
    handleLogout: function () {
      this.setAdmin("");
    },
    async updateFood() {
      // Check if food price is zero or not a number
      if (!isNaN(this.food.name)) {
        this.nameErr = "Food name cannot be a number";
        return;
      } else if (this.food.price === 0 || isNaN(this.food.price)) {
        this.priceErr = "Food price must be a number greater than zero";
        return;
      } else {
        this.nameErr = "";
        this.priceErr = "";
      }
      try {
        const response = await axios.put("/foodname/", this.food);
        const message = "Food updated successfully";
        this.$refs.alert.showAlert(message);

        console.log("Food updated successfully:", response.data);
        // Handle successful update (e.g., clear form, show confirmation message)
        this.food.name = "";
        this.food.price = 0;
        this.food.discount = 0;
        this.priceError = ""; // Clear error message after successful update
      } catch (error) {
        console.error("Error updating food:", error);
        // Handle errors appropriately (e.g., display error message to user)
      }
    },
  },
  components: {
        VueBasicAlert
    }
}
</script>

<style scoped>
/* Add scoped styles if needed */
</style>

<style scoped>
.register-container {
  padding: 3rem 15%;
}

.register-container .register-form-container {
  background: #fff;
}

.register-container .register-form-container form {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  max-width: 50rem;
  width: 100%;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.5rem;
  animation: fadeUp 0.4s linear;
}
.register-container .register-form-container form h3 {
  padding-bottom: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: #130f40;
  margin: 0;
}
.b-r {
  border-radius: 0;
}

.r {
  background-color: #c1282d;
}
.r:hover {
  background-color: rgb(236, 39, 39);
}

.sidebar {
  background-color: #333;
  color: white;
  height: 100vh;
  width: 235px;

  padding: 20px;
  position: fixed;
}

.sidebar-link, .sidebar-link-r {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 14px;
}

.sidebar-link:hover {
  text-decoration: underline;
  color: #06eb25;
}
.sidebar-link-r:hover{
  color: #fa040c
}

.sidebar-logout-btn {
  background-color: #c1282d;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
}

.sidebar-logout-btn:hover {
  background-color: #a92226;
}

.admin-profile {
  width: 70px;
  height: 70px;
  background-color: #fff; /* White background */
  border-radius: 50%; /* Make it a circle */
  margin-bottom: 20px;
  margin-left: 60px; /* Spacing */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333; /* Icon color */
}
</style>
