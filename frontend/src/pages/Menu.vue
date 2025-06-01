<template>
  <div class="menu-section">
    <div class="heading">
      <h3 v-if="user">{{ langObj[this.newLangStatus].words[7] }}</h3>
      <h3 v-else>{{ langObj[this.localLangStatus].words[7] }}</h3>

    </div>

    <div class="row">
      <div v-if="user"
        class="col-sm-12 col-xl-11 col-lg-11 col-md-12 filter-box mx-5 border-color box-shadow"
      >
        <div class="row search-box">
          <input
            type="text"
            class="search-input col-sm-12 col-md-12 col-lg-11"
            v-model="foodObj.name"
            :placeholder="user ? langObj[this.newLangStatus].words[0] : langObj[this.localLangStatus].words[0]"
          />
        </div>
      </div>

      <div class="col-sm-12 col-md-11 col-lg-11 mx-5">
        <!-- <div class="row">
          <div class="menu-tabs">
            <input
              type="button"
              id="breakfastFilterFoodBtn"
              name="breakfastFilterFoodBtn"
              class="menu-tab-item"
              :value="user ? langObj[this.newLangStatus].words[1] : langObj[this.localLangStatus].words[1]"
              @click="filterFoodBtn($event)"
            />
            <input
              type="button"
              id="lunchFilterFoodBtn"
              name="lunchFilterFoodBtn"
              class="menu-tab-item"
              :value="user ? langObj[this.newLangStatus].words[2] : langObj[this.localLangStatus].words[2]"
              @click="filterFoodBtn($event)"
            />
            <input
              type="button"
              id="dinnerFilterFoodBtn"
              name="dinnerFilterFoodBtn"
              class="menu-tab-item"
              :value="user ? langObj[this.newLangStatus].words[2] : langObj[this.localLangStatus].words[2]"
              @click="filterFoodBtn($event)"
            />
            <input
              type="button"
              id="hot-drinkFilterFoodBtn"
              name="hot-drinkFilterFoodBtn"
              class="menu-tab-item"
              :value="user ? langObj[this.newLangStatus].words[4] : langObj[this.localLangStatus].words[4]"
              @click="filterFoodBtn($event)"
            />
            <input
              type="button"
              id="dessertFilterFoodBtn"
              name="dessertFilterFoodBtn"
              class="menu-tab-item"
              :value="user ? langObj[this.newLangStatus].words[5] : langObj[this.localLangStatus].words[5]"
              @click="filterFoodBtn($event)"
            />
            <input
              type="button"
              id="soft-drinkFilterFoodBtn"
              name="soft-drinkFilterFoodBtn"
              class="menu-tab-item"
              :value="user ? langObj[this.newLangStatus].words[6] : langObj[this.localLangStatus].words[6]"
              @click="filterFoodBtn($event)"
            />
          </div>
        </div> -->

        <div class="row box-container">
          <div v-for="(f, index) in currentPageItems" :key="index">
            <div class="box border-shadow b-r">
              <div class="food_status col-md-12 mt-4 py-2 paper">
                <h4 v-if="user && this.newLangStatus == 0 "> {{
                    parseFloat(f.food_price) - parseFloat(f.food_discount)
                  }} {{ langObj[this.newLangStatus].words[12] }}
                  <span class="del" v-if="parseFloat(f.food_discount) != 0.0"
                    >{{ parseFloat(f.food_price) }} {{ langObj[this.newLangStatus].words[12] }}</span
                  ></h4>
                  
                  <!--  -->
                <h4 v-if="user && this.newLangStatus == 1 "> {{ langObj[this.newLangStatus].words[12] }}{{
                    parseFloat(f.food_price) - parseFloat(f.food_discount)
                  }} 
                  <span class="del" v-if="parseFloat(f.food_discount) != 0.0"
                    >{{ langObj[this.newLangStatus].words[12] }}{{ parseFloat(f.food_price) }} </span
                  ></h4>



