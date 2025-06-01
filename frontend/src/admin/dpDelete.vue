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
                <th>Delivery person Id</th>
                <th>Delivery Person email</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ this.dp_id }}</td>
                <td>{{ this.dp_email }}</td>
                
              </tr>
            </tbody>
          </table>

          <h2>Delete delivery account</h2>
          <form>
            <input type="number" min="1"> <br>
            <input type="submit" class="btn r">
          </form>
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
    name: "DpDelete",
    data() {
      return {
        
        allDp: [],
        showOrderDetails: false,
        sendId: undefined,
        interval: "",
        dpData:[],
        dp_id: null,
        dp_email: null
  
       
    
       
    
      };
    },
    created() {
      this.getAllDp();
     
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
      ...mapState(["admin", "user"]),
      filterDp: function () {
        return this.allDp.filter(
          (b) => b
        );
      },
     
        
    },
    methods: {
      ...mapMutations(["setAdmin"]),
      scrollToTop() {
              window.scrollTo(0, 0);
          },
  
     
      async getAllDp() {
        this.allDp = await axios.get("/alldp", this.dpData);
        console.log("all dp ", this.allDp.data.dp_email);
        this.dp_id = this.allDp.data.dp_id;
        this.dp_email = this.allDp.data.dp_email;

        console.log("dp id ", this.dp_id)
        console.log("dp email", this.dp_email)
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
      
  
    
  
      autoUpdate: function () {
        this.interval = setInterval(
          function () {
            // this.getAllDp();
           
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
  