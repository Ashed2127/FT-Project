<template>
  <div class="login-container">
    <div class="login-form-container">
      <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
        <span class="size">{{ langObj[this.newLangStatus].words[0] }}</span>

        <div v-if="errors.length" class="error-box">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="form-group">
          <input
            type="email"
            id="aEmail"
            name="aEmail"
            class="form-control"
            :placeholder="langObj[this.newLangStatus].words[1]"
            v-model="loginObj.email"
            
          />
        </div>

        <div class="form-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="aPass"
            name="aPass"
            class="form-control"
            :placeholder="langObj[this.newLangStatus].words[2]"
            v-model="loginObj.pass"
          />
        </div>
        <!-- Show Password radio button -->
      <label>
        <input type="checkbox" v-model="showPassword" value="true"> Show Password
      </label>

<!-- v-bind:class="{'hidden': loginObj.email == 0 && loginObj.pass == 0 }" -->

        <div class="form-group">
          <input :disabled="isFormValid" type="submit" :value="langObj[this.newLangStatus].words[3]" class="btn g"  />
          <p v-if="user">
            {{ langObj[this.newLangStatus].words[4] }}
            <router-link @click="scrollToTop()" to="/dpregister"
              >{{ langObj[this.newLangStatus].words[5] }}
            </router-link>
          </p>
        </div>
         <div class="z-0"></div>
      <div class="z-1"></div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "DpLogin",

  data() {
    return {
      loginObj: { email: "", pass: "" },
      matchDp: undefined,
      errors: [],
      langObj: [
                { words: ["welcome to deliver","enter your email","enter your password","login to your account","don't have an account? ", "Create account"
            ] },
                { words: ["baga nagaan dhufte geessuuf", "email keessan galchaa", "jecha icciitii keessan galchaa", "akkaawuntii keessanitti seena","account hin qabdan?","Akkaawuntii uumi"] },
            ],
      newLangStatus : 0,
      showPassword: false,
    };
  },
  computed: {
    ...mapState(["admin", "dp"]),
    isFormValid(){
            return !this.loginObj.email || !this.loginObj.pass;
        },
  },
  // mounted() {
  //   if (!this.admin) {
  //     this.$router.push("/");
  //   }
  // },
  created(){
    this.getStatus();
  },
   mounted: function () {
        this.autoUpdate(); 
        window.addEventListener('scroll', this.handleScroll);
    },

  methods: {
    ...mapMutations(["setDp"]),

    scrollToTop() {
      window.scrollTo(0, 0);
    },

    async getmatchDp(email) {
      let data = await axios.get("/dp/" + email);
      this.matchDp = data.data;
    },

    async handleSubmit(e) {
      this.errors = [];

      if (!this.loginObj.email) {
        this.errors.push("email is required");
      } else {
        if (
          !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)
        ) {
          this.errors.push("Email must be valid");
        }
      }

      if (!this.loginObj.pass) {
        this.errors.push("Password is required");
      }

      if (!this.errors.length == 0) {
        e.preventDefault();
      } else {
        e.preventDefault();
        await this.getmatchDp(this.loginObj.email);
        if (!this.matchDp) {
          this.errors.push("Incorrect email or password!");
        } else {
          if (this.matchDp.dp_password === this.loginObj.pass) {
            this.matchDp.dp_password = "";
            this.setDp(this.matchDp);
            this.$router.push("/admin/DpDashboard");
          } else {
            this.errors.push("Incorrect email or password!");
          }
        }
      }
    },
     async getStatus(){
          let langStatus = await axios.get('/langstatus/', this.languageStatus);
          this.newLangStatus = langStatus.data[0].langstatus;
        //   console.log(this.newLangStatus);
        //   console.log(this.langObj[this.newLangStatus].words[0] )
        
        },
        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getStatus();
            }.bind(this), 50);
        }
  },
};
</script>

<style scoped>
.login-container {
  padding: 2rem 9%;
    background-color: #e8f0fe;

}

.login-container .login-form-container {
      background-color: #e8f0fe;

  height: 90vh;
}

.login-container .login-form-container form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: 100%;
     box-shadow: 0 20px 25px rgba(0, 0, 0, 0.4);

  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.5rem;
  animation: fadeUp 0.4s linear;
  background-color: white;
}

.login-container .login-form-container form h3 {
  padding-bottom: 1rem;
  font-size: 2rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: #130f40;
  margin: 0;
}

.login-container .login-form-container form .form-control {
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

.login-container .login-form-container form .btn {
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.login-container .login-form-container form p {
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}

.login-container .login-form-container form p a {
  color: #d54d52;
}

.login-container .login-form-container form p a:hover {
  color: #130f40;
  text-decoration: underline;
}

.login-container .login-form-container form .error-box {
  background-color: #fff9fa;
  box-sizing: border-box;
  border: 2px solid rgba(255, 66, 79, 0.2);
  border-radius: 2px;
  font-size: 12px;
  margin-bottom: 20px;
}

.login-container .login-form-container form .error-box ul {
  list-style-type: none;
  margin: 0;
  padding: 10px 0px;
}

.login-container .login-form-container form .error-box ul li {
  padding-left: 10px;
  color: rgb(182, 0, 0);
}
.g {
    background-color: #489e02;

}
.g:hover {
  background-color: #59ac16;
}

.z-0 {
  background-color: #489e02;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(-20deg); /* Rotate the element */
  position: absolute;
  top: 0;
  right: 0%;
  width: 1%;
  height: 20px;
  z-index: -1;
}

.z-1{
  background-color: #ff0101;
 padding: 15px; /* Adjust padding as needed */
  transform: skewY(-20deg);
   /* Rotate the element */
  position: absolute;
  bottom: 0;
  left: 0%;
  width: 1%;
  height: 10px;
  z-index: -1;
}
.hidden{
  background-color:rgb(143, 204, 94)d;
}
.size{
  font-size: large;
}
</style>
