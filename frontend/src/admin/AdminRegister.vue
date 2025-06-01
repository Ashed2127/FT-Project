<template>
  <div class="register-container">
    <div class="register-form-container">
      <form
        id="registerForm"
        @submit="handleSubmit"
        novalidate
        autocomplete="off"
      >
        <h3>Create Admin Account</h3>
      <p class="error-mess" v-if="errorObj.emailErr.length > 0">
                  {{ errorObj.emailErr[0] }}
                </p>
        <div class="form-group">
          <!-- <label for="aEmail">Enter your email: </label> -->
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
          <!-- <label for="aPass">Enter your password: </label> -->
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
          <!-- <label for="aPassConfirm">Check your password again: </label> -->
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
          <input :disabled="isFormValid" type="submit" value="create account" class="btn brwn" />
          <!-- <p>
            have an account?
            <router-link @click="scrollToTop()" to="adminlogin"
              >login</router-link
            >
          </p> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "AdminRegister",

  data() {
    return {
      registerObj: { email: "", pass: "", confirm: "" },
      errorObj: { emailErr: [], passErr: [], confirmErr: [] },
      matchUser: undefined,
      matchEmail: undefined,
      adminData: [],
      showPassword: false,
    };
  },
  async mounted() {
    const response = await axios.get("/alladmindata/");
    this.adminData = response.data;
    if (this.adminData) {
      this.$router.push("/");
    } else if (!this.adminData) {
      this.$router.push("/adminregister");

    }
  },
  // mounted: async function () {
  //    const response = await axios.get("/alladmindata/");
  //       this.adminData = response.data;
  //   if (this.adminData) {
  //     this.$router.push("/");
  //   }
  //   else {
  //     this.$router.push("/adminregister");
  //   }

  // },
  computed: {
    ...mapState(["admin"]),
    isFormValid(){
            return !this.registerObj.email || !this.registerObj.pass || !this.registerObj.confirm;
        }
  },
  methods: {
    async getMatchUser(email) {
      let data = await axios.get("/admin/" + email);
      this.matchUser = data.data;
      console.log(this.matchUser);
    },

    async getMatchEmail(email) {
            let data = await axios.get('/user-email/' + email);
            this.matchEmail = data.data;
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

      // Email validate
      if (!this.registerObj.email) {
        this.errorObj.emailErr.push("Entering a email is required");
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

    // async getAdminData() {
    //   try {
    //     const response = await axios.get("/alladmindata/");
    //     this.adminData = response.data;
    //     console.log(this.adminData);
    //     // if (this.adminData.length > 0) {
    //     //     this.$router.push("/");
    //     // }
    //   } catch (error) {
    //     console.error("Error fetching admin data:", error);
    //   }
    // },

    async handleSubmit(e) {
      this.checkForm();

      if (!this.checkEmptyErr()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        await this.getMatchUser(this.registerObj.email);
        await this.getMatchEmail(this.registerObj.email);
        if (this.matchUser || this.matchEmail) {
          this.errorObj.emailErr.push("Account already exist");
        } else {
          let data = {
            admin_email: this.registerObj.email,
            admin_password: this.registerObj.pass,
          };
          await axios.post("/admin/", data);
          this.$router.push("/adminlogin");

        }
      }
    },

    // async getAdminData(){
    //     const adminData = (await axios.get("/alladmindata/"), this.adminData);
    //     console.log(adminData.data);
    // }
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
  max-width: 70rem;
  width: 400px;
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
  color: #ff0404;
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

.brwn {
  background-color: #c1282d;
}
.brwn:hover{
  background-color: #c73b40;
}
</style>
