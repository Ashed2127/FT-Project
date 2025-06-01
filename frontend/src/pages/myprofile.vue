<template>
    <!-- <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" /> -->

    <div class="register-container">
        <div class="register-form-container">
            <form v-if="user" id="registerForm row"  novalidate autocomplete="off">
          <div class="admin-profile">   <i class="fas fa-user"></i></div>

                <span>{{ langObj[this.newLangStatus].words[0] }}</span>
                <div class="form-group col-md-12">
                    <!-- <label for="uName">{{ langObj[this.newLangStatus].words[1] }}
                    </label> -->
                    <input type="text" name="uName"  id="uName" class="form-control"
                    :value="fName" />
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uName">{{ langObj[this.newLangStatus].words[14] }}
                    </label> -->
                    <input type="text" name="uName"  id="uName" class="form-control"
                    :value="lName" />
                </div>
                


                <div class="form-group col-md-12">
                    <!-- <label for="uEmail">{{ langObj[this.newLangStatus].words[3] }}
                    </label> -->
                    <input type="email" name="uEmail"  id="uEmail" class="form-control"
                    :value="email" />
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uPass">{{ langObj[this.newLangStatus].words[5] }}
                    </label> -->
                    <input type="password" name="uPass"  id="uPass"
                        class="form-control"  :value="password" />
                </div>

                <!-- <div class="form-group col-md-12">
                    <label for="uPassConfirm">{{ langObj[this.newLangStatus].words[7] }}
                    </label>
                    <input type="password" name="uPassConfirm" :placeholder="this.user.user_password " id="uPassConfirm"
                        class="form-control" v-model="this.user.user_password " />
                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
                </div> -->

                <div class="form-group col-md-12">
                    <!-- <label for="uPhone">{{ langObj[this.newLangStatus].words[9] }}
                    </label> -->
                    <input type="tel" name="uPhone" id="uPhone"
                        class="form-control"  :value="phone" />
                </div>

                <div class="form-group col-md-12">
                    <!-- <input type="submit" :value="langObj[this.newLangStatus].words[11]" class="btn g" />
                    <p>{{ langObj[this.newLangStatus].words[12] }} <router-link @click="scrollToTop()" to="/login">{{ langObj[this.newLangStatus].words[13] }}</router-link>
                    </p>
                    <div class="dp pb-3"></div> -->
                    
                    <input type="button" id="myButton">
                </div>
            </form>


















            <!-- update form -->
            <form v-if="user" id="registerForm row" @submit="handleSubmit" novalidate autocomplete="off" class="update-form">
                <span>{{ langObj[this.newLangStatus].words[16] }}</span>
                <div class="form-group col-md-12">
                    <!-- <label for="uName">{{ langObj[this.newLangStatus].words[1] }}
                    </label> -->
                    <input type="text" name="uName" :placeholder="langObj[this.newLangStatus].words[2] " id="uName" class="form-control"
                        v-model="registerObj.fname" />
                    <p class="error-mess" v-if="errorObj.fName.length > 0">{{ errorObj.fName[0] }}</p>
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uName">{{ langObj[this.newLangStatus].words[14] }}
                    </label> -->
                    <input type="text" name="uName" :placeholder="langObj[this.newLangStatus].words[15] " id="uName" class="form-control"
                        v-model="registerObj.lname" />
                    <p class="error-mess" v-if="errorObj.lName.length > 0">{{ errorObj.lName[10] }}</p>
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uEmail">{{ langObj[this.newLangStatus].words[3] }}
                    </label> -->
                    <input type="email" name="uEmail" :placeholder="langObj[this.newLangStatus].words[4]" id="uEmail" class="form-control"
                        v-model="registerObj.email" />
                    <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{ errorObj.emailErr[0] }}</p>
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uPass">{{ langObj[this.newLangStatus].words[5] }}
                    </label> -->
                    <input :type="showPassword ? 'text' : 'password'" name="uPass" :placeholder="langObj[this.newLangStatus].words[6]" id="uPass"
                        class="form-control" v-model="registerObj.pass" />
                    <p class="error-mess" v-if="errorObj.passErr.length > 0">{{ errorObj.passErr[0] }}</p>
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uPassConfirm">{{ langObj[this.newLangStatus].words[7] }}
                    </label> -->
                    <input :type="showPassword ? 'text' : 'password'" name="uPassConfirm" :placeholder="langObj[this.newLangStatus].words[8]" id="uPassConfirm"
                        class="form-control" v-model="registerObj.confirm" />
                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
                </div>

                <div class="form-group col-md-12">
                    <!-- <label for="uPhone">{{ langObj[this.newLangStatus].words[9] }}
                    </label> -->
                    <input type="tel" name="uPhone" :placeholder="langObj[this.newLangStatus].words[10]" id="uPhone"
                        class="form-control" v-model="registerObj.phone" />
                    <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
                </div>
                <label>
   <input type="checkbox" v-model="showPassword" value="true"> {{this.langObj[this.localLangStatus].words[18]}}
                </label>
                <div class="form-group col-md-12">
                    <input type="submit" :value="langObj[this.newLangStatus].words[11]" class="btn g" />

                    
                    <!-- <div class="dp pb-3"></div> -->
                    
                    <input type="button" id="myButton">
                </div>
            </form>

            <!-- Delete Account -->
 <!-- update form -->
 <form v-if="user" id="registerForm row" @submit="deleteSubmit" novalidate autocomplete="off" class="update-form">
               <span>{{langObj[this.newLangStatus].words[17]}}</span>
                <div class="form-group col-md-12">
                    <!-- <label for="uEmail">{{ langObj[this.newLangStatus].words[3] }}
                    </label> -->
                    <input type="email" name="uEmail" :placeholder="langObj[this.newLangStatus].words[4]" id="uEmail" class="form-control"
                        v-model="deleteObj.email" />
                    <!-- <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{ errorObj.emailErr[0] }}</p> -->
                </div>


                <div class="form-group col-md-12">
                    <input :type="showPassword1 ? 'text' : 'password'" name="uPass" :placeholder="langObj[this.newLangStatus].words[6]" id="uPass"
                        class="form-control" v-model="deleteObj.pass" />
                </div>

              
                <label>
                   <input type="checkbox" v-model="showPassword1" value="true"> {{this.langObj[this.localLangStatus].words[18]}}
                </label>
                <div class="form-group col-md-12">
                    <input type="submit" :disabled="isFormValid" :value="langObj[this.newLangStatus].words[17]" class="btn r" />

                    
                    <!-- <div class="dp pb-3"></div> -->
                    
                    <input type="button" id="myButton">
                </div>
            </form>
        </div>
      <!-- <div class="z-0"></div>
      <div class="z-1"></div>
      <div class="z-2"></div> -->

    </div>
