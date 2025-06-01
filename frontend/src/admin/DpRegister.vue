<template>
    <div class="sidebar">
          <div class="admin-profile">   <i class="fas fa-user"></i></div>

      <router-link @click="scrollToTop()" to="/admin/dashboard" class="sidebar-link" >order dashboard</router-link>
      <router-link @click="scrollToTop()" to="/tabledashboard" class="sidebar-link">Table Dashboard</router-link>
      <router-link @click="scrollToTop()" to="/updateAmount" class="sidebar-link" >Update Food Detail</router-link>
      <router-link @click="scrollToTop()" to="/dpRegister" class="sidebar-link">Create Delivery Person Account</router-link>
      <router-link @click="scrollToTop()" to="/dpDelete" class="sidebar-link-r">Delete Delivery Person Account</router-link>
      <button class="sidebar-logout-btn" @click="handleLogout()">Logout</button>

    </div>
  <div class="register-container">
    <div class="register-form-container">
     
      <form
        id="registerForm"
        @submit="handleSubmit"
        novalidate
        autocomplete="off"
      >
      <!-- <router-link @click="scrollToTop()" to="admin/dashboard" class="btn  col-6 col-md-12 col-sm-12 "
          >back to dashboard</router-link
        > -->
        <h2>create delivery account</h2>
        <div class="form-group">
          <p class="error-mess" v-if="errorObj.emailErr.length > 0">
            {{ errorObj.emailErr[0] }}
          </p>
          <input
            type="email"
            name="aEmail"
            placeholder="example@gmail.com"
            id="aEmail"
            class="form-control"
            v-model="registerObj.email"
          />
          
        </div>

        <div class="form-group">
          <input
          :type="showPassword ? 'text' : 'password'"
            name="aPass"
            placeholder="enter your password"
            id="aPass"
            class="form-control"
            v-model="registerObj.pass"
          />
          <p class="error-mess" v-if="errorObj.passErr.length > 0">
            {{ errorObj.passErr[0] }}
          </p>
        </div>

        <div class="form-group">
          <input
          :type="showPassword ? 'text' : 'password'"
            name="aPassConfirm"
            placeholder="enter your password again"
            id="aPassConfirm"
            class="form-control"
            v-model="registerObj.confirm"
          />
          <p class="error-mess" v-if="errorObj.confirmErr.length > 0">
            {{ errorObj.confirmErr[0] }}
          </p>
        </div>
        <!-- Show Password radio button -->
      <label>
        <input type="checkbox" v-model="showPassword" value="true"> Show Password
      </label>

        <div class="form-group">
          <input :disabled="isFormValid" type="submit" value="create account" class="btn r" />
          <p>
            have an account?
            <router-link @click="scrollToTop()" to="dplogin">login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  watch: {
  },
  name: "DpRegister",

  data() {
    return {
      registerObj: { email: "", pass: "", confirm: "" },
      errorObj: { emailErr: [], passErr: [], confirmErr: [] },
      matchDp: undefined,
      matchDpEmail: undefined,
      matchUser: undefined,
      showPassword: false,
    };
  },
 created() {
        if(!this.admin){
            this.$router.push("/")
        }
    },

    computed:{
      ...mapState(["admin"]),
      isFormValid(){
            return !this.registerObj.email || !this.registerObj.pass || !this.registerObj.confirm;
        }
    },
  methods: {
      ...mapMutations(["setDp"]),
       handleLogout: function () {
      this.setAdmin("");
    },

    async getmatchDp(email) {
      let data = await axios.get("/dp/" + email);
      this.matchDp = data.data;
      console.log('dp data ',data.dp_email);
    },
    async getMatchDpEmail(email) {
            let data = await axios.get('/ademail/' + email);
            this.matchDpEmail = data.data;
        },
        async getMatchUser(email) {
      let data = await axios.get("/user-email/" + email);
      this.matchUser = data.data;
      console.log(this.matchUser);
    },

    async backtodashboard(){
        this.$router.push("/admin/dashboard");
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    resetCheckErr: function () {
      this.errorObj.emailErr = [];
      this.errorObj.passErr = [];
      this.errorObj.confirmErr = [];
    },

    checkEmptyErr: function () {
      for (var typeErr in this.errorObj) {
        if (this.errorObj[typeErr].length != 0) {
          return false;
        }
      }
      return true;
    },

    checkForm: function () {
      this.resetCheckErr();

      if (!this.registerObj.email) {
        this.errorObj.emailErr.push("email is required");
      } else {
        if (
          !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(
            this.registerObj.email
          )
        ) {
          this.errorObj.emailErr.push("Email must be valid");
        }
      }

      // Pass validate
      if (!this.registerObj.pass) {
        this.errorObj.passErr.push("Password is required");
      } else {
        if (!/[!@#$%^&*]/.test(this.registerObj.pass)) {
          this.errorObj.passErr.push(
            "Password must contain at least 1 special character"
          );
        }

        if (this.registerObj.pass.length < 8) {
          this.errorObj.passErr.push(
            "Password must be more than or equal 8 characters"
          );
        }
      }

      // Confirm Pass validate
      if (!this.registerObj.confirm) {
        this.errorObj.confirmErr.push("Confirm password is required");
      } else {
        if (this.registerObj.pass !== this.registerObj.confirm) {
          this.errorObj.confirmErr.push(
            "Confirm password must be match with password"
          );
        }
      }
    },

    async handleSubmit(e) {
      this.checkForm();

      if (!this.checkEmptyErr()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        await this.getmatchDp(this.registerObj.email);
        await this.getMatchDpEmail(this.registerObj.email);
        await this.getMatchUser(this.registerObj.email);
        if (this.matchDp || this.matchDpEmail || this.matchUser) {
          this.errorObj.emailErr.push("Account already exist");
        } else {
          let data = {
            dp_email: this.registerObj.email,
            dp_password: this.registerObj.pass,
          };
          await axios.post("/dp/", data);
          this.$router.push("/dplogin");
        }
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  padding: 15rem 9%;
}

.register-container .register-form-container {
  background: #fff;
}

.register-container .register-form-container form {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  max-width: 40rem;
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

.register-container .register-form-container form .form-control {
  margin: 0.7rem 0;
  border-radius: 0.5rem;
  background: #f7f7f7;
  padding: 2rem 1.2rem;
  font-size: 1.6rem;
  color: #130f40;
  text-transform: none;
  width: 100%;
  border: none;
}

.register-container .register-form-container form label {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

.register-container .register-form-container form span {
  font-size: 18px;
  padding-left: 5px;
  padding-right: 40px;
}

.register-container .register-form-container form .btn {
  margin: 1rem 0;
  width: 100%;
  text-align: center;
}

.register-container .register-form-container form p {
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}

.register-container .register-form-container form p a {
  color: #d54d52;
}

.register-container .register-form-container form p a:hover {
  color: #130f40;
  text-decoration: underline;
}

.register-container .register-form-container form .form-group {
  margin: 0;
}

.register-container .register-form-container form .form-group .error-mess {
  font-size: 1.5rem;
  position: relative;
  color: #ff0000;
  margin: 0;
  padding: 0;
}
.b-r{
  border-radius: 0;
}
.r{
    background-color: #c1282d;
}
.r:hover{
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