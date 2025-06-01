<template>
    
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />

    <div class="login-container">
        <div class="login-form-container">

            <!-- old form -->
<!-- 
            <form v-if="user" id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">

                <span class="size">{{ langObj[this.newLangStatus].words[0] }}</span>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="email" id="uEmail" name="uEmail" class="form-control" :placeholder="langObj[this.newLangStatus].words[1]"
                        v-model="loginObj.email" />
                </div>

                <div class="form-group">
                    <input type="password" id="uPass" name="uPass" class="form-control"
                        :placeholder="langObj[this.newLangStatus].words[2]" v-model="loginObj.pass" />
                </div>

                <div class="form-group">
                    <input type="submit" :value="langObj[this.newLangStatus].words[3]" class="btn g">
                    <p>{{ langObj[this.newLangStatus].words[4] }}<router-link @click="scrollToTop()" to="/register">{{ langObj[this.newLangStatus].words[5] }}
                        </router-link>
                    </p>
                    <p>{{ langObj[this.newLangStatus].words[6] }} <router-link @click="scrollToTop()" to="/dplogin">{{ langObj[this.newLangStatus].words[7] }} </router-link>  </p>
                </div>
      <div class="z-0"></div>
      <div class="z-1"></div>
                
            </form>

             <form v-else id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">

                <span class="size">{{ langObj[this.localLangStatus].words[0] }}</span>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="email" id="uEmail" name="uEmail" class="form-control" :placeholder="langObj[this.localLangStatus].words[1]"
                        v-model="loginObj.email" />
                </div>

                <div class="form-group">
                    <input type="password" id="uPass" name="uPass" class="form-control"
                        :placeholder="langObj[this.localLangStatus].words[2]" v-model="loginObj.pass" />
                </div>

                <div class="form-group">
                    <input :disabled="isFormValid" type="submit" :value="langObj[this.localLangStatus].words[3]" class="btn g">
                    <p>{{ langObj[this.localLangStatus].words[4] }}<router-link @click="scrollToTop()" to="/register">{{ langObj[this.localLangStatus].words[5] }}
                        </router-link>
                    </p>
                    <p>{{ langObj[this.localLangStatus].words[6] }} <router-link @click="scrollToTop()" to="/dplogin">{{ langObj[this.localLangStatus].words[7] }} </router-link>  </p>
                </div>
      <div class="z-0"></div>
      <div class="z-1"></div>
                
            </form> -->


            <!-- new form -->
            <form v-if="user" id="loginForm" @submit.prevent="handleSubmit" novalidate autocomplete="off">
    <span class="size">{{ langObj[this.newLangStatus].words[0] }}</span>
    <div v-if="errors.length" class="error-box">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div class="form-group">
      <input type="email" id="uEmail" name="uEmail" class="form-control" :placeholder="langObj[this.newLangStatus].words[1]" v-model="loginObj.email" />
    </div>
    <div class="form-group">
      <input type="password" id="uPass" name="uPass" class="form-control" :placeholder="langObj[this.newLangStatus].words[2]" v-model="loginObj.pass" />
      <!-- Show Password checkbox -->
      <label>
        <input type="checkbox" v-model="showPassword"> Show Password
      </label>
    </div>
    <div class="form-group">
      <input type="submit" :value="langObj[this.newLangStatus].words[3]" class="btn g">
      <p>{{ langObj[this.newLangStatus].words[4] }}<router-link @click="scrollToTop()" to="/register">{{ langObj[this.newLangStatus].words[5] }}</router-link></p>
      <p>{{ langObj[this.newLangStatus].words[6] }} <router-link @click="scrollToTop()" to="/dplogin">{{ langObj[this.newLangStatus].words[7] }}</router-link></p>
    </div>
  </form>

  <!-- Guest form -->
  <form v-else id="loginForm" @submit.prevent="handleSubmit" novalidate autocomplete="off">
    <span class="size">{{ langObj[this.localLangStatus].words[0] }}</span>
    <div v-if="errors.length" class="error-box">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div class="form-group">
      <input type="email" id="uEmail" name="uEmail" class="form-control" :placeholder="langObj[this.localLangStatus].words[1]" v-model="loginObj.email" />
    </div>
    <div class="form-group">
      <input  :type="showPassword ? 'text' : 'password'" id="uPass" name="uPass" class="form-control" :placeholder="langObj[this.localLangStatus].words[2]" v-model="loginObj.pass" />
      <!-- Show Password radio button -->
      <label>
        <input type="checkbox" v-model="showPassword" value="true"> {{this.langObj[this.localLangStatus].words[11]}}
      </label>
    </div>
    <div class="form-group">
      <input :disabled="isFormValid" type="submit" :value="langObj[this.localLangStatus].words[3]" class="btn g">
      <p>{{ langObj[this.localLangStatus].words[4] }}<router-link @click="scrollToTop()" to="/register">{{ langObj[this.localLangStatus].words[5] }}</router-link></p>
      <p>{{ langObj[this.localLangStatus].words[6] }} <router-link @click="scrollToTop()" to="/dplogin">{{ langObj[this.localLangStatus].words[7] }}</router-link></p>
    </div>
  </form>

        </div>

    </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