<!--  -->


                  <h4 v-else-if="!user && this.localLangStatus == 0">  {{
                    parseFloat(f.food_price) - parseFloat(f.food_discount)
                  }} {{ langObj[this.localLangStatus].words[12] }}
                  <span class="del" v-if="parseFloat(f.food_discount) != 0.0"
                    >{{ parseFloat(f.food_price) }}{{ langObj[this.localLangStatus].words[12] }}</span
                  ></h4>

                   <h4 v-else-if="!user && this.localLangStatus == 1">  {{ langObj[this.localLangStatus].words[12] }}{{
                    parseFloat(f.food_price) - parseFloat(f.food_discount)
                  }} 
                  <span class="del" v-if="parseFloat(f.food_discount) != 0.0"
                    >{{ langObj[this.localLangStatus].words[12] }}{{ parseFloat(f.food_price) }}</span
                  ></h4>
              </div>

              <div class="image">
                <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
              </div>
              <div class="content">
                <h3>{{ f.food_name }}</h3>

                <!-- <div class="desc">
                  <p>{{ f.food_desc }}</p>
                </div> -->
                <!-- <div class="price">
                  {{
                    parseFloat(f.food_price) - parseFloat(f.food_discount)
                  }}birr
                  <span  v-if="parseFloat(f.food_discount) != 0.0"
                    >{{ parseFloat(f.food_price) }}birr</span
                  >
                </div> -->
                <button v-if="user" class="btn g g-h" @click="addItem(index)">
                  {{ langObj[this.newLangStatus].words[8] }}
                </button>
                <button v-else class="btn g g-h" @click="addItem(index)">
                  {{ langObj[this.localLangStatus].words[8] }}
                </button>
              </div>
            </div>
          </div>
          <div v-if="!filterFoods.length">
            <div class="box">
              <div class="content my">
                <h1 v-if="user" style="color: #6ca404" class="py">
                  {{ langObj[this.newLangStatus].words[9] }}
                </h1>
                 <h1 v-else style="color: #6ca404" class="py">
                  {{ langObj[this.localLangStatus].words[9] }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div v-if="calculatePages > 1" class="action-row">
          <button v-if="pageNum != 0" @click="previous()" class="action-btn">
            <h2 v-if="user">{{ langObj[this.newLangStatus].words[10] }}</h2>
            <h2 v-else>{{ langObj[this.localLangStatus].words[10] }}</h2>

          </button>
          <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
            <span v-if="i == pageNum" class="highlight" @click="set(i)">{{
              i + 1
            }}</span>
            <span v-else @click="set(i)">{{ i + 1 }}</span>
          </div>
          <button
            v-if="pageNum != calculatePages - 1"
            @click="next()"
            class="action-btn"
          >
           <h2 v-if="user" >{{ langObj[this.newLangStatus].words[11] }}</h2> 
           <h2 v-else>{{ langObj[this.localLangStatus].words[11] }}</h2> 

          </button>
        </div>
      </div>
    </div>
         <QuickView v-if="showQuickView" :food="sendId">
      <button class="btn g" @click="closeView">X</button>
    </QuickView>
 
  </div>
</template>

<script>
import QuickView from "@/components/QuickView.vue";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Menu",

  data() {
    return {
      foodObj: { name: "", category: "", status: [], price: "", type: "" },

      showQuickView: false,
      showDropDown: false,
      sendId: null,

      perPage: 6,
      pageNum: 0,
      previousCategoryClicked: "",
      previousPriceClicked: "",
      previousTypeClicked: "",

      languageStatus: 0,
      langObj: [
        {
          words: [
            "Search Food Here...",
            "breakfast",
            "lunch",
            "dinner",
            "hot-drink",
            "dessert",
            "soft-drink",
            "menu",
            "Add to cart",
            "No match found!",
             "Previous" ,
             "Next",
             "birr"
          ],
        },

        {
          words: [
            "Nyaata Barbaadi...",
            "ciree",
            "laaqana",
            "irbaata",
            "dhugaatii ho’aa",
            "nyaatatti aantuu",
            "dhugaatii lallaafaa",
            "nyaata keenya",
            "Gara gaariitti dabali",
            "Walsimsiisaa hin argamne!",
            "Kan duraa" ,
            "Kan itti aanu",
            "Qarshii"
          ],
        },
      ],
      newLangStatus: 0,
      interval: "",
        localLangStatus: null,

    };
  },

  computed: {
    ...mapState(["allFoods", "user"]),
    
    filterFoods: function () {
      return this.allFoods.filter(
        (f) =>
          f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
          (f.food_category.match(this.foodObj.category) ||
            this.foodObj.category == "all" ||
            this.foodObj.category == "") &&
          this.evaluatePrice(f, this.foodObj.price) &&
          f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()) &&
          this.evaluateStatus(f, this.foodObj.status)
      );
    },
    currentPageItems: function () {
      return this.filterFoods.slice(
        this.pageNum * this.perPage,
        this.pageNum * this.perPage + this.perPage
      );
    },
    calculatePages: function () {
      if (this.filterFoods.length % this.perPage != 0) {
        return Math.floor(this.filterFoods.length / this.perPage) + 1;
      } else {
        return this.filterFoods.length / this.perPage;
      }
    },
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
    window.addEventListener("scroll", this.handleScroll);

  },

  beforeUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    set(val) {
      this.pageNum = val;
    },
    next() {
      this.pageNum++;
    },
    previous() {
      this.pageNum--;
    },
    checkSale: function (food, statusArray) {
      if (statusArray.includes("Sale Off")) {
        if (parseFloat(food.food_discount) > 0) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    checkBest: function (food, statusArray) {
      if (statusArray.includes("Best Seller")) {
        if (food.food_status.includes("best seller")) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    checkOnl: function (food, statusArray) {
      if (statusArray.includes("Online Only")) {
        if (food.food_status.includes("online only")) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    checkSeason: function (food, statusArray) {
      if (statusArray.includes("Seasonal Dishes")) {
        if (food.food_status.includes("seasonal dishes")) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    checkNew: function (food, statusArray) {
      if (statusArray.includes("New Dishes")) {
        if (food.food_status.includes("new dishes")) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    evaluateStatus: function (food, statusArray) {
      this.pageNum = 0;
      if (statusArray.length != 0) {
        if (
          this.checkSale(food, statusArray) &&
          this.checkBest(food, statusArray) &&
          this.checkNew(food, statusArray) &&
          this.checkSeason(food, statusArray) &&
          this.checkOnl(food, statusArray)
        ) {
          return food;
        }
      } else {
        return food;
      }
    },
    evaluatePrice: function (food, priceRange) {
      this.pageNum = 0;
      var cal = parseFloat(food.food_price) - parseFloat(food.food_discount);
      if (priceRange == "2,5") {
        if (2 <= cal && cal <= 5) {
          return food;
        }
      } else if (priceRange == "5,10") {
        if (5 <= cal && cal <= 10) {
          return food;
        }
      } else if (priceRange == "10,12") {
        if (10 <= cal && cal <= 12) {
          return food;
        }
      } else if (priceRange == "2") {
        if (cal <= 2) {
          return food;
        }
      } else if (priceRange == "12") {
        if (cal >= 12) {
          return food;
        }
      } else if (priceRange == "") {
        return food;
      }
    },
    filterFoodBtn: function (e) {
      this.pageNum = 0;
      if (
        this.foodObj.category != e.target.value &&
        this.previousCategoryClicked != ""
      ) {
        this.previousCategoryClicked.target.style.background = "#66af29";
      }
      this.foodObj.category = e.target.value;
      this.previousCategoryClicked = e;
      e.target.style.background = "#66af29";
    },
    filterStatusBtn: function (e) {
      this.pageNum = 0;
      if (this.foodObj.status.includes(e.target.value) == false) {
        this.foodObj.status.push(e.target.value);
        document.querySelector(`[for=${e.target.id}]`).style.background =
          "#66af29";
        document.querySelector(`[for=${e.target.id}]`).style.color = "white";
        document
          .querySelector(`[for=${e.target.id}]`)
          .querySelector(":scope > button").style.display = "block";
      }
    },
    filterPriceBtn: function (e) {
      this.pageNum = 0;
      this.foodObj.price = "";
      this.foodObj.price += e.target.value;
      document.querySelector(`[for=${e.target.id}]`).style.background =
        "#66af29";
      document.querySelector(`[for=${e.target.id}]`).style.color = "white";
      document
        .querySelector(`[for=${e.target.id}]`)
        .querySelector(":scope > button").style.display = "block";
      if (this.previousPriceClicked != "") {
        document.querySelector(
          `[for=${this.previousPriceClicked.target.id}]`
        ).style.background = "inherit";
        document.querySelector(
          `[for=${this.previousPriceClicked.target.id}]`
        ).style.color = "inherit";
        document
          .querySelector(`[for=${this.previousPriceClicked.target.id}]`)
          .querySelector(":scope > button").style.display = "none";
      }
      this.previousPriceClicked = e;
    },
    filterTypeBtn: function (e) {
      this.pageNum = 0;
      this.foodObj.type = "";
      this.foodObj.type += e.target.value;
      document.querySelector(`[for=${e.target.id}]`).style.background =
        "#66af29";
      document.querySelector(`[for=${e.target.id}]`).style.color = "white";
      document
        .querySelector(`[for=${e.target.id}]`)
        .querySelector(":scope > button").style.display = "block";
      if (this.previousTypeClicked != "") {
        document.querySelector(
          `[for=${this.previousTypeClicked.target.id}]`
        ).style.background = "inherit";
        document.querySelector(
          `[for=${this.previousTypeClicked.target.id}]`
        ).style.color = "inherit";
        document
          .querySelector(`[for=${this.previousTypeClicked.target.id}]`)
          .querySelector(":scope > button").style.display = "none";
      }
      this.previousTypeClicked = e;
    },
    unselectStatusBtn: function (e) {
      this.pageNum = 0;
      this.foodObj.status = this.foodObj.status.filter(function (a) {
        return a !== e.target.value;
      });
      e.target.parentNode.style.background = "inherit";
      e.target.parentNode.style.color = "inherit";
      e.target.parentNode.querySelector(":scope > button").style.display =
        "none";
    },
    unselectPriceBtn: function () {
      this.pageNum = 0;
      this.foodObj.price = "";
      document.querySelector(
        `[for=${this.previousPriceClicked.target.id}]`
      ).style.background = "inherit";
      document.querySelector(
        `[for=${this.previousPriceClicked.target.id}]`
      ).style.color = "inherit";
      document
        .querySelector(`[for=${this.previousPriceClicked.target.id}]`)
        .querySelector(":scope > button").style.display = "none";
      this.previousPriceClicked = "";
    },
    unselectTypeBtn: function () {
      this.pageNum = 0;
      this.foodObj.type = "";
      document.querySelector(
        `[for=${this.previousTypeClicked.target.id}]`
      ).style.background = "inherit";
      document.querySelector(
        `[for=${this.previousTypeClicked.target.id}]`
      ).style.color = "inherit";
      document
        .querySelector(`[for=${this.previousTypeClicked.target.id}]`)
        .querySelector(":scope > button").style.display = "none";
      this.previousTypeClicked = "";
    },
    addItem: function (index) {
      this.sendId = parseInt(this.currentPageItems[index].food_id);
      this.showQuickView = !this.showQuickView;
    },

    closeView: function () {
      this.showQuickView = !this.showQuickView;
    },

    displayFilterDrop: function () {
      let divControl1 = document.getElementsByClassName("filter-heading");
      let divControl2 = document.getElementsByClassName("filter-section");
      for (var i = 0; i < divControl1.length; i++) {
        if (this.showDropDown) {
          divControl1[i].style.display = "none";
          divControl2[i].style.display = "none";
        } else {
          divControl1[i].style.display = "block";
          divControl2[i].style.display = "block";
        }
      }
      this.showDropDown = !this.showDropDown;
    },

    async getStatus() {
      let langStatus = await axios.get("/langstatus/" + this.user.user_id);
      this.newLangStatus = langStatus.data[0].langstatus;
      //   console.log(this.newLangStatus);
      //   console.log(this.langObj[this.newLangStatus].words[0] )
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
  components: { QuickView },
};
</script>

<style scoped>
input[type="button"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.unselect-btn:active,
.unselect-btn:focus,
.action-btn:active,
.action-btn:focus {
  border: none;
  outline: none;
}

hr {
  border-top: 3px solid #66af29;
  width: 100%;
}

.unselect-btn {
  background: transparent;
  padding-right: 10px;
  cursor: pointer;
  color: inherit;
  display: none;
}

.filter-section {
  width: inherit;
}

.filter-heading {
  padding-top: 30px;
}

.filter-heading h1 {
  color: #2f5899;
}

.filter-option {
  list-style-type: none;
  width: inherit;
}

.filter-option label {
  width: 100%;
  font-size: 15px;
  padding: 3px 0px;
}

.filter-option label:hover {
  color: white;
  background-color: #7cc200 !important;
  transition: all 0.5s ease;
}

.search-box {
  width: 100%;
  justify-content: center;
  position: relative;
  display: flex;
  background-color: aliceblue;
}

.search-input {
  margin: 0;
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: rgb(0, 0, 0);
  background-color: rgb(240, 255, 248);
}

::placeholder {
  color: rgb(0, 0, 0);
}

.menu-section {
  padding: 2rem 9%;
}

.menu-section .menu-tabs {
  margin-bottom: 30px;
  flex: 0 0 100%;
  max-width: 100%;
  text-align: center;
  background-color: #66af29;
}

.menu-section .menu-tabs .menu-tab-item {
  display: inline-block;
  cursor: pointer;
  padding: 5px 30px;

  font-size: 20px;
  color: whitesmoke;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.3s ease;
  margin: 0;
}

.menu-section .menu-tabs .menu-tab-item:hover {
  background-color: #7cc200 !important;
}

.menu-section .menu-tabs .menu-tab-item p {
  padding: none;
  margin: none;
}

.menu-section .box-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1.5rem;
}

.menu-section .box-container .box {
  border-radius: 0.5rem;
  position: relative;
  background: #f7f7f7;
  padding: 2rem;
  text-align: center;
}

.menu-section .box-container .box .fa-heart {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2.5rem;
  color: #666;
  cursor: pointer;
}

.menu-section .box-container .box .fa-heart:hover {
  color: #2f5899;
}

.menu-section .box-container .box .image {
  margin: 1rem 0;
}

.menu-section .box-container .box .image img {
  height: 15rem;
}


.menu-section .box-container .box .content h3 {
  font-size: 2rem;
  color: #130f40;
}

.menu-section .box-container .box .content .stars {
  padding: 1rem 0;
  font-size: 1.7rem;
}

.menu-section .box-container .box .content .stars i {
  color: #7cc200;
}

.menu-section .box-container .box .content .stars span {
  color: #666;
}

.menu-section .box-container .box .content .desc p {
  font-size: 14px;
  margin: 0;
}

.menu-section .box-container .box .content .price {
  font-size: 2rem;
  color: #130f40;
}

.menu-section .box-container .box .content .price span {
  font-size: 1.5rem;
  color: #666;
  text-decoration: line-through;
}

.menu-section .action-row {
  padding-top: 30px;
  width: 100%;
  text-align: center;
  font-size: 20px;
}

.menu-section .action-row .action-btn {
  background-color: #66af29;
  width: 26vh;
  height: 6vh;
  padding: 3px;
  border: 2px solid #66af29;
  border-radius: 5%;
  color: white;
}

.menu-section .action-row span {
  margin-right: 15px;
}

.menu-section .action-row span:hover {
  cursor: pointer;
}

.menu-section .action-row span.highlight {
  color: #2f5899;
}

.menu-section .action-row span:first-of-type {
  margin-left: 15px;
}

.filter-drop-down {
  display: none;
}

@media (min-width: 576px) {
  .filter-heading,
  .filter-section {
    display: block !important;
  }
}

@media (max-width: 768px) {
  .menu-section .box-container {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;
  }

  .menu-section .box-container .box .content h3 {
    height: 4rem;
  }
}

@media (max-width: 576px) {
  .search-box,
  .filter-heading,
  .filter-section {
    width: auto;
  }

  .filter-option {
    width: 100%;
  }

  .filter-drop-down {
    display: block;
    background-color: #2f5899;
    color: white;
    font-weight: 400;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .filter-drop-down p {
    font-size: 20px;
    padding: 5px 0px;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }

  .filter-drop-down p span {
    font-size: 20px;
    padding-right: 10px;
    text-transform: lowercase;
    font-weight: 300;
  }

  .filter-heading,
  .filter-section {
    display: none;
  }

  .menu-tabs .menu-tab-item {
    font-size: 12px !important;
    padding: 5px 20px !important;
  }

  .menu-section .action-row {
    font-size: 16px !important;
  }

  .menu-section .action-row span {
    margin-right: 5px;
  }

  .menu-section .box-container .box .image img {
    height: 10rem;
  }

  .menu-section .box-container .box .desc p,
  .menu-section .box-container .box .content .stars {
    font-size: 10px !important;
  }

  .menu-section .box-container .box .content h3 {
    font-size: 14px !important;
    height: 28px;
  }
}

.border-color {
  background-color: rgb(240, 255, 248);
}
.border-shadow {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2),
    /* Top left */ 0px 4px 6px rgba(0, 0, 0, 0.1),
    /* Bottom right */ 0px 8px 25px rgba(0, 0, 0, 0.2); /* Bottom right, larger blur */
}

.r {
  background-color: rgba(235, 21, 21, 0.788);
}
.r-h {
  background-color: rgba(241, 44, 44, 0.788);
}
.r-h:hover {
  background-color: rgba(241, 44, 44, 0.788);
}
.g {
    background-color: #489e02;

}
.g:hover {
  background-color: #59ac16;
}

.b-r {
  border: 1px #68b926 solid;
}

.food_status {
  background-color: rgba(241, 44, 44, 0.788);
  width: 67%;
  color: rgb(255, 255, 255);
  position: absolute;
  top: 0;
  right: 0;
}
.paper {
  background-color: #ff0404;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.4); /* Add a subtle shadow */
  padding: 15px; /* Adjust padding as needed */
  transform: rotate(-5deg);
  transform: skewY(-7deg); /* Rotate the element */
}

.del {
  text-decoration: line-through;
  color: rgba(243, 236, 236, 0.87); /* Change the color to red */
  /* Add additional styling as needed */
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

.py{
  padding-top: 100px;
  padding-bottom: 100px;
}

</style>
