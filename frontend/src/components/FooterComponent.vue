<template>
    <div class="footer" v-if="user">
    

        <div class="box-container" >
                <h3>{{ langObj[this.newLangStatus].words[0] }}</h3>
                <div class="box">
                <router-link @click="scrollToTop()" to="/"      class="footer-items">  {{ langObj[this.newLangStatus].words[1] }}</router-link>
                <router-link @click="scrollToTop()" to="/menu"  class="footer-items"> {{ langObj[this.newLangStatus].words[2] }}</router-link>
                <router-link @click="scrollToTop()" to="/table" class="footer-items"> {{ langObj[this.newLangStatus].words[3] }}
                </router-link>
                <router-link @click="scrollToTop()" to="/about" class="footer-items"> {{ langObj[this.newLangStatus].words[4] }}</router-link>
                </div>
        </div>    </div> 
    <div class="footer" v-else>

                <div class="box-container" >
                <h3>{{ langObj[this.localLangStatus].words[0] }}</h3>
                <div class="box">
                <router-link @click="scrollToTop()" to="/"      class="footer-items">  {{ langObj[this.localLangStatus].words[1] }}</router-link>
                <router-link @click="scrollToTop()" to="/menu"  class="footer-items"> {{ langObj[this.localLangStatus].words[2] }}</router-link>
                <router-link @click="scrollToTop()" v-if="user" to="/table" class="footer-items"> {{ langObj[this.localLangStatus].words[3] }}
                </router-link>
                <router-link @click="scrollToTop()" to="/about" class="footer-items"> {{ langObj[this.localLangStatus].words[4] }}</router-link>
                </div>
                </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    name: 'FooterComponent',
data(){
        return{
        languageStatus : 0,
        // engIndex : 1,
        // oroIndex : 1,
        langObj: [
                { words: ["quick links","home", "menu", "book a table", "about"] },
                
                { words: ["hidhannoo saffisaa","mana", "meenuu", "gabatee buufachuu", "waa'ee"] },
        ],
         newLangStatus : 0,
         interval: "",
         localLangStatus: null,
        }},

    computed: {
        ...mapState(['user'])
    },
    created() {
        this.getStatus();
         const storedLangStatus = localStorage.getItem('newLangStatus');
        if (storedLangStatus !== null) {
        this.localLangStatus = parseInt(storedLangStatus, 10);
    }},
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

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getStatus();
            }.bind(this), 0);
        }

    }
}
</script>

<style scoped>
/* footer */
.footer {
    background: #ffffff;
    padding: 2rem 9%;
        z-index: 4;

}

.footer .news-letter {
    text-align: center;
    margin-bottom: 2rem;
}

.footer .news-letter h3 {
    font-size: 2.5rem;
    color: #130f40;
    padding-bottom: 1rem;
}

.footer .news-letter form {
    max-width: 70rem;
    margin: 1rem auto;
    max-width: 70rem;

    display: flex;
    border-radius: .5rem;
    overflow: hidden;
}

.footer .news-letter form input[type="email"] {
    height: 100%;
    width: 100%;
    padding: 1rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
}

.footer .news-letter form input[type="submit"] {
    padding: 0 2rem;
    font-size: 1.6rem;
    color: #fff;
    background: #27ae60;
    cursor: pointer;
}

.footer .news-letter form input[type="submit"]:hover {
    background: #130f40;
}
.footer{
    background-color: #65af29f1;
    width: 100%;
    height: 10%;
}
.footer .box-container h3{
   display: block;
   padding-left: 40%;
   padding-top: 0.5%;
   padding-bottom: 1%;
    z-index: 2;

}
.footer .box-container .box {
    width: 60%;
    margin:  auto;
    display: flex;
    justify-content: space-around;
    z-index: 2;
}

.footer .box-container .box h3 {
    font-size: 2.2rem;
    color: #130f40;

}

.footer .box-container .box p {
    font-size: 1.4rem;
    color: #fefdfd;
    padding: 1rem 0;
}

.footer .box-container .box a {
    display: block;
    font-size: 1.4rem;
    color: #fffbfb;
    padding: 1rem 0;
}

.footer .box-container .box a:hover {
    color: #860808;
}


.footer .bottom {
    padding-top: 1rem;
    text-align: center;
}

.footer .bottom .share {
    margin: 1.5rem 0;
}

.footer .bottom .share a {
    height: 4.5rem;
    width: 4.5rem;
    line-height: 4.5rem;
    font-size: 2rem;
    border-radius: .5rem;
    margin: 0 .3rem;
    color: #fff;
    background: #27ae60;
}

.footer .bottom .share a:hover {
    background: #130f40;
}

@media (max-width: 576px) {
    .footer .box-container {

        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

    }

}
</style>