</template>

<script>
import axios from 'axios';
// import VueBasicAlert from 'vue-basic-alert';
import { mapState } from "vuex";
export default {
    name: "myprofile",

    data() {
        return {
            registerObj: { fname: "",lname: "", email: "", pass: "", confirm: "", phone: ""},
            errorObj: { fName:[], lName:[], emailErr: [], passErr: [], confirmErr: [], phoneErr: [] },
            matchUser: undefined,
            macthPhone: undefined,
            languageStatus : 0,
            langObj: [
                { words: ["my profile","Enter your name:","your first name","Enter your email:","example@gmail.com","Enter your password:","enter your password","Check your password again:","enter your password again","Enter your phone number:","enter your phone number","update account","have an account?","login", "Enter your name:","your last name","update my profile","delete account","Show Password"
] },
                    
                    { words: ["Akkaawuntii uumi", "Maqaa kee galchi:","maqaa kee isa jalqabaa", "Email keessan galchaa:","fakkeenyaaf@gmail.com", "Jecha icciitii keessan galchaa:","jecha icciitii keessan galchaa", "Jecha icciitii keessan irra deebi'aa ilaalaa:","irra deebi'ii jecha icciitii kee galchi", "Lakkoofsa bilbila keessanii galchaa:","lakkoofsa bilbila keessanii galchaa", "account uumuu", "akkaawuntii qabduu?","seenuu", "Maqaa kee galchi:", "maqaa kee isa dhumaa","profile koo update godha","account haquu","Jecha Darbii Agarsiisi"] },
            ],
            newLangStatus : 0,
            interval: "",
            localLangStatus: null,
            engIndex: null,
            showPassword: false,
            showPassword1: false,
            
            fName: "",
            lName: "",
            email: "",
            phone: "",
            password: "",
            deleteObj: {  email: "", pass: ""},

        }
    },
    created() {
        // this.deleteSubmit();
        this.getStatus();
         const storedLangStatus = localStorage.getItem('newLangStatus');
        if (storedLangStatus !== null) {
        this.localLangStatus = parseInt(storedLangStatus, 10);
    }
        this.engIndex = this.localLangStatus;

        if (!this.user) {
      this.$router.push("/");
    }
    },
    mounted: function () {
        this.getUserEmail();
        // this.deleteSubmit();
        this.getUserPhone();
        this.getUserFirstName();
        this.getUserLastName();
        this.getUserPassword();
        this.autoUpdate(); 
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        clearInterval(this.interval);
        window.removeEventListener('scroll', this.handleScroll);
    },

    computed: {
        ...mapState(["user"]),
         isFormValid(){
            return  this.deleteObj.email.length < 1 || this.deleteObj.pass.length < 1 ;
        },
    },
    methods: {


        async getUserFirstName() {
      if (this.user) {
        let fName = await axios.get("/userfname/" + this.user.user_id);
        console.log(fName.data.user_fname);
        this.fName = fName.data.user_fname;
        return fName.data.user_fname;
      }
    },

    async getUserLastName() {
      if (this.user) {
        let lName = await axios.get("/userlname/" + this.user.user_id);
        console.log(lName.data.user_lname);
        this.lName = lName.data.user_lname;
        return lName.data.user_lname;
      }
    },
    async getUserEmail() {
      if (this.user) {
        let email = await axios.get("/useremail/" + this.user.user_id);

        this.email = email.data.user_email;
        return email.data.user_email;
      }
    },
    async getUserPassword() {
      if (this.user) {
        let password = await axios.get("/userpassword/" + this.user.user_id);

        this.password = password.data.user_password;
        return password.data.user_password;
      }
    },

    async getUserPhone() {
      if (this.user) {
        let phone = await axios.get("/userphone/" + this.user.user_id);

        this.phone = phone.data.user_phone;
        return phone.data.user_phone;
      }
    },

  
        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },
        async getMatchPhone(phone){
            let data = await axios.get('/usersphone/' + phone);
            this.macthPhone = data.data;
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        resetCheckErr: function () {
            this.errorObj.fName = [];
            this.errorObj.lName = [];
            // this.errorObj.nameErr = [];
            this.errorObj.emailErr = [];
            this.errorObj.passErr = [];
            this.errorObj.confirmErr = [];
            this.errorObj.phoneErr = [];
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

            // Name validate
            if (!this.registerObj.fname) {
                this.errorObj.fName.push("Entering a first name is required");
            }
          
            if (!this.registerObj.lname) {
                this.errorObj.lName.push("Entering a last name is required");
            }
            else {
                if (!/^[A-Za-z]+$/.test(this.registerObj.fname.replace(/\s/g, ""))) {
                    this.errorObj.fName.push('A name can only contain letters');
                }
                else if (!/^[A-Za-z]+$/.test(this.registerObj.lname.replace(/\s/g, ""))) {
                    this.errorObj.lName.push('A name can only contain letters');
                }
            }

            // Email validate
            if (!this.registerObj.email) {
                this.errorObj.emailErr.push("Entering a email is required");
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.registerObj.email)) {
                    this.errorObj.emailErr.push('Email must be valid');
                }
            }

            // Pass validate
            if (!this.registerObj.pass) {
                this.errorObj.passErr.push('Password is required');
            }
            else {
                if (!/[!@#$%^&*]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('Password must contain at least 1 special character');
                }

                if (this.registerObj.pass.length < 8) {
                    this.errorObj.passErr.push('Password must be more than or equal 8 characters');
                }
            }

            // Confirm Pass validate
            if (!this.registerObj.confirm) {
                this.errorObj.confirmErr.push('Confirm password is required');
            }
            else {
                if (this.registerObj.pass !== this.registerObj.confirm) {
                    this.errorObj.confirmErr.push('Confirm password must be match with password');
                }
            }


            // Phone validate
            if (!this.registerObj.phone) {
                this.errorObj.phoneErr.push('Entering phone number is required');
            }
            else {
                if (!this.registerObj.phone.startsWith('09')) {
                    this.errorObj.phoneErr.push('Phone numbers must start with 09');
                }
                // if (!this.registerObj.phone.startsWith('07')){
                //     this.errorObj.phoneErr.push('Phone numbers must start with 07');

                // }
                
                if (this.registerObj.phone.length != 10) {
                    this.errorObj.phoneErr.push('Phone numbers must have exactly 10 digits');
                }

                if (!/[0-9]{10}/.test(this.registerObj.phone)) {
                    this.errorObj.phoneErr.push('Phone numbers can only contain numbers');
                }
            }

         },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();
                await this.getMatchUser(this.registerObj.email);
                await this.getMatchPhone(this.registerObj.phone);
                // if (this.matchUser || this.macthPhone) {
                //     this.errorObj.emailErr.push("Account already exist")
                // }
                // else if (this.matchPhone) {
                //     this.errorObj.phoneErr.push("Phone number already exist")
                // }

                // else {
                    let data = {
                        // user_id: this.user.user_id,
                        user_fname: this.registerObj.fname,
                        user_lname: this.registerObj.lname,
                        user_email: this.registerObj.email,
                        user_phone: this.registerObj.phone,
                        user_password: this.registerObj.pass,
                        langstatus: this.engIndex,
                   
                    }
                    await axios.post("/users/"+ this.user.user_id, data);
                    const message = "Account updated successfully";
                    
                    this.$router.push("/login");
                    this.$refs.alert.showAlert(message);
                // }
            }
        },


        ///////////////////////////DELETE ACCOUNT///////////////////////
        async deleteSubmit() {
            if(this.user){
                    await axios.delete("/usersdelete/"+ this.user.user_id);
                    // const message = "Account deleted successfully";
                    
                    // this.$router.push("/register");
                    // this.$refs.alert.showAlert(message);}
                    
        }},
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
        },
