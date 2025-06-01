<template>
    <div class="home-body">
        <div></div>
        <!-- <div class=" banner">
            <div class="img-container">
                         <img src="../assets/images/burger.png" style="width: 90px;" alt="">
                    </div>
                    <div style="width: 20%;"></div>
            <div class="img1-container"><img src="../assets/images/dpn-removebg-preview.png" class="my-4" style="width: 14%;" alt=""></div>
        </div> -->
        

        <div class="home-banner">
            <div class="grid-banner row ">
                <div class="grid col-md-6 r col-sm-12 mt-5 col-12 z-1 img-1">
                    <img src="../assets/images/burger.png" class="mt-5 " alt="">
                    <div class="content" v-if="user">
                        <h3 >{{ langObj[this.newLangStatus].words[0] }}</h3>
                        <!-- <h3>{{ langObj[this.newLangStatus].words[1] }}</h3> -->
                        <router-link @click="scrollToTop()"  to="/menu" v-if="user" class="btn g g-h">{{ langObj[this.newLangStatus].words[1] }}</router-link>
                      
                    </div>
                    <div class="content" v-else>
                        <h3 >{{ langObj[this.localLangStatus].words[0] }}</h3>
                        <!-- <h3>{{ langObj[this.newLangStatus].words[1] }}</h3> -->
                        <router-link @click="scrollToTop()"  to="/menu" class="btn g g-h">{{ langObj[this.localLangStatus].words[1] }}</router-link>
                    </div>
                </div>
<!-- 
                <div class="grid col-md-4">
                    <img src="../assets/images/delivery-bike.jpg" alt="">
                    <div class="content center">
                        <span>{{ langObj[this.newLangStatus].words[2] }}</span>
                      
                    </div>
                </div> -->

                <div class="grid col-md-6 col-sm-12 my-5 col-12">
                    <img src="../assets/images/table.jpg" alt="">
                    <div class="content" v-if="user">
                        <h3>{{ langObj[this.newLangStatus].words[3] }}</h3>
                        <router-link @click="scrollToTop()" to="/table" class="btn g g-h">{{ langObj[this.newLangStatus].words[4] }}</router-link>
                    </div>
                    <!-- <div class="content" v-else>
                        <h3>{{ langObj[this.localLangStatus].words[3] }}</h3>
                        <router-link @click="scrollToTop()" to="/table" class="btn g g-h">{{ langObj[this.localLangStatus].words[4] }}</router-link>
                    </div> -->
                </div>

            </div>

        </div>

        <div class="home-about g-l ">
            
            <div class="content z-2" v-if="user">
                <h3 class="title">{{ langObj[this.newLangStatus].words[5] }}</h3>
                <p>{{ langObj[this.newLangStatus].words[6] }}</p>
                <router-link @click="scrollToTop()" to="/about" class="btn g g-h">{{ langObj[this.newLangStatus].words[7] }}</router-link>
            </div>
            <div class="content z-2" v-else>
                <h3 class="title">{{ langObj[this.localLangStatus].words[5] }}</h3>
                <p>{{ langObj[this.localLangStatus].words[6] }}</p>
                <router-link @click="scrollToTop()"  to="/about" class="btn g g-h">{{ langObj[this.localLangStatus].words[7] }}</router-link>
            </div>
      <div class="paper-1"></div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: "Home",
    data(){
        return{
        languageStatus : 0,
        langObj: [
            { words: ["Convenience Delivered","order now","ready to deliver","reserve table","reserve now","Fast Delivery","We Ensure Speed and Reliability in Every Order. Quick, Efficient, and Convenient Service Awaits, Whether You Order In or Take Away.","read more"] },
                
                { words: ["Mijataa Geejjibsiifame", "amma ajajaa", "geessuuf qophaa'aa", "gabatee rizaabii", "amma reserve godhaa", "Saffisaan Geejjibaa", "Ajaja Hundaa Keessatti Saffisaa fi Amanamummaa Mirkaneessina. Tajaajilli Saffisaa, Gahumsaa fi Mijataa Ta'e Eegaa, Ajajni Yoos Fudhattan.","bal'inaan dubbisaa"] },
        ],
         newLangStatus : 0,
         interval: "",
        langValue: 0,
        localLangStatus: null,

    }},
  computed: {
        ...mapState(["user"])
    },
    created() {
        this.getStatus();
        const storedLangStatus = localStorage.getItem('newLangStatus');
        if (storedLangStatus !== null) {
        this.localLangStatus = parseInt(storedLangStatus, 10);
    }
    
        // this.localLangStatus = localStorage.getItem('newLangStatus');
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
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        async getStatus(){
          let langStatus = await axios.get('/langstatus/' + this.user.user_id);
          this.newLangStatus = langStatus.data[0].langstatus;
        //   console.log(this.newLangStatus);
        //   console.log(this.langObj[this.newLangStatus].words[0] )
        
        },
    //      async eng(){
    //   this.langValue = 0;
    //   let langStatus = this.langValue;
    //   this.newLangStatus = langStatus;
    // },
    // async oro(){
    //   this.langValue = 1;
    //   let langStatus = this.langValue;
    //   this.newLangStatus = langStatus;
    // },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getStatus();

            }.bind(this), 50);
        }

        
    }
};
</script>

<style scoped>

