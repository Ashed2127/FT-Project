<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1>Order Dashboard</h1>
            
            <button class="px-4 btn-danger " @click="handleLogout()">Logout</button>
        </div>

        <div class="table-responsive">
            <table class="table colored-header datatable project-list">
                <thead class="thead">
                        
                    <tr>
                        <th>Bill Id</th>
                        <th>Phone</th>
                        <th>Foods</th>
                        <th>Quantity</th>
                        <th>Address</th>
                        <th>When</th>
                        <th>Paid</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in filterBills.slice().reverse()" :key="b.bill_id">
                       <td>{{ b.bill_id }}</td>
                        <td>{{ b.bill_phone }}</td>
                        <td>{{ b.bill_food }}</td>
                         <td >{{ b.item_qty }}</td>
                        <td>{{ b.bill_address }}</td>
                        <td>{{ b.bill_when }}</td>
                        <td>{{ b.bill_paid }}</td>
                        <td>{{ b.bill_total }}birr</td>
                        <td>{{ avaiableStatus[b.bill_status] }}</td>
                        <td>
                            <button v-if="b.bill_status < 5" class="action-btn" v-bind:class="{'animated-btn': b.bill_status > 2}" @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>

                            
                            <button v-if="b.bill_status > 4" class="undo-btn px-4" @click="undoBillStatusBtn(b.bill_id)">
                            Undo
                        </button>
                            <button v-else-if="b.bill_status == 5 && b.bill_paid == 'false'" class="paid-btn"
                                @click="paidBtn(b.bill_id)">
                                Paid
                            </button>

                            <button v-else-if="b.bill_status == 5 && b.bill_paid == 'true'" class="action-btn"
                                @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-container"></div>
    </div>
</template>


<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Dashboard',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allBills: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    // created() {
    //     this.getAllBills();
    //     if (!this.admin || !this.dp) {
    //         this.$router.push("/");
    //     }
    // },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["allFoods", "admin", "dp"]),

        filterBills: function () {
            return this.allBills.filter((b) => b.bill_status < 6 && b.bill_status > 3);
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async getAllBills() {
            this.allBills = (await axios.get('/billstatus')).data;
        },

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        handleLogout: function () {
            this.setAdmin("");
            this.$router.push("/dplogin");
        },

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllBills();
        },

        async paidBtn(id) {
            await axios.put('/billstatus/paid/' + id);
            this.getAllBills();
        },

        async undoBillStatusBtn(id) {
            await axios.put('/billstatus/undo/' + id);
            this.getAllBills();
        },
        // async cancelBtn(id) {
        //     await axios.put('/billstatus/cancel/' + id);
        //     this.getAllBills();
        // },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllBills();
            }.bind(this), 50);
        }

    }
}
</script>

<style scoped>
.admin-container {
    background-color: #fff;
    height: 100vh;
    padding: 2rem 9%;
    font-size: 16px;
}

.project-list>tbody>tr>td {
    padding: 12px 8px;
}

.project-list>tbody>tr>td .avatar {
    width: 22px;
    border: 1px solid #CCC;
}

.table-responsive {
    margin-top: 8vh;
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



.table-contain{
  height: 5px;
  widows: 100%;
  color: orange;
}

.colored-header{
    background-color: #feffff;
    color: rgb(0, 0, 0);
}
.undo-btn{
    background-color: white;
    border: 1px black solid;
}
.undo-btn:hover{
    background-color: black;
    color: white;
}
.thead{
  background-color: #06910d;
  color: white;
}
.b{
    border: 1px #000000 solid;
    color: black;
}
.b:hover{
    background-color: black;
    color: white;
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