// components: {
//         VueBasicAlert
//     }
    }
};
    


</script>


<style scoped>
.register-container {
    padding: 15rem 9%;
    background-color: #e8f0fe;

}

.register-container .register-form-container {
    background-color: #e8f0fe;
    /* z-index: 2; */
    display: flex;
    justify-content: space-around;
}

.register-container .register-form-container form {
    background-color: white;
    position: relative;
    left: 20%;
    transform: translate(-50%, 0%);
    max-width: 40rem;
    width: 80%;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.4);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
    z-index: 2;
}

.register-container .register-form-container .update-form {
    background-color: white;
    position: relative;
    left: 20%;
    top: 0%;
    transform: translate(-50%, 0%);
    max-width: 40rem;
    width: 80%;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.4);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
    z-index: 2;
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
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.g {
    background-color: #489e02;

}
.g:hover {
  background-color: #7bbe44;
}

.z-0 {
  background-color: #489e02;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(25deg); /* Rotate the element */
  position: absolute;
  top: 25%;
  left: 60%;
  width: 10%;
  height: 8%;
  z-index: 1;
}

.z-1{
  background-color: #ff0101;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(25deg); /* Rotate the element */
  position: absolute;
  top: 100%;
  left: 32%;
  width: 10%;
  height: 8%;
  z-index: 1;
}

.dp{
    border: 1px rgb(66, 235, 15) solid;
    margin: 1rem 0;
    width: 70%;
    text-align: center;
}
.animated-btn {
  background-color: #4CAF50;  /* Initial color */
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: none;
  cursor: default; /* Prevent hover cursor style */
  animation: colorChange 3.5s infinite alternate; /* Animation properties */
}

@keyframes colorChange {
  0% { background-color: #4CAF50; }
  50% { background-color: #ffffff; }
  100% { background-color: #4CAF50; }
}
.dp{
    border: 1px rgb(7, 189, 7) solid;
}

.admin-profile {
  width: 40px;
  height: 40px;
  background-color: #fff; /* White background */
  border-radius: 50%; /* Make it a circle */
  margin-bottom: 20px;
  margin-left: 10px; /* Spacing */
   display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333; /* Icon color */
}
.r {
    background-color: #c1282d;
  }
  .r:hover {
    background-color: rgb(236, 39, 39);
  }
  
</style>