.home-body{
    background-color: #ffffffe5;
    background-size: contain;
}
.home-main,
.home-about,
.home-banner,
.home-category {
    padding: 2rem 9%;
}

.home-main {
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    gap: 2rem;
    position: relative;
    overflow: hidden;
}

.home-main .content {
    flex: 1 1 41rem;
}
.home-about{
    width: 95%;
    margin: auto;
    margin-bottom: 2%;
}
/* .home-main .content span {
    font-size: 2rem;
    color: #27ae60;
} */

.home-main .content h3 {
    font-size: 4rem;
    color: #130f40;
    padding-top: 1rem;
}

.home-main .content p {
    font-size: 1.4rem;
    color: #666;
    line-height: 2;
    padding: 1rem 0;
}

.home-main .image {
    flex: 1 1 41rem;
    margin: 2rem 0;
    pointer-events: none;
}

.home-main .image .home-img {
    width: 100%;
    margin-top: 5rem;
}

.home-main .home-parallax-img {
    position: absolute;
    top: -15rem;
    right: -15rem;
    width: 80vw;

}

/* home category */
.home-category {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1.5rem;
    padding-bottom: 5rem;
}

.home-category .box {
    padding: 2rem;
    text-align: center;
    border-radius: .5rem;
    background: #f7f7f7;
}

.home-category .box:hover {
    background: #d54d52;
}

.home-category .box:hover h3 {
    color: #000000;
}

.home-category .box img {
    height: 7rem;
}

.home-category .box h3 {
    font-size: 1.8rem;
    color: #130f40;
}


/* home banner */

.home-banner .row-banner .content {
    position: absolute;
    top: 50%;
    left: 7%;
    transform: translateY(-50%);
}

.home-banner .row-banner .content span {
    font-family: 'Satisfy', cursive;
    font-size: 4rem;
    color: #27ae60;
    color: #130f40;
}

.home-banner .row-banner .content h3 {
    font-size: 6rem;
    color: orange;
    text-transform: uppercase;
}

.home-banner .row-banner .content p {
    font-size: 2rem;
    padding-bottom: 1rem;
}


.home-banner .grid-banner .grid {
    overflow: hidden;
    width: 25rem;
    height: 40rem;
}


.home-banner .grid-banner .grid img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.home-banner .grid-banner .grid .content {
    position: absolute;
    top: 2rem;
    padding: 0 2rem;
}

.home-banner .grid-banner .grid .content.center {
    text-align: center;
    width: 100%;
}

.home-banner .grid-banner .grid .content.center span {
    color: #666;
}

.home-banner .grid-banner .grid .content.center h3 {
    color: #130f40;
}

.home-banner .grid-banner .grid .content span {
    font-size: 2.5rem;
    color: #fff;
}

.home-banner .grid-banner .grid .content h3 {
    font-size: 3rem;
    color: #fff;
    padding-top: .5rem;
}

.home-about {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    background: #f7f7f7;
}

.home-about .image {
    flex: 1 1 40rem;
}

.home-about .image img {
    width: 100%;
}

.home-about .content {

    flex: 1 1 40rem;
}

.home-about .content span {
    font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: #27ae60;
}

.home-about .content .title {
    font-size: 3rem;
    padding-top: .5rem;
    color: #130f40;
}

.home-about .content p {
    padding: 1rem 0;
    line-height: 2;
    font-size: 1.4rem;
    color: #666;
}

.home-about .content .icons-container {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.home-about .content .icons-container .icons {
    flex: 1 1 20rem;
    border-radius: .5rem;
    background: #fff;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.home-about .content .icons-container .icons h3 {
    font-size: 1.7rem;
    color: #130f40;
}



@media (max-width: 768px) {
    #menu-btn {
        display: inline-block;
    }

    .home-main .home-parallax-img {
        top: 0;
        right: 0;
        width: 100%;
    }

    .home-banner .grid-banner .content h3 {
        font-size: 15px !important;
    }

    .home-banner .grid-banner .content.center {
        padding-left: 0px !important;
    }

}



@media (max-width: 576px) {
    .home-main .content h3 {
        font-size: 3rem;
    }

    .home-main .content p {
        font-size: 1.5rem;
    }
}

.g{
    background-color: #489e02;
}
.g-h:hover{
  background-color: #fc0000;
}
.g-l{
  background-color: #e0f1d1;
}

.banner{
    
    width: 100%;
    height: 50px;
    margin: auto;
    background-color: rgba(196, 195, 195, 0.788);

    margin-bottom: 5%;

}

.img-container{
    width: 50px;
    height: 60px;
    
}
.img1-container{
    margin-left: 63%;
    margin-top: 0;
    height: 50px;

}
.img1-container img {
    width: 100%;
    height: auto;
}
.r{
    background-color: rgb(238, 12, 12);
}

.paper-1 {
  background-color: #489e02;
  padding: 15px; /* Adjust padding as needed */
  transform: skewY(35deg); /* Rotate the element */
  position: absolute;
  top: 40%;
  left: 0%;
  width: 100%;
  height: 15%;
  z-index: 1;
}

.z-1{
    z-index: 3;
}
.z-2{
    z-index: 4;
}
.img-1{
  box-shadow: 25px 0 25px rgba(0, 0, 0, 0.5); /* Add a subtle shadow */

}
</style>