export default {
    name: 'Login',

    data() {
        return {
            loginObj: { email: "", pass: "" },
            matchUser: undefined,
            errors: [],

            languageStatus : 0,
            langObj: [
                { words: ["welcome to order and reserve","enter your email","enter your password","login to your account","don't have an account? ","create account","for deliver person", "login", "email is required","Email must be valid","Incorrect email or password!","Show Password"
            ] },
                    
                    { words: ["baga nagaan dhuftan ajajuu fi reserve gochuuf", "email keessan galchaa", "jecha icciitii keessan galchaa", "akkaawuntii keessanitti seena", "account hin qabdan? ", "account uumuu", "nama geessuu","seenuu", "email barbaachisa","Email sirrii ta'uu qaba","Imeelii ykn jecha icciitii sirrii hin taane!","Jecha Darbii Agarsiisi"] },
            ],
            newLangStatus : 0,
            interval: "",
            localLangStatus: null,
            showPassword: false,
                }
    },
    created() {
        this.getStatus();
        const storedLangStatus = localStorage.getItem('newLangStatus');
        if (storedLangStatus !== null) {
        this.localLangStatus = parseInt(storedLangStatus, 10);
    }
    },
    mounted: function () {
        this.autoUpdate(); 
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        clearInterval(this.interval);
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
         isFormValid(){
            return !this.loginObj.email || !this.loginObj.pass;
        },
    },
    methods: {
        ...mapMutations(["setUser"]),
       
        scrollToTop() {
            window.scrollTo(0, 0);
                
        },

        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },

        async handleSubmit(e) {
            this.errors = [];

            if (!this.loginObj.email && localStorage == 0) {
                this.errors.push('email is required');
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)) {
                    this.errors.push(this.langObj[this.localLangStatus].words[9]);
                }
            }


            if (!this.loginObj.pass) {
                this.errors.push('Password is required');
            }

            if (!this.errors.length === 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                 
                await this.getMatchUser(this.loginObj.email);
                if (!this.matchUser) {
                    this.errors.push(this.langObj[this.localLangStatus].words[10])
                }
                else {
                    
                    if (this.matchUser.user_password === this.loginObj.pass) {
                        this.matchUser.user_password = "";
                        
                        this.setUser(this.matchUser);
                       axios.put("/loadstatus/" + this.loginObj.email, this.localLangStatus )
                        // this.$refs.alert.showAlert('Booking Successfully !')
                        
                        this.$router.push("/");
                  
                    // const currentStatus = localStorage.getItem('newLangStatus');
                    //    await axios.post("/updatelanggstatus/" + this.user.user_id, { langstatus: currentStatus });

                    }
                    
                    else {
                        this.errors.push(this.langObj[this.localLangStatus].words[10])
                    }
                       
                }
            }
        },
        
        async getStatus(){
            
          const langStatus = await axios.get('/langstatus/' + this.user.user_id);
          this.newLangStatus = langStatus.data[0].langstatus;
        //   console.log(this.newLangStatus);
        //   console.log(this.langObj[this.newLangStatus].words[0] )
        
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getStatus();
            }.bind(this), 50);
        }
    }
    ,

components: {
    VueBasicAlert
}
    
}


</script>

<style scoped>
.login-container {
    padding: 2rem 9%;
    background-color: #e8f0fe;
}

.login-container .login-form-container {
    height: 90vh;
    background-color: #e8f0fe;

}

.login-container .login-form-container form {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40rem;
    width: 100%;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.4);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: .5rem;
    animation: fadeUp .4s linear;
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
    margin: .7rem 0;
    border-radius: .5rem;
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
    border: 2px solid rgba(255, 66, 79, .2);
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
.size{
  font-size:medium
}
</style>