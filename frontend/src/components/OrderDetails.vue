<template>
    <div class="order-details blur ">
        <div class="order-details-inner ">
            <h2 class="d-flex justify-content-between">{{ langObj[this.newLangStatus].words[0] }}
                <slot></slot>
            </h2>
            <div class="d-flex flex-wrap h-30 flex-row" style="overflow-y: auto;">
                <div style="flex: 50%;" v-for="(f, index) in filterFoods" :key="f.food_id">
                    <div class="product-detail d-flex ">
                        <!-- <div class="image">
                            <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
                        </div> -->
                        <div class="content ">
                            <p class="name ">{{ f.food_name }} <span> quantity {{ item_qty[index] }}</span></p>
                            <!-- <p class="desc">{{ f.food_desc }}</p> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="price px-5 ">
                <h1>{{ langObj[this.newLangStatus].words[1] }} {{ billMatch.bill_paid }}</h1>
                <h1>{{ langObj[this.newLangStatus].words[2] }}{{ billMatch.bill_discount }}birr</h1>
                <h1>{{ langObj[this.newLangStatus].words[3] }} {{ billMatch.bill_delivery }}birr</h1>
                <h1>{{ langObj[this.newLangStatus].words[4] }}{{ billMatch.bill_total }}birr</h1>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    props: ['bill'],
    name: "OrderDetails",

    data() {
        return {
            allFoodsInBill: [],
            item_qty: [],

            billMatch: undefined,

            languageStatus : 0,
            langObj: [
            { words: ["bill detail ","Paid:","Discount:","Delivery Fee:","Total:"] },
                
                { words: ["bal'ina biilii" , "Kaffalame:","Gatii gadi bu'aa:","Kaffaltii Geejjibaa:","Ida'ama:"] },
              ],
            newLangStatus : 0,
            interval: "",
        }
    },

    created() {
        this.getAllFoods();
        this.getBillStatus()
        this.getStatus();

    },
    mounted: function () {
        this.autoUpdate();
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        clearInterval(this.interval)
        window.removeEventListener('scroll', this.handleScroll);
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        filterFoods: function () {
            return this.allFoods.filter(
                (f) => this.matchID(f, this.allFoodsInBill)
            );
        },
    },

    methods: {
        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (parseInt(food.food_id) == element) {
                    temp = food
                }
            });
            return temp
        },

        async getAllFoods() {
            if (this.bill) {
                let data = (await axios.get('/billdetails/' + this.bill)).data;
                data.forEach(element => {
                    this.allFoodsInBill.push(element.food_id);
                    this.item_qty.push(element.item_qty)
                });
            }
        },

        async getBillStatus() {
            if (this.bill) {
                this.billMatch = (await axios.get('/billstatus/bill/' + this.bill)).data[0];
            }
        },

        async getStatus(){
          let langStatus = await axios.get('/langstatus/' + this.user.user_id);
          this.newLangStatus = langStatus.data[0].langstatus;
        //   console.log(this.newLangStatus);
        //   console.log(this.langObj[this.newLangStatus].words[0] )
        
        },
        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllBills();
                this.getStatus();
            }.bind(this), 50);
        }
    }
}
</script>

<style scoped>
.order-details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.order-details .order-details-inner {
    width: 60vw;
    height: 70vh;
    background-color: #fff;
    padding: 32px;
}


.order-details .order-details-inner h2 {
    margin: 0;
    font-size: 32px;
    color: #128a07;
    margin-bottom: 20px;
}


.order-details .order-details-inner .product-detail .image img {
    height: 8rem;
    width: 8rem;
    margin: 20px;
}

.order-details .order-details-inner .product-detail .content {
    margin-top: 20px;
    font-size: 12px;
    width: 100%;
}

.order-details .order-details-inner .product-detail .content p:first-of-type {
    font-size: 16px;
    color: #f38609;
}

.order-details .order-details-inner .product-detail .content p span {
    font-size: 14px;
    color: black;
}

.order-details .order-details-inner .price {
    margin-top: 30px;
    font-size: 16px;
}


@media (max-width: 768px) {

    .order-details .order-details-inner {
        width: 60vw;
        height: 70vh;

    }

    .order-details .order-details-inner h2 {
        font-size: 20px;
    }

    .order-details .order-details-inner .product-detail .content .desc,
    .order-details .order-details-inner .product-detail .content .name span {
        font-size: 12px !important;
    }

    .order-details .order-details-inner .product-detail .content .name {
        font-size: 14px !important;
    }


}

@media (max-width: 576px) {
    .order-details .order-details-inner {
        width: 70vw;
        height: 70vh;
    }

    .order-details .order-details-inner div:first-of-type {
        flex-direction: column;
    }
}

@media (max-width: 376px) {
    .order-details .order-details-inner {
        width: 90vw;
        height: 65vh;
        padding: 5px !important;
    }

    .order-details .order-details-inner .product-detail .content .name {
        font-size: 12px !important;
    }


}
.g {
    background-color: #489e02;

}
.g:hover {
  background-color: #59ac16;
}
.blur{
    background-color: #1817178e;
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
</style>
