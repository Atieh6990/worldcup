<template>
  <div class="registerParent">
    <img class="icon" :src="require('../../assets/images/Pm/'+icons[type])">

    <div class="title">{{ title[type] }}</div>
    <input :class="[((yPos == 0 && activeRoute == 1) ? 'inpHover':''),'content']" :value="contentTxt"
           type="text"
           @input="onInputChange"
           :id="'content_'+type" v-on:click="removeHover()" ref="content">
    <div :class="[((yPos == 1 && activeRoute == 1) ? 'submitBtnHover':''),'submitBtn']"
         v-on:click="submitBtn()">
      {{ btnTxt[type] }}
      <img src="../../assets/images/Pm/send.png">
    </div>


    <div :class="[((yPos == 3 && activeRoute == 1) ? 'submitBtnHover':''),'submitBtn']" style="top:425px !important;"
         v-if="type == 0 || type == 1"
         v-on:click="clearBtn()">
      پاک کردن
    </div>

    <div class="des">{{ des[type] }}</div>


    <div class="keyboardParent" v-if="type == 2">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="contentTxt" ref="SimpleKeyboard"/>
    </div>
  </div>
</template>

<script>
import func from "../../mixins/mixin";
import SimpleKeyboard from "./SimpleKeyboard";

export default {
  name: "Registering",
  props: ["type", "activeRoute", "yPage", "numberShow"],
  mixins: [func],
  data() {
    return {
      icons: ["mobile.png", "verification-code.png", "profile.png"],
      title: ["شماره همراه خود را وارد کنید", "کد پیامک شده را وارد کنید", "نام کاربری خود را بنویسید"],
      btnTxt: ["ارسال", "ثبت", "ثبت نهایی"],
      des: ["", "بعد از ارسال شماره تلفن همراه کد فعال سازی 4 رقمی برای شما پیامک خواهد شد", ""],
      contentTxt: "",
      yPos: 0,//0->input 1->btn , 2->keyboard , 3->clear btn
    };
  },
  created() {
    this.yPos = 0;
    this.showIme("content_" + this.type);
  },
  watch: {
    type: function () {
      this.contentTxt = "";
      this.yPos = 0;
      this.hideIme("content_" + this.type);
    }, numberShow: function () {
      this.contentTxt = this.numberShow;
    }
  },
  components: {SimpleKeyboard},
  methods: {
    down() {
      if (this.yPos == 0) {
        this.hideIme("content_" + this.type);
        // this.$refs.content.blur()
        this.yPos = 1;
        return false
      }

      if (this.yPos == 1) {
        if (this.type == 0 || this.type == 1) {
          this.yPos = 3;
          return false
        }
        if (this.type == 2) {
          this.yPos = 2;
          this.$refs.SimpleKeyboard.toggleHover(1);
          return false
        }

      }

      if (this.yPos == 2) {
        this.$refs.SimpleKeyboard.down();
        return false
      }
    }, enter() {

      if (this.type == 2) {
        if (this.yPos == 2) {
          this.$refs.SimpleKeyboard.enter();
          return false
        }

      }

      if (this.yPos == 3) {//pak kardan
        this.contentTxt = '';
        return false
      }

      if (this.yPos == 0) {
        // this.$refs.content.focus();
        this.showIme("content_" + this.type);
        return true;
      } else {

        this.nextStep();
        return true;
      }
      return false;
    }, up() {

      if (this.yPos == 2) {
        if (!this.$refs.SimpleKeyboard.up()) {
          this.$refs.SimpleKeyboard.toggleHover(0);
          this.yPos = 1;
          // console.log("dkfjgkfjgk", this.yPos, this.activeRoute, this.yPage)
        }
        return false
      }
      if (this.yPos == 1) {
        this.yPos = 0;
        return false;
      }

      if (this.yPos == 3) {
        if (this.type == 0 || this.type == 1) {
          this.yPos = 1;
          return false
        }
      }

    },

    right() {
      if (this.yPos == 2) {
        if (!this.$refs.SimpleKeyboard.right()) {
          this.$refs.SimpleKeyboard.toggleHover(0)
          return false
        }
        return true
      }
    },
    left() {

      if (this.yPos == 2) {
        if (!this.$refs.SimpleKeyboard.left()) {
        }
      }
    },
    clearBtn() {
      this.contentTxt = '';
    },
    submitBtn() {
      this.hideIme("content_" + this.type);
      if (this.type == 2)
        this.$refs.SimpleKeyboard.toggleHover(0);
      this.yPos = 1;
      this.nextStep();
    },
    nextStep() {
      this.hideIme("content_" + this.type);
      this.$root.$emit("set_error_msg", "");
      this.yPos = 0;

      if (this.contentTxt != "") {
        let send = {type: this.type, content: this.contentTxt};
        setTimeout(() => {
          this.$root.$emit("registerData", send);
        }, 600)

      } else {
        this.$root.$emit("set_error_msg", "فیلد هارا پر کنید.");
      }
    },
    removeHover() {
      this.$root.$emit("set_error_msg", "");
      if (this.type == 2)
        this.$refs.SimpleKeyboard.toggleHover(0);
      this.yPos = 0;
    },
    keyboardAddHover() {
      this.$refs.SimpleKeyboard.toggleHover(1);
    },
    onChange(input) {
      this.contentTxt = input;
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.contentTxt = input.target.value;
    },
  }
};
</script>

<style scoped>
.registerParent {
  width: 390px;
  height: 760px;
  right: 0px;
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.icon {
  top: 65px;
  position: absolute;
  right: 130px;
}

.title {
  position: absolute;
  top: 140px;
  font-size: 20px;
  color: #ffffff;
  width: 100%;
  height: 60px;
  direction: rtl;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.content {
  width: 88%;
  height: 70px;
  border: 2px solid #3b3a3f;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 7px;
  padding-left: 7px;
  line-height: 60px;
  direction: rtl;
  font-size: 24px;
  background-color: transparent;
  color: #ffffff;
  position: absolute;
  top: 215px;
  left: 15px;
}

.submitBtn {
  width: 92%;
  height: 70px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 60px;
  direction: rtl;
  font-size: 24px;
  background-color: #039be6;
  color: #ffffff;
  position: absolute;
  top: 335px;
  border: 2px solid transparent;
  left: 15px;
  text-indent: 25px;
}

.des {
  width: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 60px;
  direction: rtl;
  font-size: 18px;
  color: #039be6;
  position: absolute;
  top: 517px;
  left: 10px;
}

.submitBtnHover {
  border: 2px solid #ffffff;
}

.inpHover {
  border: 2px solid #ffffff;
}

.keyboardParent {
  width: 95%;
  height: 225px;
  right: 0px;
  position: absolute;
  /* bottom: 0px; */
  border-top: 1px solid #3b3a3f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  top: 820px;
  direction: ltr;
}

</style>
