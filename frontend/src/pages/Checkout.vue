<template>
  <div class="checkout-container">
    <div class="checkout-form-container">
      <form
        class="chapa-form"
        @submit="initiatePayment"
        novalidate
        autocomplete="off"
      >
        <!-- <div class="checkout-heading">
          <h3>your order form<span>Total</span></h3>
          <h3 v-if="user">
            {{ this.fName }} {{ this.lName }} Order<span
              >{{ calculateSummaryPrice()[3] }}birr</span
            >
          </h3>
        </div> -->

        <div class="form-group details-group">
          <div class="form-group chapa">
            <img src="../assets/images/chapa.png" alt="" />

            <input
              type="text"
              name="coPhone"
              id="coPhone"
              placeholder="Phone number"
              class="form-control"
              :value="phone"
            />
          </div>
          <div class="form-group chapa">
            <input
              type="text"
              name="coAddress"
              id="coAddress"
              :placeholder="langObj[this.newLangStatus].words[0]"
              class="form-control"
              v-model="checkoutObj.address"
            />
            <p class="error-mess" v-if="errorObj.addressErr.length > 0">
              {{ errorObj.addressErr[0] }}
            </p>
          </div>

          <div class="form-group chapa">
            <input
              type="text"
              :value="calculateSummaryPrice()[3]"
              :disabled="paymentProcessing"
              required
              class="form-control h-80"
            />
          </div>

          <div class="form-group chapa">
            <input
              type="text"
              placeholder="Currency"
              :value="this.currency"
              :disabled="filterFoods.length ? false : true"
              class="form-control h-80"
            />
          </div>

          <div class="form-group chapa">
            <input
              type="text"
              placeholder="Email"
              :value="email"
              :disabled="paymentProcessing"
              required
              class="form-control h-80"
            />
          </div>

          <div class="form-group chapa">
            <input
              type="text"
              placeholder="First Name"
              :value="fName"
              :disabled="paymentProcessing"
              required
              class="form-control h-80"
            />
          </div>

          <div class="form-group chapa">
            <input
              type="text"
              placeholder="Last Name"
              :value="lName"
              :disabled="paymentProcessing"
              required
              class="form-control h-80"
            />
          </div>
        </div>

        <div v-if="user" class="form-group">
          <input
            type="submit"
            :value="langObj[this.newLangStatus].words[1]"
            class="btn g g-h"
            :disabled="paymentProcessing"
            required
          />
        </div>
      </form>
      <div class="paper-1"></div>
      <div class="paper-2"></div>
      <div class="paper-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Checkout",

  data() {
    return {
      checkoutObj: {
        phone: "",
        address: "",
        paymentMethod: "",
        voiceMessage: "",
        email: "",
      },
      // cardObj: { number: "", name: "", expiryDate: "", cvv: "" },
      errorObj: {
        //   phoneErr: [],
        addressErr: [],
        //   payErr: [],
        //   numErr: [],
        //   nameErr: [],
        //   exDateErr: [],
        //   cvvErr: [],
      },
      cartItem: [],
      itemQuantity: [],
      email: "",
      phone: "",
      fName: "",
      lName: "",
      currency: "ETB",
      paymentProcessing: false, // Flag to indicate payment processing state
      paymentError: null, // Store any errors during payment processing
      checkoutUrl: "",
      foodName: [],
      //////new part/////
      food_Name: [],
      food_Id: null,
      langObj: [
        { words: ["Your Address Here...", "pay"] },
        { words: ["Teessoo Keessan Asirratti...", "kaffaluu"] },
      ],
      newLangStatus: 0,
      quantity: 0,
      food_name: "",
      cartItemQty: [],
    };
  },

  created() {
    this.getAllCartItem();
    this.getStatus();
  },

  computed: {
    ...mapState(["allFoods", "user", "dp"]),

    filterFoods: function () {
      return this.allFoods.filter((f) => this.matchID(f, this.cartItem));
    },
  },

  mounted() {
    this.getUserEmail();
    this.getUserPhone();
    this.getUserFirstName();
    this.getUserLastName();
    this.autoUpdate();
    // this.getFoodsName();
  },
  methods: {
    // availableTime: function () {
    //   var now = new Date();
    //   var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);

    //   var minRange = now.getFullYear() + "-" + currentMonth;
    //   var maxRange = now.getFullYear() + 10 + "-" + currentMonth;

    //   document.getElementById("coCardEx").setAttribute("min", minRange);
    //   document.getElementById("coCardEx").setAttribute("max", maxRange);
    // },

    matchID: function (food, cartArray) {
      let temp = "";
      cartArray.forEach((element) => {
        if (parseInt(food.food_id) == element) {
          temp = food;
        }
      });

      return temp;
    },

    calculateSummaryPrice: function () {
      let subtotal = 0;
      let discount = 0;
      let delivery = 15;
      let i = 0;
      while (i < this.itemQuantity.length) {
        subtotal =
          subtotal +
          parseInt(this.filterFoods[i].food_price) * this.itemQuantity[i];
        discount =
          discount +
          parseInt(this.filterFoods[i].food_discount) * this.itemQuantity[i];
        i = i + 1;
      }
      if (!this.filterFoods.length) {
        delivery = 0;
      }
      let total = subtotal - discount + delivery;
      return [subtotal, discount, delivery, total];
    },
    async getStatus() {
      let langStatus = await axios.get("/langstatus/" + this.user.user_id);
      this.newLangStatus = langStatus.data[0].langstatus;
      //   console.log(this.newLangStatus);
      //   console.log(this.langObj[this.newLangStatus].words[0] )
      return this.newLangStatus;
    },

    // async getAllCartItem() {
    //   if (this.user) {
    //     let existItem = await axios.get("/cartItem/" + this.user.user_id);
    //     existItem.data.forEach((element) => {
    //       this.cartItem.push(element.food_id);
    //       // console.log("cartfoodID: ", this.cartItem)
    //       // console.log("cartfoodqty: ", this.itemQuantity)

    //       this.itemQuantity.push(element.item_qty);

    //       for (let i = 0; i < this.allFoods.length; i++) {
    //         this.food_Id = this.allFoods[i].food_id;
    //         this.food_Name = this.allFoods[i].food_name;
    //         // console.log("cartFood:", this.allFoods[i]);
    //         console.log("food_Name: ", this.food_Name);
    //         if (this.cartItem[0] === this.food_Id) {
    //           // console.log("they are equal", this.cartItem[0], this.food_Id);
    //           // console.log("foodId", this.food_Id, "foodName", this.food_Name);

    //           return this.foodName;
    //         }
    //       }
    //     });
    //   }
    // },
    async getAllCartItem() {
      if (this.user) {
        try {
          let existItem = await axios.get("/cartItem/" + this.user.user_id);
          let cartItemIds = existItem.data.map((item) => item.food_id);
          this.cartItem = cartItemIds; // Store cart item food IDs

          this.itemQuantity = existItem.data.map((item) => item.item_qty); // Store item quantities
          this.cartItemQty = this.itemQuantity.join(" | ");
          // Filter allFoods to get the names of foods that are in the cart
          this.food_Name = this.allFoods
            .filter((food) => this.cartItem.includes(food.food_id))
            .map((food) => food.food_name);
          console.log("cartItemQty: ", typeof this.cartItemQty);
          // console.log("cartitem: ", this.cartItemQty);
          // console.log("cartitemjoined: ", this.cartItemQty);
          // console.log("itemqty: ", this.itemQuantity);
          // console.log("existitem: ", existItem);

          // this.food_name = this.food_Name.join(',');
          // console.log("food_Name: ", this.food_Name);
          // console.log("food_Name: ", this.food_Name.join(','));
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      }
    },

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
    resetCheckErr: function () {
      //   this.errorObj.phoneErr = [];
      this.errorObj.addressErr = [];
      //   this.errorObj.payErr = [];
      //   this.errorObj.numErr = [];
      //   this.errorObj.nameErr = [];
      //   this.errorObj.exDateErr = [];
      //   this.errorObj.cvvErr = [];
    },

    checkEmptyErr: function () {
      for (var typeErr in this.errorObj) {
        if (this.errorObj[typeErr].length != 0) {
          return false;
        }
      }
      return true;
    },

    inputUpcase: function (e) {
      e.target.value = e.target.value.toUpperCase();
    },

    checkForm: function () {
      this.resetCheckErr();
      if (!this.checkoutObj.address) {
        this.errorObj.addressErr.push("Entering address is required");
      }
    },

    // isPaid: function () {
    //   if (this.checkoutObj.paymentMethod == "cash") {
    //     return "false";
    //   } else if (this.checkoutObj.paymentMethod == "card") {
    //     return "true";
    //   }
    // },

    async sendBillDetails(billId, foodId, qty) {
      let billDetails = {
        user_id: parseInt(this.user.user_id),
        bill_id: parseInt(billId),
        food_id: parseInt(foodId),
        item_qty: parseInt(qty),
      };

      await axios.post("/billdetails", billDetails);
    },

    async handleSubmit(e) {
      this.checkForm();
      if (!this.checkEmptyErr()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        let billId = (await axios.get("/billstatus/new")).data;

        if (billId == "") {
          billId = 1;
        } else {
          billId = parseInt(billId.bill_id) + 1;
        }

        this.cartItem.forEach((foodId, index) => {
          this.sendBillDetails(billId, foodId, this.itemQuantity[index]);
        });

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var hour = ("0" + now.getHours()).slice(-2);
        var min = ("0" + now.getMinutes()).slice(-2);
        var currentTime =
          now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

        let billStatus = {
          bill_id: parseInt(billId),
          user_id: parseInt(this.user.user_id),
          dp_id: parseInt(this.dp.dp_id),
          bill_phone: this.phone,
          bill_address: this.checkoutObj.address,
          bill_when: currentTime,
          bill_discount: parseInt(this.calculateSummaryPrice()[1]),
          bill_delivery: parseInt(this.calculateSummaryPrice()[2]),
          bill_total: parseInt(this.calculateSummaryPrice()[3]),
          bill_paid: this.isPaid(),
          bill_status: 1,
          item_qty: this.quantity,
          // item_qty: this.quantity.join(','),
        };
        console.log(billStatus);

        axios.post("/billstatus", billStatus);
        axios.delete("/cartItem/" + this.user.user_id);

        this.cartItem = [];
        this.itemQuantity = [];

        this.$router.push("/thank");
      }
    },

    async initiatePayment(e) {
      this.checkForm();
      if (!this.checkEmptyErr()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        let billId = (await axios.get("/billstatus/new")).data;

        if (billId == "") {
          billId = 1;
        } else {
          billId = parseInt(billId.bill_id) + 1;
        }

        this.cartItem.forEach((foodId, index) => {
          this.sendBillDetails(billId, foodId, this.itemQuantity[index]);
          this.quantity = this.itemQuantity[index];
        });

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var hour = ("0" + now.getHours()).slice(-2);
        var min = ("0" + now.getMinutes()).slice(-2);
        var currentTime =
          now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

        this.paymentProcessing = true; // Set processing flag

        // let checkoutUrl = '';
        let response = {
          amount: this.calculateSummaryPrice()[3],
          currency: this.currency,
          email: this.email,
          first_name: this.fName,
          last_name: this.lName,
          //////////from bill status//////////
          bill_id: parseInt(billId),
          user_id: parseInt(this.user.user_id),
          bill_phone: this.phone,
          bill_address: this.checkoutObj.address,
          bill_when: currentTime,
          bill_method: "chapa",
          bill_discount: parseInt(this.calculateSummaryPrice()[1]),
          bill_delivery: parseInt(this.calculateSummaryPrice()[2]),
          bill_total: parseInt(this.calculateSummaryPrice()[3]),
          bill_paid: "pending",
          bill_status: 1,
          // bill_food: this.food_Name,
          bill_food: this.food_Name.join(" | "),
          item_qty: this.cartItemQty,
        };
        console.log("the response data ", response);
        console.log("the food name ", this.food_Name);
        await axios.post("/initiate-payment/", response);

        ////////////bill status///////////////////
        let billStatus = {
          bill_id: parseInt(billId),
          user_id: parseInt(this.user.user_id),
          bill_phone: this.phone,
          bill_address: this.checkoutObj.address,
          bill_when: currentTime,
          bill_method: "chapa",
          bill_discount: parseInt(this.calculateSummaryPrice()[1]),
          bill_delivery: parseInt(this.calculateSummaryPrice()[2]),
          bill_total: parseInt(this.calculateSummaryPrice()[3]),
          bill_paid: "pending",
          bill_status: 1,
          bill_food: this.food_Name.join(" | "),
          // item_qty: this.quantity.join(','),
          item_qty: this.cartItemQty,
        };
        axios.post("/billstatus", billStatus);
        axios.delete("/cartItem/" + this.user.user_id);

        this.cartItem = [];
        this.itemQuantity = [];
        console.log("Payment initiated successfully!");
        console.log("check food name ", this.food_Name);
        const paymentCheckoutUrl = await axios.get(
          "/checkout-url/",
          this.checkoutUrl
        );
        window.location.href = paymentCheckoutUrl.data.checkout_url;

        console.log("Checkout URL:", paymentCheckoutUrl);
        console.log("Checkout URL:", paymentCheckoutUrl.data);
      }
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
};
</script>

<style scoped>
.checkout-container {
  padding: 3rem 15%;
}

.checkout-container .checkout-form-container {
  background: #fff;
  height: 120vh;
}

.checkout-container .checkout-form-container form {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -42%);
  max-width: 45rem;
  width: 100%;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.5rem;
  animation: fadeUp 0.4s linear;
}

.checkout-container .checkout-form-container form h3 {
  padding-bottom: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: #130f40;
  margin: 0;
}

.checkout-container .checkout-form-container form .form-control {
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

.checkout-container .checkout-form-container form label {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

.checkout-container .checkout-form-container form span {
  font-size: 18px;
  padding-left: 5px;
  padding-right: 40px;
}

.checkout-container .checkout-form-container form .btn {
  margin: 1rem 0;
  width: 100%;
  text-align: center;
}

.checkout-container .checkout-form-container form p {
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}

.checkout-container .checkout-form-container form p a {
  color: #27ae60;
}

.checkout-container .checkout-form-container form p a:hover {
  color: #130f40;
  text-decoration: underline;
}

.checkout-container .checkout-form-container form .form-group {
  margin: 0;
}

.checkout-container .checkout-form-container form .form-group.details-group {
  margin-top: 0px;
  z-index: 2;
}

.checkout-container .checkout-form-container form .form-group .error-mess {
  font-size: 1.5rem;
  position: relative;
  color: rgb(243, 47, 47);
  margin: 0;
  padding: 0;
}

.checkout-container .checkout-form-container form .checkout-heading h3 {
  display: flex;
  justify-content: space-between;
}

.checkout-container .checkout-form-container form .checkout-heading h3 span {
  padding-right: 0px;
  color: #f38609;
}

.checkout-container
  .checkout-form-container
  form
  .checkout-heading
  h3:first-of-type
  span {
  padding-right: 0px;
  color: #130f40;
}
.chapa {
  width: 100%;
}
.chapa img {
  width: 150px;
  margin-left: 65%;
}

.form-group {
  width: 100%;
}

.g {
  background-color: #66af29;
}
.g-h:hover {
  background-color: #7bbe44;
}

.paper-1 {
  background-color: #57be02;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(35deg); /* Rotate the element */
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 12%;
  z-index: 1;
}
.paper-2 {
  background-color: #ff0000;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(35deg); /* Rotate the element */
  position: absolute;
  top: 350px;
  left: 0;
  width: 34%;
  height: 9%;
  z-index: 1;
}
.paper-3 {
  background-color: #0044fffb;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(35deg); /* Rotate the element */
  position: absolute;
  top: 650px;
  right: 0;
  width: 34%;
  height: 9%;
  z-index: 1;
}

.chapa-form {
  z-index: 2;
}
</style>
