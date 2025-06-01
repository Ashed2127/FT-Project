<template>
    <div class="login-container">
        <div class="login-form-container">
            <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>ADMIN LOGIN</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="email" id="aEmail" name="aEmail" class="form-control" placeholder="enter your email"
                        v-model="loginObj.email" />
                </div>

                <div class="form-group">
                    <input :type="showPassword ? 'text' : 'password'" id="aPass" name="aPass" class="form-control"
                        placeholder="enter your password" v-model="loginObj.pass" />
                </div>
                   <!-- Show Password radio button -->
                 <label>
                   <input type="checkbox" v-model="showPassword" value="true"> Show Password
                 </label>

                <div class="form-group">
                    <input :disabled="isFormValid" type="submit" value="login now" class="btn brwn">
                    <!-- <p >don't have an account? <router-link @click="scrollToTop()" to="adminregister">create one
                        </router-link>
                    </p> -->
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    name: 'AdminLogin',

    data() {
        return {
            loginObj: { email: "", pass: "" },
            matchAdmin: undefined,
            errors: [],
            showPassword: false,
        }
    },
 computed: {
         isFormValid(){
            return !this.loginObj.email || !this.loginObj.pass;
        }},
    methods: {
        ...mapMutations(["setAdmin"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getmatchAdmin(email) {
            let data = await axios.get('/admin/' + email);
            this.matchAdmin = data.data;
        },

        async handleSubmit(e) {
            this.errors = [];

            if (!this.loginObj.email) {
                this.errors.push("email is required");
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)) {
                    this.errors.push('Email must be valid');
                }
            }


            if (!this.loginObj.pass) {
                this.errors.push('Password is required');
            }

            if (!this.errors.length == 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                await this.getmatchAdmin(this.loginObj.email);
                if (!this.matchAdmin) {
                    this.errors.push("Incorrect email or password!")
                }
                else {
                    if (this.matchAdmin.admin_password === this.loginObj.pass) {
                        this.matchAdmin.admin_password = "";
                        this.setAdmin(this.matchAdmin);
                        this.$router.push("/admin/Dashboard");
                        
                    }
                 
                    else {
                        this.errors.push("Incorrect email or password!")
                    }
                }
            }
        }

    }

}
</script>

<style scoped>
.login-container {
    padding: 2rem 9%;
}

.login-container .login-form-container {
    background-color: #fff;
    height: 90vh;
}

.login-container .login-form-container form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
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

.brwn{
    background-color: #c1282d;
}
.brwn:hover{
  background-color: #c73b40;
}
</style>