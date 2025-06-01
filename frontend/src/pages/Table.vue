<template>
  <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
  <section class="order-section">
    <div class="heading">
      <h3>{{ langObj[this.newLangStatus].words[0] }}</h3>
    </div>

    <!-- <div class="icons-container">
            <div class="icons ">
                <h2>{{ langObj[this.newLangStatus].words[1] }}</h2>
                <h3>{{ langObj[this.newLangStatus].words[2] }}</h3>
            </div>
        </div> -->

    <!-- booking form -->
    <form
      id="bookTableForm"
      class="mb"
      @submit="handleSubmit"
      novalidate
      autocomplete="off"
    >
      <div class="row">
        <div class="col-md-6 col-sm-5 mb-4">
          <!-- <label for="uName">{{ langObj[this.newLangStatus].words[3] }}</label> -->
          <input
            type="text"
            name="uName"
            id="uName"
            v-model="orderObj.name"
            :placeholder="langObj[this.newLangStatus].words[4]"
            :disabled="paymentProcessing"
          />
          <p v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
        </div>

        <div class="col-md-6 col-sm-5">
          <!-- <label for="uPhone">{{ langObj[this.newLangStatus].words[5] }}</label> -->
          <input
            type="text"
            name="uPhone"
            id="uPhone"
            :value="phone"
            :disabled="paymentProcessing"
          />
          <p v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
        </div>
        <div class="col-md-6 col-sm-5 mb-4">
          <!-- <label for="oPeople">{{ langObj[this.newLangStatus].words[7] }}</label> -->
          <input
            type="number" min="1"
            name="oPeople"
            id="oPeople"
            :placeholder="langObj[this.newLangStatus].words[7]"
            v-model="orderObj.people"
            :disabled="paymentProcessing"
          />
          <p v-if="errorObj.peopleErr.length > 0">
            {{ errorObj.peopleErr[0] }}
          </p>
        </div>

        <div class="col-md-6 col-sm-5">
          <input
            type="number" 
            :placeholder="langObj[this.newLangStatus].words[8]"
            name="oTables"
            id="oTables"
            :value="orderObj.people * 40"
            :disabled="paymentProcessing"
          />
          <p v-if="errorObj.tablesErr.length > 0">
            {{ errorObj.tablesErr[0] }}
          </p>
        </div>

        <div class="col-md-6 col-sm-5">
          <!-- <label for="oWhen">{{ langObj[this.newLangStatus].words[9] }}</label> -->
          <input
            type="datetime-local"
            :placeholder="langObj[this.newLangStatus].words[9]"
            name="oWhen"
            id="oWhen"
            v-model="orderObj.when"
            @click="availableTime()"
            :disabled="paymentProcessing"
          />
          <p v-if="errorObj.whenErr.length > 0">{{ errorObj.whenErr[0] }}</p>
        </div>

        <div class="col-md-6 col-sm-5">
          <!-- <label for="uMessage">{{ langObj[this.newLangStatus].words[10] }}</label> -->
          <input
            :placeholder="langObj[this.newLangStatus].words[11]"
            name="uMessage"
            id="uMessage"
            v-model="orderObj.note"
            :disabled="paymentProcessing"
          />
        </div>
        <div class="input-box">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7416.902629723891!2d37.97018764356112!3d8.542938099589724!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164d281cafa70589%3A0x9166a51b8c4ad286!2sGXRF%2BWG6%2C%20Giyon!5e1!3m2!1sen!2set!4v1716382802542!5m2!1sen!2set"
            width="100%"
            height="200"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <input
        type="submit"
        :value="langObj[this.newLangStatus].words[12]"
        class="btn col-md-5 col-sm-6 my-sm-5 col-lg-12 w mt-5"
        :disabled="paymentProcessing"
      />
      <!-- <div class="paper">best
                </div> -->
    </form>
  </section>
</template>

