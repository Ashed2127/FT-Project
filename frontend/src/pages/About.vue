<template>
    <section class="about-section">
      <div class="heading">
        <h3 v-if="user">{{ langObj[this.newLangStatus].words[0] }}</h3>
        <h3 v-else>{{ langObj[this.localLangStatus].words[0] }}</h3>

      </div>
  
      <div class="row">
        <div class="about-content">
          <img src="../assets/images/dp.jpg" class="image" alt="">
          <div class="about-content-text">
            <h2 v-if="user">
                {{ langObj[this.newLangStatus].words[1] }}
            </h2>
            <h2 v-else>
                {{ langObj[this.localLangStatus].words[1] }}
            </h2>
          </div>
        </div>
      </div>
    </section>

  </template>
  
  <script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  export default {
    name: "About",
    data(){
        return{
        languageStatus : 0,
        // engIndex : 1,
        // oroIndex : 1,
        langObj: [
                { words: ["Our Cafe","In 2003, Lewi Café started in Woliso, Ethiopia, without delivery or formal reservations. Initially focused on sharing unique flavors, it evolved with delivery services and a community space. Today, it's a multifaceted establishment offering authentic dishes and fostering community unity through food."] },
                
                { words: ["Kaffeen keenya,", "Bara 2003tti, Lewi Café, Ethiopia Woliso keessatti, osoo hin geessin ykn sirnaan reservation malee eegale. Jalqaba mi'aa addaa qooddachuu irratti kan xiyyeeffate yoo ta'u, tajaajila geejjibaa fi iddoo hawaasaa waliin guddate. Har'a dhaabbata roga hedduu qabuu fi nyaata dhugaa dhiyeessuu fi tokkummaa hawaasaa karaa nyaataa guddisudha."] },
        ],
         newLangStatus : 0,
         interval: "",
        localLangStatus: null,


            //  langObj[0].words[0]
            //  langObj[1].words[0] 
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

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getStatus();
            }.bind(this), 50);
        }

        
    }

  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
  
  /* Body and Container Styles */
  body {
    background-color: #f7f7f7;
    font-family: 'Satisfy', cursive;
  }
  
  .about-section {
    width: 85%;
    padding: 2% 5%;
    margin: auto;
    height: auto;
  }
  
  /* Heading Styles */
  .heading {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .heading h3 {
    font-size: 32px;
    color: #333;
  }
  
  /* Content Styles */
  .about-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 50px;
  }
  
  .about-content img {
    width: 30%;
    border-radius: 10px;
  }
  
  .about-content-text {
    width: 60%;
  }
  
  .about-content-text h2 {
    font-size: 18px;
    line-height: 1.6;
    color: #666;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .about-content {
      flex-direction: column;
      text-align: center;
    }
  
    .about-content img {
      width: 80%;
      margin-bottom: 30px;
    }
  
    .about-content-text {
      width: 100%;
    }
  }
  </style>
  