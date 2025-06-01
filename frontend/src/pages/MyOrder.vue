<template>
    <div class="my-order-container banner " :class="filterBills.length > 0 ? '' : 'fit-screen'">
        <div v-if="filterBills.length > 0" class="my-order-cards">
            <div v-for="b in filterBills.slice().reverse()" class="card mb-5" :key="b.bill_id" >
                <div class="card-head track-1 d-flex flex-wrap flex-sm-nowrap justify-content-between">
                    <div><h1>{{ langObj[this.newLangStatus].words[0] }}</h1> 
                        <span>{{ langObj[this.newLangStatus].words[1] }}</span>
                        <span>{{ b.bill_id }}</span>
                    </div>
                    <button class="btn g py-1" @click="sendBillId(b.bill_id)">{{ langObj[this.newLangStatus].words[2] }}</button>
                </div>

                <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary ">
                    <div class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[3] }}</span>{{ " " + b.bill_food }}
                    </div>
                    <!-- <div v-if="b.bill_status < 6" class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[4] }}</span>{{ " " + avaiableStatus[b.bill_status]
                    }}
                    </div><div v-else class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[4] }}</span>{{ " " + avaiableStatus[b.bill_status -1]
                    }}
                    </div> -->
                    <div class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[4] }}</span> {{ b.item_qty }}</div>

                    <div class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[5] }}</span> {{ b.bill_when }}</div>
                </div>
                <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary ">

                    <div class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[6] }}</span> {{ b.bill_total }}birr</div>
                    <div class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[7] }}</span>{{ " " + b.bill_address }}
                    </div>
                    <div class="w-100 text-center py-1 px-2"><span>{{ langObj[this.newLangStatus].words[8] }}</span>{{ " " + b.bill_phone }}
                    </div>
                </div>

                <div class="card-body track">
                    <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between transparent">
                        <div class="step" :class="b.bill_status >= 1 ? 'completed ' : ''">
                            <div class="step-icon-wrap">
                                <div class="step-icon"><i class="fa-solid fa-utensils"></i></div>
                            </div>
                            <h4 class="step-title">{{ langObj[this.newLangStatus].words[9] }}</h4>
                        </div>
                        <div class="step" :class="b.bill_status >= 2 ? 'completed' : ''">
                            <div class="step-icon-wrap">
                                <div class="step-icon">
                                    <i class="fa-solid fa-fire"></i></div>
                            </div>
                            <h4 class="step-title">{{ langObj[this.newLangStatus].words[10] }}</h4>
                        </div>
                        <div class="step" :class="b.bill_status >= 3 ? 'completed' : ''">
                            <div class="step-icon-wrap">
                                <div class="step-icon"><i class="fa fa-check"></i></div>
                            </div>
                            <h4 class="step-title">{{ langObj[this.newLangStatus].words[11] }}</h4>
                        </div>
                        <div class="step" :class="b.bill_status >= 4 ? 'completed' : ''">
                            <div class="step-icon-wrap">
                                <div class="step-icon"><i class="fa-solid fa-truck"></i></div>
                            </div>
                            <h4 class="step-title">{{ langObj[this.newLangStatus].words[12] }}</h4>
                        </div>
                        <div class="step" :class="b.bill_status >= 5 ? 'completed' : ''">
                            <div class="step-icon-wrap">
                                <div class="step-icon"><i class="fa-solid fa-house-user"></i></div>
                            </div>
                            <h4 class="step-title">{{ langObj[this.newLangStatus].words[13] }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="box-content row no-food">
            <div class="content">
                <h2>{{ langObj[this.newLangStatus].words[14] }}</h2>
            </div>
            <div>
                <!-- <img src="../assets/images/no-orders.png" alt="" /> -->
            </div>
            <router-link class="btn b" to="/menu">{{ langObj[this.newLangStatus].words[15] }}</router-link>
        </div>

        <OrderDetails v-if="showOrderDetails" :bill="sendId">
            <button class="btn g" @click="closeView">X</button>
        </OrderDetails>
    </div>

</template>


<script>
import OrderDetails from "@/components/OrderDetails.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: 'MyOrder',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered"],
            allBills: [],

            showOrderDetails: false,
            sendId: null,

            interval: "",

            languageStatus : 0,
            langObj: [
            { words: ["Order Track Dashboard","Order No - ","Bill Detail","Food:","Quantity:","When:","Total:","Address:","Phone:","Confirmed","Preparing","Checking","Delivering","Delivered","You do not have any orders yet","Order now!"] },
                
                { words: ["Daashboordii Hordoffii Ajaja", "Lakk ajaja - ", "bal’inaan bill","nyaata:","Baay'ina:","Yoom:","Ida'ama:","Teessoo:","Bilbila:","Mirkanaa'eera", "Qophii", "Sakatta'uu", "Geejjibaa", "Qaqqabsiise","Hanga ammaatti ajaja tokkollee hin qabdu", "Amma ajajaa!"] },
        ],
            newLangStatus : 0,
        }
    },

    created() {
        this.getAllBills();
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

        filterBills: function () {
            return this.allBills.filter((b) => b.bill_status < 7 && b.bill_status > 0);
        },
    },

    
    methods: {
        async getAllBills() {
            if (this.user) {
                this.allBills = (await axios.get('/billstatus/user/' + this.user.user_id)).data;
                // console.log(this.user.user_id);
                // console.log(this.allBills);
            }
        },

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
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
    },
    components: { OrderDetails }
}
</script>

