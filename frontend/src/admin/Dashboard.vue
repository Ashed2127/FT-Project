<template>
  <div>
    <!-- Sidebar -->
    <div class="sidebar">
          <div class="admin-profile">   <i class="fas fa-user"></i></div>
      <router-link @click="scrollToTop()" to="/admin/dashboard" class="sidebar-link" > order dashboard</router-link>
      <router-link @click="scrollToTop()" to="/tabledashboard" class="sidebar-link">Table Dashboard</router-link>
      <router-link @click="scrollToTop()" to="/updateAmount" class="sidebar-link" >Update Food Detail</router-link>
      <router-link @click="scrollToTop()" to="/dpRegister" class="sidebar-link">Create Delivery Person Account</router-link>
      <router-link @click="scrollToTop()" to="/dpDelete" class="sidebar-link-r">Delete Delivery Person Account</router-link>
      <button class="sidebar-logout-btn" @click="handleLogout()">Logout</button>
    </div>

    <!-- Main content -->
    <div class="admin-container">
       <br />
      <div class="table-responsive">
        <!-- PROJECT TABLE -->
        <table class="table colored-header datatable project-list">
          <thead class="thead">
            <tr>
              <!-- <th>User Id</th> -->
              <th>Bill Id</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Foods</th>
              <th>Quantity</th>
              <th>When</th>
              <th>Paid</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in filterBills.slice().reverse()" :key="b.bill_id">
              <!-- <td>{{ b.user_id }}</td> -->
              <td>{{ b.bill_id }}</td>
              <td>{{ b.bill_phone }}</td>
              <td>{{ b.bill_address }}</td>
              <td >{{ b.bill_food }}</td>
              <td >{{ b.item_qty }}</td>
              <td>{{ b.bill_when }}</td>
              <td>{{ b.bill_paid }}</td>
              <td>{{ b.bill_total }}birr</td>
              <td>{{ avaiableStatus[b.bill_status] }}</td>
              <td>
                <button v-if="b.bill_status < 5" class="action-btn" v-bind:class="{'animated-btn': b.bill_status < 4}" @click="nextStatusBtn(b.bill_id)">
                  {{ avaiableStatus[b.bill_status + 1] }}
                </button>

                <button v-if="b.bill_status >= 2" class="undo-btn px-4 " @click="undoBillStatusBtn(b.bill_id)">
                  Undo
                </button>
                <!-- <button v-else-if="b.bill_status == 5 && b.bill_paid == 'false'" class="paid-btn" @click="paidBtn(b.bill_id)">
                  Paid
                </button> -->
                <button v-else-if="b.bill_status == 5 && b.bill_paid == 'true'" class="action-btn" @click="nextStatusBtn(b.bill_id)">
                  {{ avaiableStatus[b.bill_status + 1] }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
// import burger from "../assets/images/breakfast/dulet1.png";
// import burger1 from "../assets/images/breakfast/enkulal-ferfer.png";
export default {
  name: "Dashboard",
  data() {
    return {
      avaiableStatus: [
        "cancel",
        "confirmed",
        "preparing",
        "checking",
        "delivering",
        "delivered",
        "completed",
      ],
      allBills: [],
      showOrderDetails: false,
      sendId: undefined,
      interval: "",
      allBooks: [],
      avaiableBookStatus: [
        "cancel",
        "confirmed",
        "checking",
        "reserved",
        "no table",
      ],

      userFoodsData: "",
      foods: [],
      userFoods: "",
      foodSrc: "",
      myID: 2,
      // newMyId: null,

      orderedFoodId: 0,
      foodId: [],
      billID: 0,
    };
  },
  created() {
    this.getAllBills();
    this.getAllBooks();
    // this.getFoodsData();
    this.getFoodsById();
    // this.getFoodIdByBillId();
    if (!this.admin) {
      this.$router.push("/");
    }
  },
  mounted: function () {
    this.autoUpdate();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapState(["allFoods", "admin", "user"]),
    filterBills: function () {
      return this.allBills.filter(
        (b) => b.bill_status < 6 && b.bill_status > 0,
        // this.billID = b.bill_id,
      );
    },
    filterBooks: function () {
      return this.allBooks.filter(
        (allbook) => allbook.book_status < 6 && allbook.book_status > 0
      );
    },
      
  },
  methods: {
    ...mapMutations(["setAdmin"]),
    scrollToTop() {
            window.scrollTo(0, 0);
        },

    //     filterBillId: function () {
    //   return this.allBills;
    // },
    //get all bill status from billstatus table
    async getAllBills() {
      this.allBills = (await axios.get("/billstatus")).data;
      // console.log(this.allBills);
    },
    // get all book tables from booktable
    async getAllBooks() {
      this.allBooks = (await axios.get("/booktable")).data;
      // this.userid = (await axios.get('/userid')).data;
    },
    sendBillId: function (id) {
      this.sendId = id;
      this.showOrderDetails = !this.showOrderDetails;
    },
    closeView: function () {
      this.showOrderDetails = !this.showOrderDetails;
    },
    handleLogout: function () {
      this.setAdmin("");
    },
    async nextStatusBtn(id) {
      await axios.put("/billstatus/" + id);
      this.getAllBills();
    },
    async paidBtn(id) {
      await axios.put("/billstatus/paid/" + id);
      this.getAllBills();
    },
    // async cancelBtn(id) {
    //     await axios.put('/billstatus/cancel/' + id);
    //     this.getAllBills();
    // },

    async undoBillStatusBtn(id) {
      await axios.put("/billstatus/undo/" + id);
      this.getAllBills();
    },
    async nextBookBtn(id) {
      await axios.put("/booktable/" + id);
      this.getAllBooks();
    },
    async undoBookStatusBtn(id) {
      await axios.put("/booktable/undo/" + id);
      this.getAllBooks();
    },

    async getFoodsById() {
      // const foodId = this.filterFoodId;
      this.userFoods = await axios.get(`/getuserfoods/${this.myID}`);
      // console.log("foodName: ", this.userFoods.data[0].food_name);
      return this.userFoods.data[0].food_name;
    },

    /////////get food if by bill id/////////////
    // async getFoodIdByBillId(){
    //   this.foodId = await axios.get("/getfoodid/" + this.billID);
    //   this.billID = this.filterBillId();
    //   console.log("foodId: ", this.billID);
    //   // console.log("foodidData: ", this.foodId.data);
    // },

    autoUpdate: function () {
      this.interval = setInterval(
        function () {
          this.getAllBills();
          this.getAllBooks();
          // this.getFoodIdByBillId();
          // this.getFoodsData();
          // this.getFoodsById();
          // this.display();
        }.bind(this),
        50
      );
    },
  },
};
</script>
<style scoped>
.admin-container {
  background-color: #fefeff;
  height: 100vh;
  padding: 0 9%;
  font-size: 16px;
}
.admin-container .container-fluid {
  background-color: #2f5899;
}
.project-list > tbody > tr > td {
  padding: 12px 8px;
}
.project-list > tbody > tr > td .avatar {
  width: 22px;
}
.table-responsive {
  margin-left: 20vh;
  /* width: 800px; */
}
.table-responsive h1{
  padding-bottom: 0;
}
.action-btn,
.cancel-btn,
.paid-btn {
  width: 100px;
  height: 25px;
  color: white;
  text-transform: capitalize;
}
.action-btn {
   border: 1px #15c71e solid;
    color: black;
    margin-right: 10px;
}
.action-btn:hover {
background-color: #05ac0e;
    color: white;
}
.cancel-btn,
.paid-btn {
  background-color: red;
}
.undo-btn{
    background-color: white;
    border: 1px black solid;
}
.undo-btn:hover{
    background-color: black;
    color: white;
}

.table-contain {
  height: 5px;
  widows: 100%;
  color: orange;
}
.colored-header {
  background-color: #fffbfb;
  color: rgb(0, 0, 0);
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

.sidebar-link-r, .sidebar-link {
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
  color: #fa040c;
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
.thead{
  background-color: #06910d;
  color: white;
}
.focus-btn {
  background-color: #0bc511a1; /* Initial color */
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: none;
  cursor: default; /* Prevent hover cursor style */
}
.animated-btn {
  background-color: #4CAF50;  /* Initial color */
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: none;
  cursor: default; /* Prevent hover cursor style */
  animation: colorChange 2.5s infinite alternate; /* Animation properties */
}

@keyframes colorChange {
  0% { background-color: #0bc511; }
  50% { background-color:rgb(162, 230, 166); }
  100% { background-color: #0bc511; }
}


</style>