<script>
import axios from "axios";
import VueBasicAlert from "vue-basic-alert";
import { mapState } from "vuex";
// import { mapState } from "vuex";
export default {
  name: "Table",

  data() {
    return {
      orderObj: {
        name: "",
        phone: "",
        people: "",
        tables: "",
        card: "",
        when: "",
        note: "",
      },
      errorObj: {
        nameErr: [],
        phoneErr: [],
        peopleErr: [],
        tablesErr: [],
        cardErr: [],
        whenErr: [],
      },
      languageStatus: 0,
      langObj: [
        {
          words: [
            "Table Form",
            "Opening Hours",
            "2:00am To 6:00pm",
            "Your Name",
            "write names",
            "your phone number",
            "write your account number",
            "how many people",
            "price",
            "when",
            "note",
            "decorate your table?",
            "reserve table",
            "Booking Successfully !",
          ],
        },
        {
          words: [
            "Unka Gabatee",
            "Sa'aatii Baniinsaa",
            "2:00am Hanga 6:00pm",
            "Maqaa Kee",
            "maqaa barreessi",
            "lakkoofsa bilbila keessanii",
            "lakkoofsa herrega keessanii barreessaa",
            "namoota meeqa",
            "getii",
            "yoom",
            "yaadannoo",
            " minjaala keessan faayadhaa?",
            "gabatee rizaabii",
            "Booking Milkaa'inaan !",
          ],
        },
      ],
      newLangStatus: 0,
      interval: "",
      checkoutUrl: "",
      email: "",
      phone: "",
      fName: "",
      lName: "",
      paymentProcessing: false,
      currency: "ETB",
    };
  },
  // computed: {
  //     ...mapState([ "user"]),

  //     // filterBooks: function () {
  //     //     return this.allBooks.filter((allbook) => allbook.book_status < 4 && allbook.book_status > 0);
  //     // },
  // },
  created() {
    this.getStatus();
    if (!this.user) {
      this.$router.push("/");
    }
  },
  mounted: function () {
    this.getUserPhone();
     this.getUserEmail();
    this.getUserFirstName();
    this.getUserLastName();
    this.autoUpdate();
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async getUserEmail() {
      if (this.user) {
        let email = await axios.get("/useremail/" + this.user.user_id);

        this.email = email.data.user_email;
        return email.data.user_email;
      }
    },

    async getUserPhone() {
      if (this.user) {
        let phone = await axios.get("/userphone/" + this.user.user_id);

        this.phone = phone.data.user_phone;
        return phone.data.user_phone;
      }
    },

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

    // async getUserPhone() {
    //   if (this.user) {
    //     let phone = await axios.get("/userphone/" + this.user.user_id);

    //     this.phone = phone.data.user_phone;
    //     return phone.data.user_phone;
    //   }
    // },

    availableTime: function () {
      var now = new Date();
      var day = ("0" + now.getDate()).slice(-2);
      var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
      var maxMonth = ("0" + (now.getMonth() + 3)).slice(-2);
      var hour = ("0" + now.getHours()).slice(-2);
      var min = ("0" + now.getMinutes()).slice(-2);
      var minRange =
        now.getFullYear() +
        "-" +
        currentMonth +
        "-" +
        day +
        "T" +
        hour +
        ":" +
        min;
      var maxRange =
        now.getFullYear() + "-" + maxMonth + "-" + day + "T" + hour + ":" + min;

      document.getElementById("oWhen").setAttribute("min", minRange);
      document.getElementById("oWhen").setAttribute("max", maxRange);
    },

    resetCheckErr: function () {
      this.errorObj.nameErr = [];
      this.errorObj.phoneErr = [];
      this.errorObj.peopleErr = [];
      this.errorObj.tablesErr = [];
      this.errorObj.cardErr = [];
      this.errorObj.whenErr = [];
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
      if (!this.orderObj.name) {
        this.errorObj.nameErr.push("Entering a name is required");
      } else {
        if (!/^[A-Za-z]+$/.test(this.orderObj.name.replace(/\s/g, ""))) {
          this.errorObj.nameErr.push("A name can only contain letters");
        }
      }

      // Phone validate
      if (!this.phone) {
        this.errorObj.phoneErr.push("Entering phone number is required");
      } else {
        if (!this.phone.startsWith("09")) {
          this.errorObj.phoneErr.push("Phone numbers must start with 09");
        }

        if (!/[0-9]{10}/.test(this.phone)) {
          this.errorObj.phoneErr.push("Phone numbers can only contain numbers");
        }

        if (this.phone.length != 10) {
          this.errorObj.phoneErr.push(
            "Phone numbers must have exactly 10 digits"
          );
        }
      }

      if (!this.orderObj.people) {
        this.errorObj.peopleErr.push("Entering number of people is required");
      } else {
        if (parseInt(this.orderObj.people) > 10) {
          this.errorObj.peopleErr.push(
            "Each store can only serve 10 people at a time"
          );
        }

        if (parseInt(this.orderObj.people) < 1) {
          this.errorObj.peopleErr.push(
            "Number of people must be greater than or equal to 1"
          );
        }
      }

      // if (!this.orderObj.tables) {
      //     this.errorObj.tablesErr.push("Entering number of tables is required");
      // }
      // else {
      //     if (parseInt(this.orderObj.tables) > 50) {
      //         this.errorObj.tablesErr.push("Each store can only have maximum 50 tables");
      //     }

      //     if (parseInt(this.orderObj.tables) < 1) {
      //         this.errorObj.tablesErr.push("Number of tables must be greater than or equal to 1");
      //     }

      //     if (parseInt(this.orderObj.people) < parseInt(this.orderObj.tables)) {
      //         this.errorObj.tablesErr.push("The number of tables must be less than the number of people");
      //     }
      // }

      if (this.orderObj.card) {
        if (!/[0-9]{10}/.test(this.orderObj.card)) {
          this.errorObj.cardErr.push("Card numbers can only contain numbers");
        }

        if (this.orderObj.card.length != 10) {
          this.errorObj.cardErr.push("Card number must have exactly 10 digits");
        }
      }

      if (!this.orderObj.when) {
        this.errorObj.whenErr.push("Entering when to serve is required");
      } else {
        let minRange = document.getElementById("oWhen").getAttribute("min");
        let maxRange = document.getElementById("oWhen").getAttribute("max");
        let dateMin = new Date(minRange);
        let dateMax = new Date(maxRange);
        let dateInput = new Date(this.orderObj.when);

        if (dateInput === "Invalid Date") {
          this.errorObj.whenErr.push("Invalid date input");
        }

        if (
          dateInput.getTime() < dateMin.getTime() ||
          dateInput.getTime() > dateMax.getTime()
        ) {
          this.errorObj.whenErr.push(
            "Available reservation range is from now to next two months"
          );
        }

        if (dateInput.getHours() < 7 || dateInput.getHours() > 22) {
          this.errorObj.whenErr.push(
            "cafe open from 7:00 AM to 10:00 PM everyday"
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
        // let user_data = await axios.get('/user/' + data.book_phone);
        // console.log(user_data[1].user_id);
        // console.log(data.book_phone);
        // var now = new Date();
        // var day = ("0" + now.getDate()).slice(-2);
        // var month = ("0" + (now.getMonth() + 1)).slice(-2);
        // var hour = ("0" + now.getHours()).slice(-2);
        // var min = ("0" + now.getMinutes()).slice(-2);
        // var currentTime =
        //   now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

        this.paymentProcessing = true; // Set processing flag

        let response = {
          user_id: parseInt(this.user.user_id),
          amount: parseInt(this.orderObj.people * 40),
          currency: this.currency,
          email: this.email,
          first_name: this.fName,
          last_name: this.lName,
          book_name: this.orderObj.name,
          book_phone: this.phone,
          book_people: parseInt(this.orderObj.people),
        //   book_tables: parseInt(this.orderObj.tables),
          book_when: this.orderObj.when,
          book_note: this.orderObj.note,

          book_status: 1,
         
        };
        console.log("user data: ", response);
        await axios.post("/initiate-book-payment/", response);
        

        //////////// this.orderObj.tables is the price/////////////

        let data = {
          book_name: this.orderObj.name,
          book_phone: parseInt(this.phone),
          book_people: parseInt(this.orderObj.people),
          book_price: parseInt(this.orderObj.people * 40),
          book_paid: "pending",
          book_method: "chapa",
          user_id: parseInt(this.user.user_id),
          book_when: this.orderObj.when,
          book_note: this.orderObj.note,
          book_status: 1,
        };
        // console.log(data);

        await axios.post("/booktable", data);
        const paymentCheckoutUrl = await axios.get(
          "/checkout-book-url/",
          this.checkoutUrl
        );
        window.location.href = paymentCheckoutUrl.data.checkout_url;
        let message = this.langObj[this.newLangStatus].words[13];
        // console.log(message);
        this.$refs.alert.showAlert(message);
        document.getElementById("bookTableForm").reset();
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async getStatus() {
      let langStatus = await axios.get("/langstatus/" + this.user.user_id);
      this.newLangStatus = langStatus.data[0].langstatus;
      //   console.log(this.newLangStatus);
      //   console.log(this.langObj[this.newLangStatus].words[0] )
      return this.newLangStatus;
    },

    autoUpdate: function () {
      this.interval = setInterval(
        function () {
          this.getStatus();
        }.bind(this),
        50
      );
    },
  },

  components: {
    VueBasicAlert,
  },
};
</script>

<style scoped>
.order-section {
  background-color: rgb(187, 139, 76);
  padding: 2rem 25%;
  width: 100%;
}

.order-section form {
  background: #f1ecec;
  background: #ecf0f0e1;

  padding: 2rem;
  border-radius: 0.5rem;
}

.order-section form .row {
  justify-content: space-between;
}

.order-section form .row .input-box {
  width: 97%;
  padding: 1.8rem 0;
}
.order-section form .row .input-box-last {
  width: 49%;
  padding: 1.8rem 0;
}
.order-section form .row label {
  font-size: 1.7rem;
  color: #666;
}

.order-section form .row p {
  font-size: 1.5rem;
  position: absolute;
  color: rgb(243, 47, 47);
  margin: 0;
  padding-top: 5px;
}

.order-section form .row input,
.order-section form .row textarea {
  width: 100%;
  margin-top: 0.5rem;
  padding: 1rem 1.2rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  text-transform: none;
  color: #130f40;
}

.order-section form .row textarea {
  height: 20rem;
  resize: none;
}

.order-section form .row .map {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .order-section {
    padding: 2rem 9%;
  }
  .order form .row .input-box {
    width: 100%;
  }

  .order-section form .row {
    display: block;
    max-width: 100%;
    width: 100%;
    margin: 0;
  }

  .order-section form .row .input-box {
    width: 100%;
  }
  .paper {
    background-color: #be444488;
    padding: 15px; /* Adjust padding as needed */
    transform: skewY(-45deg); /* Rotate the element */
    position: absolute;
    top: 0%;
    left: 0%;
    width: 30%;
    height: 5%;
    z-index: -1;
  }
}

@media (max-width: 576px) {
  .order-section .icons-container {
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
  .paper {
    background-color: #be444488;
    padding: 15px; /* Adjust padding as needed */
    transform: skewY(-45deg); /* Rotate the element */
    position: absolute;
    top: 0%;
    left: 0%;
    width: 30%;
    height: 5%;
    z-index: 1;
  }
}
.w {
  background-color: rgb(126, 85, 31);
}
.w:hover {
  background-color: burlywood;
}
.mb {
  margin-bottom: 15px;
}
.heading h3 {
  color: white;
}
.paper {
  background-color: #77f38c88;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(-45deg); /* Rotate the element */
  position: absolute;
  top: 0%;
  left: 0%;
  width: 30%;
  height: 55%;
  z-index: 1;
}
</style>