<style scoped>
.my-order-container {
    padding: 8% 9%;
    background: #fff;
    height: 100%;
}

.my-order-container.fit-screen {
    height: 90vh;
}

.my-order-cards {
    margin-bottom: 2rem;
}

.card {
    margin-bottom: 3px;
    margin: auto;
    width: 80%;
}

.card-head {
    padding: 12px 0px;
    color: rgb(0, 0, 0);
    font-size: 16px;
    background: #ffffff33;

}

.card-head span:first-of-type {
    margin-left: 20px;
}

.card-head button {
    background-color: inherit;
    color: white;
    margin-right: 20px;
    font-weight: 500;
    background-color: #128b02;

}



.card-summary {
    padding: 12px 10px;
    background: #ffffff;
    font-size: 14px;
    color: rgb(64, 49, 49);
}

.steps .step {
    display: block;
    width: 100%;
    margin-bottom: 35px;
    text-align: center
}

.steps .step .step-icon-wrap {
    display: block;
    position: relative;
    width: 100%;
    height: 80px;
    text-align: center
}

.steps .step .step-icon-wrap::before,
.steps .step .step-icon-wrap::after {
    display: block;
    position: absolute;
    top: 50%;
    width: 50%;
    height: 3px;
    margin-top: -1px;
    background-color: #e1e7ec;
    content: '';
    z-index: 1
}

.steps .step .step-icon-wrap::before {
    left: 0
}

.steps .step .step-icon-wrap::after {
    right: 0
}

.steps .step .step-icon {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #e1e7ec;
    border-radius: 50%;
    background-color: #f5f5f5;
    color: #374250;
    font-size: 38px;
    line-height: 81px;
    z-index: 5
}

.steps .step .step-title {
    margin-top: 16px;
    margin-bottom: 0;
    color: #606975;
    font-size: 14px;
    font-weight: 500
}

.steps .step:first-child .step-icon-wrap::before {
    display: none
}

.steps .step:last-child .step-icon-wrap::after {
    display: none
}

.steps .step.completed .step-icon-wrap::before,
.steps .step.completed .step-icon-wrap::after {
    background-color: #6ca404;
}

.steps .step.completed .step-icon {
    /* border-color: #6ca404; */
    border: 3px solid #6ca404;
    background-color: #6ca404;
    /* color: #fff */
}
/* @keyframes blink {
    50%{
        opacity: 0;
    }
    80%{
        opacity: 0.6;
    }
}

.completed-blink{
    border: 3px solid #6ca404;
    animation: blink 2.5s linear infinite;
    box-shadow: 0 0 5px 10px rgba(0, 0, 0, 0.2) ;
} */

.no-food {
    text-align: center;
    justify-content: center;
    display: block;
    width: 100%;
    height: 100%;
    margin: auto;
}

.no-food a {
    margin-top: 20px;
    margin-left: -10px;
}

@media (max-width: 320px) {
    .my-order-container {
        padding: 0px;
    }

    .card-head {
        font-size: 14px;
    }

    .no-food .content h2 {
        font-size: 14px;
    }


}

@media (max-width: 576px) {
    .my-order-container {
        padding: 1rem 4.5%;
    }

    .flex-sm-nowrap .step .step-icon-wrap::before,
    .flex-sm-nowrap .step .step-icon-wrap::after {
        display: none
    }

    .card {
        margin-top: 20px;
    }

    .no-food div img {
        width: 85vw;
    }
}

@media (max-width: 768px) {

    .flex-md-nowrap .step .step-icon-wrap::before,
    .flex-md-nowrap .step .step-icon-wrap::after {
        display: none
    }
}

@media (max-width: 991px) {

    .flex-lg-nowrap .step .step-icon-wrap::before,
    .flex-lg-nowrap .step .step-icon-wrap::after {
        display: none
    }
}

@media (max-width: 1200px) {

    .flex-xl-nowrap .step .step-icon-wrap::before,
    .flex-xl-nowrap .step .step-icon-wrap::after {
        display: none
    }
}

.bg-faded,
.bg-secondary {
    background-color: #f5f5f5 !important;
}

.banner{
    background-image: url('../assets/images/body.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.banner-1{
    background-color: #6ca404;
}

.g {
    background-color: #57ad06e1;

}
.g:hover {
  background-color: #59ac16;
}


.transparent{
    background-color: transparent;
}
.b {
    background-color: #ad061ce1;

}
.b:hover {
  background-color: #cc0d26e1;
}

.content h2 {
    color: white;
}
</style>