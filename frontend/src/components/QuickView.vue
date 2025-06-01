<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />

    <div v-if="user" class="quick-view">
        <div class="quick-view-inner" v-for="f in selectedFood" :key="f">
            <h2 class="d-flex justify-content-between">{{ f.food_name }}
                <slot></slot>
            </h2>
            <div class="product-detail d-flex">
                <div class="image">
                    <!-- <img :src="require(`../assets/images/${f.food_src}`)" alt="" /> -->
                </div>
                <div class="content">
                    <p class="desc">{{ f.food_desc }}</p>
                    <p v-if="this.newLangStatus == 0 || localStorage == 0" class="money">{{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}{{ langObj[this.newLangStatus].words[5] }}<span
                            v-if="parseFloat(f.food_discount) > 0">{{
                                    parseFloat(f.food_price)
                            }}{{ langObj[this.newLangStatus].words[5] }}</span></p>
                            <!--  -->

                             <p v-else class="money">{{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}birr<span
                            v-if="parseFloat(f.food_discount) > 0">{{ langObj[this.localLangStatus].words[5] }}{{
                                    parseFloat(f.food_price)
                            }}</span></p>
                    <div class="qty">
                        <label for="qty">{{ langObj[this.newLangStatus].words[0] }}</label>
                        <input type="number" name="qty" id="qty" value="1" min="1" max="1000"
                            @change="onQtyChange($event)" />
                    </div>
                    <button class="btn g" @click="addToCart">{{ langObj[this.newLangStatus].words[1] }}</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="quick-view">
        <div class="quick-view-inner">
            <h2 v-if="user" class="d-flex justify-content-between">{{ langObj[this.newLangStatus].words[2] }}
                <slot></slot>
            </h2>
            <h2 v-else class="d-flex justify-content-between">{{ langObj[this.localLangStatus].words[2] }}
                <slot></slot>
            </h2>
            <div v-if="user" class="link-to-login " style="text-align: center; margin-top: 120px;">
                <router-link class="btn g" to="/login" style="padding: 28px; font-size: 24px">{{ langObj[this.newLangStatus].words[3] }}
                </router-link>
            </div>
             <div v-else class="link-to-login " style="text-align: center; margin-top: 120px;">
                <router-link class="btn g" to="/login" style="padding: 28px; font-size: 24px">{{ langObj[this.localLangStatus].words[3] }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
export default {
    props: ['food'],
    name: "QuickView",

    data() {
        return {
            qty: 1,
            languageStatus : 0,

            langObj: [
                { words: ["Quantity:","again click to add","Please login first","login to your account", "Added  Successfully", "birr"
            ] },
                    
                    { words: ["Baay'ina:","ammas itti dabaluuf cuqaasaa", "Mee dursa Galmaa'aa", "akkaawuntii keessanitti seena", "Milkaa'inaan Dabalame", "qarshii"] },
            ],
            newLangStatus : 0,
            interval: "",
            localLangStatus: null,

        }
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        selectedFood: function () {
            return this.allFoods.filter((f) => parseInt(f.food_id) == parseInt(this.food));
        }
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
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        clearInterval(this.interval);
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        onQtyChange: function (e) {
            if (e.target.value < 1) {
                e.target.value = 1;
                this.qty = e.target.value;
            } else {
                this.qty = e.target.value;
            }
        },

        async addToCart() {
            let existItem = await axios.get('/cartItem/' + parseInt(this.user.user_id) + '/' + parseInt(this.food));

            if (existItem.data.length == 1) {
                let data = {
                    user_id: parseInt(this.user.user_id),
                    food_id: parseInt(this.food),
                    item_qty: parseInt(this.qty) + parseInt(existItem.data[0].item_qty)
                };
                await axios.put("/cartItem/", data)
                // let message = langObj[this.newLangStatus].words[4] ;
                this.$refs.alert.showAlert(this.langObj[this.newLangStatus].words[4]);


            } else {
                let data = {
                    user_id: parseInt(this.user.user_id),
                    food_id: parseInt(this.food),
                    item_qty: parseInt(this.qty)
                };

                await axios.post("/cartItem/", data)
                this.$refs.alert.showAlert(this.langObj[this.newLangStatus].words[4])
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
                this.getStatus();
            }.bind(this), 50);
        }
    },

    components: {
        VueBasicAlert
    }
}
</script>

<style scoped>
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}

.quick-view .quick-view-inner {
    width: 45vw;
    height: 55vh;
    background-color: #fff;
    padding: 32px;
}


.quick-view .quick-view-inner h2 {
    margin: 0;
    font-size: 32px;
    color: #489e02;
}

.quick-view .quick-view-inner .product-detail .image img {
    height: 20rem;
    margin: 20px;
}

.quick-view .quick-view-inner .product-detail .content {
    margin-top: 20px;
    font-size: 20px;
    width: 100%;
}

.quick-view .quick-view-inner .product-detail .content p span {
    margin-left: 5px;
    text-decoration: line-through;
    opacity: 0.5;
}

.quick-view .quick-view-inner .product-detail .content div label {
    margin-right: 10px;
}

.quick-view .quick-view-inner .product-detail .content .btn {
    margin-top: 20px;
    float: right;
}

@media (max-width: 768px) {

    .quick-view .quick-view-inner {
        width: 50vw;
        height: 40vh;

    }

    .quick-view .quick-view-inner h2 {
        font-size: 20px;
    }

    .quick-view .quick-view-inner .btn {
        font-size: 10px;
        padding: 0.3rem 0.9rem;
    }

    .quick-view .quick-view-inner .product-detail .image img {
        height: 12rem;
        margin: 30px;
        margin-left: 0px;

    }

    .quick-view .quick-view-inner .product-detail .content .desc {
        font-size: 12px;
    }

    .quick-view .quick-view-inner .product-detail .content .qty {
        font-size: 12px;
    }

    .link-to-login {
        margin-top: 20px !important;
    }
}

@media (max-width: 576px) {
    .quick-view .quick-view-inner {
        width: 90vw;
        height: 40vh;
    }

    .link-to-login {
        margin-top: 50px !important;
    }

    .link-to-login>a {
        padding: 20px !important;
        font-size: 18px !important;
    }

}
.g {
    background-color: #489e02;
    width: 100%;
}
.g:hover {
  background-color: #59ac16;
}

</style>
