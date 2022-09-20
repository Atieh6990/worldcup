<template>
  <div class="boxshadow">
    <div v-for="(index , item ) in sideItemImg.length"
         v-on:click="clickItem(item)"
         :class="[((ypage==item && active == 1) ? 'sideItemsHover':''),((item==selectedItem)?('active'):('deactive')),'sidesItems']">
      <img
          :src="selectedItem==item ? (require('../../assets/images/sideMenu/'+sideItemHoverImg[item])):(require('../../assets/images/sideMenu/'+sideItemImg[item]))">
      <!--            <img src="../../assets/images/sideMenu/bourse.png">-->
    </div>
  </div>
</template>

<script>

export default {
  name: 'sideMenue',
  data() {
    return {
      active: 0, ypage: 0,
      selectedItem: 0,
      sideItemImg: ['clock.png', 'CHAT.png', 'dollar.png', 'bourse.png', 'news.png', 'news.png'],
      sideItemHoverImg: ['clock_hover.png', 'CHAT_HOVER.png', 'dollar_hover.png', 'bourse_hover.png', 'news_hover.png', 'news_hover.png']

      // sideItemImg: ['clock.png', 'CHAT.png', 'dollar.png', 'bourse.png', 'snapfood.png', 'news.png'],
      // sideItemHoverImg: ['clock_hover.png', 'CHAT_HOVER.png', 'dollar_hover.png', 'bourse_hover.png', 'snapfood_hover.png', 'news_hover.png']
    }
  },
  components: {},
  created() {
    this.$root.$on("active_slide", () => {
      this.active = 1
    });
    this.$root.$on("deactive_slide", () => {
      this.active = 0;
    });
  },
  mounted() {
    this.$root.$emit('active_slide')
  },
  methods: {
    changeactive(state) {
      this.active = state
    },
    enter() {
      this.$root.$emit("showRout", true);
      this.selectedItem = this.ypage;
      this.active = 0;
      let time = new Date().getTime();
      switch (this.ypage) {
        case 0://recent
          this.$router.push({
            path: 'time',
          })
          break;
        case 1://chat
          this.$router.push({
            path: 'chat/454',
            // params: { pathMatch: "545" },
          })
          break;
        case 2://currency
          this.$router.push({
            path: '/home/' + time,
          })
          break;
        case 3://exchange
          this.$router.push({
            path: '/exchange/' + time,
          })
          break;
        case 4://news
          this.$router.push({
            path: '/news/' + time,
          })
          break;
        case 5://chance
          this.$router.push({
            path: '/chance/' + time,
          })
          break;
          // case 4://snappfood
          //     this.$router.push({
          //         path: '/food/' + time,
          //     })
          //     break;
          // case 5://news
          //     this.$router.push({
          //         path: '/news/' + time,
          //     })
          //     break;

      }
    },
    up() {
      if (this.ypage > 0) {
        this.ypage--
      }
    }, right() {

    }, left() {
      this.active = 0;
    }, down() {
      if (this.ypage < this.sideItemImg.length - 1) {
        this.ypage++
      }
    },
    clickItem(index) {
      this.ypage = index;
      this.enter()
    }
  },
}
</script>
<style scoped>
.boxshadow {
  display: flex;
  flex-direction: column;
  background: #eceff1;
  width: 110px;
  align-items: center;
  padding-bottom: 10px;
  -webkit-box-shadow: -12px 2px 15px -7px rgba(0, 0, 0, 0.71);
  box-shadow: -12px 2px 15px -7px rgba(0, 0, 0, 0.71);
  z-index: 10;
  height: 1080px;
}

.sidesItems {
  width: 100%;
  /*width: 95%;*/
  height: 86px;
  justify-content: center;
  display: flex;
  direction: rtl;
  align-items: center;
  border: 3px solid transparent;
}

.sideItemsHover {
  border: 3px solid #242328 !important;
}

.deactive {
  background-color: transparent;
}

.active {
  background-color: #049be2;
}
</style>

