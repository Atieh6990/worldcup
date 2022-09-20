<template>
  <div class="parent">
    <div v-if="!userLoggedIn">
      <registering :type="registrationType" ref="registering" :activeRoute="activeRoute"
                   :yPage="yPage" :numberShow="numberShow"></registering>
    </div>

    <div v-if="userLoggedIn && messageList.length>0" class="">
      <div class="roomTitle"> {{ roomName }}</div>
      <chats ref="chats" :messageList="messageList" :userId="getUserInfo().userId"></chats>
    </div>


    <div class="errorMdg">{{ errorMessage }}</div>
    <div class="fixedBottom" v-if="userLoggedIn">
      <div :class="[((yPage == 1 && activeRoute==1 && xPage == 0 && userLoggedIn) ?'inpParentHover':''),'inpParent']">
                    <textarea style="display: none" :value="chatTxt" placeholder="اینجا بنویسید" class="chatInp input"
                              id="chatArea"
                              name="chatTxt" type="text" @input="onInputChange"
                              ref="contentTextArea"
                              autofocus
                              v-on:click="removeHover()"></textarea>
        <div class="chatInp input" style="overflow: auto" id="chatTxtDiv">{{ chatTxt }}</div>
      </div>
      <div :class="[((yPage == 1 && activeRoute==1 && xPage == 1 && userLoggedIn) ?'inpParentHover':''),'submitBtn']"
           v-on:click="sendMessage()"><img src="../assets/images/Pm/send.png"></div>
    </div>

    <div class="keyboardParent" v-if="userLoggedIn">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="chatTxt" ref="SimpleKeyboard"/>
    </div>


  </div>
</template>
<script>
import registering from '../components/pm/Registering'
import chats from '../components/pm/chats'
import func from '../mixins/mixin'
import {ROAST_CONFIG} from '../js/config'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import api from '../api/api'
import SimpleKeyboard from "../components/pm/SimpleKeyboard";

export default {
  name: 'pm',
  mixins: [func],
  deactivated() {
    // console.log("disconnectSocket")
    this.disconnectSocket();
  },
  data() {
    return {
      activeRoute: 1,
      chatTxt: "",
      paramKey: ROAST_CONFIG.PARAM_KEY,
      userKey: "",
      userLoggedIn: false,
      registrationType: 0,//0->phone , 1->verifycode , 2->username
      hasItemToMove: true,
      yPage: 0,//0->chatList , 1->input&submit , 2->keyboard
      xPage: 1,
      phoneNumber: "",
      verifyCode: "",
      errorMessage: "",
      userHasNameBefore: "",//agar to sambazar name set nashode bashe
      messageList: "",
      newMessage: "",
      numberShow: "", input: "",
      tokenData: "", roomName: '',

    };
  },

  components: {registering, chats ,SimpleKeyboard},
  // components: {registering, chats, SimpleKeyboard},
  destroyed() {
    // this.disconnectSocket();
  },

  mounted() {

    setTimeout(() => {
      this.$nextTick(() => {
      })
    }, 2000)
  },
  watch: {

    chatTxt: function () {
      // console.log("chatTxt changed")
      let element = document.getElementById("chatTxtDiv");
      element.scrollTop = element.scrollHeight;
      // this.$refs.contentTextArea.focus()
      // let inp = document.getElementById('chatTxt');
      // inp.focus().val('stuff').setCaretPosition(0,0);
      // this.setCaretPosition(inp, inp.value.length - 1);
    },
    userHasNameBefore: function () {
      // console.log('lksfdkj')
      this.userHasNameBefore = false;
      this.userLoggedIn = false
      this.registrationType = 2;
    },
    activeRoute: function () {

      if (this.activeRoute == 1) {
        if ((this.userLoggedIn && this.yPage == 2)) {
          this.$refs.SimpleKeyboard.toggleHover(1);
        }

        if ((!this.userLoggedIn && this.registrationType == 2 && this.$refs.registering.yPos == 2)) {
          this.$refs.registering.keyboardAddHover();
        }
      }

    }
  },
  created() {

    // console.log("created")

    // this.roomName = "اتاق گفتگوی " + this.getTcChannel();
    this.roomName = "اتاق گفتگوی جام جهانی";
    // // this.setToken("");
    // if (ROAST_CONFIG.LOCAL_TEST == true) {
    //     this.setUserNameID({item: "access_token", amount: ROAST_CONFIG.TEST_TOKEN})
    //     this.startSocket();//for test
    // } else {
    //     // this.$root.$emit("show_loading")
    //     this.getTokenData();
    // }


    this.$root.$on('loginUserData', () => {
      // alert('loginUserData'+data.data)
      if (data.data == null || data.data == 'null' || data.data == '') {
        // alert("00")
        this.registrationType = 0;
        this.userLoggedIn = false;
      } else {
        // alert("111")
        this.checkToken(data.data);
      }
    });

    this.$root.$on("remove_Hover", (index) => {
      this.yPage = index;
    });

    this.$root.$on("set_error_msg", data => {
      this.errorMessage = data
    })

  },
  methods: {
    ...mapGetters(["getUserTv", "getUserInfo", "getSocket", "getTcChannel"]),
    ...mapMutations(["setUserInfo", "startSocket", "setUserNameID", "disconnectSocket"]),
    ...mapActions(["setUserName", "sendUserMessage"]),
    setCaretPosition(start, end) {

      if (!end) end = start;
      return this.each(function () {
        if (this.setSelectionRange) {
          this.focus();
          this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
          var range = this.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', start);
          range.select();
        }
      });

    },
    setInpFocus() {
      setTimeout(() => {
        // console.log("setInpFocus !!!")
        document.getElementById('chatArea').focus();
        // document.body.focus();
        // console.log("contentTextArea!!!!gldkfgkdfng")
        // this.$refs.contentTextArea.focus();
        // this.$refs.contentTextArea.click();
      }, 2000)

    },
    reconnectSocket() {
      // console.log("11")
      this.registrationType = 0;
      this.userLoggedIn = false;
    },
    enter() {
      if (this.userLoggedIn) {

        if (this.yPage == 2) {
          this.$refs.SimpleKeyboard.enter();
          return false;
        }

        if (this.yPage == 1) {
          if (this.xPage == 0) {
            // console.log('enter');
            this.$refs.contentTextArea.focus();
            this.showIme('chatTxt');
          } else {
            this.sendMessage()
          }
        }

      } else {
        this.$refs.registering.enter()
      }
    },
    up() {
      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          // console.log(this.$refs.SimpleKeyboard.up())
          if (!this.$refs.SimpleKeyboard.up()) {
            this.$refs.SimpleKeyboard.toggleHover(0)
            this.yPage = 1;
          }
          return false
        }
        if (this.yPage == 1) {
          this.yPage--;
          return false
        }
        if (this.yPage == 0) {
          if (!this.$refs.chats.up()) {
          }
        }

      } else {
        this.$refs.registering.up()
      }
    },
    right() {
      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          if (!this.$refs.SimpleKeyboard.right()) {
            this.$refs.SimpleKeyboard.toggleHover(0)
            this.activeRoute = 0
            this.$root.$emit('active_slide');
          }
          return false
        }

        if (this.yPage == 1) {
          if (this.xPage == 1) {
            // this.xPage = 0;
            // return false
            this.activeRoute = 0
            this.$root.$emit('active_slide');
          }
          if (this.yPage == 1) {
            this.activeRoute = 0
            this.$root.$emit('active_slide');
          }
        }
        if (this.yPage == 0) {
          this.activeRoute = 0
          this.$root.$emit('active_slide');
          return false
        }
      }

      if (!this.userLoggedIn) {
        if (this.registrationType == 2) {
          if (!this.$refs.registering.right()) {
            this.$root.$emit('active_slide');
            this.activeRoute = 0
            return false
          }
          return false
        }
        this.$root.$emit('active_slide');
        this.activeRoute = 0

      }
    },
    left() {

      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          this.$refs.SimpleKeyboard.left();
          return false
        }
        if (this.yPage == 1 && this.xPage == 0) {

          // this.activeRoute = 0
          // this.$root.$emit('active_slide');
          // this.xPage = 1;
          // this.hideIme('chatTxt');
        }
      }

      if (!this.userLoggedIn) {
        this.$refs.registering.left()
      }

    },
    down() {
      // console.log(this.userLoggedIn , this.yPage )
      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          this.$refs.SimpleKeyboard.down();
          return false
        }

        if (this.yPage == 1) {
          this.$refs.SimpleKeyboard.toggleHover(1)
          this.yPage = 2;
          return false
        }
        if (this.yPage == 0) {
          if (!this.$refs.chats.down()) {
            this.yPage = 1
          }
        }

      } else {
        this.$refs.registering.down();
      }
    },
    showNum(num) {
      if (this.userLoggedIn == false) {
        this.numberShow += num;
      } else {
        this.chatTxt += num;
      }

    },
    manageRegisterData(data) {
      this.errorMessage = "";
      this.numberShow = "";
      if (data.type == 0) {//enter phone & get verify code
        this.phoneNumber = data.content;
        this.getCode();
        return false
      }

      if (data.type == 1) {//enter verify code ang get token
        this.verifyCode = data.content;
        this.doSignUp();
        return false
      }

      if (data.type == 2) {//enter name
        // console.log(data)
        this.setUserName(data.content);
      }
    },
    getCode() {
      api.code(this.phoneNumber).then((data) => {
        if (data.success) {
          this.userKey = data.data.key;
          this.registrationType = 1
        } else {
          if (typeof data.data.message == "string") {
            this.errorMessage = data.data.message
          } else {
            for (let key in data.data.message) {
              if (data.data.message.hasOwnProperty(key)) {
                this.errorMessage = data.data.message[key][0];
                break;
              }
            }
          }
        }
      })
    },
    doSignUp() {
      api.signup(this.userKey, this.verifyCode, this.phoneNumber, this.getUserTv().mac, this.getUserTv().android_id, this.getUserTv().ver).then(data => {
        if (data.success == false) {
          this.errorMessage = data.data.message;
          return false
        }
        let param = {
          expires_in: (data.expires_in * 1000) + (new Date).getTime(),
          access_token: data.access_token,
          refresh_token: data.refresh_token
        }
        this.setToken(JSON.stringify(param));
        this.setUserInfo(param);
        this.startSocket();
      })
    },
    checkToken(key) {
      let keyJson = JSON.parse(key);
      // alert(keyJson.access_token)

      let param = {
        expires_in: (keyJson.expires_in * 1000) + (new Date).getTime(),
        access_token: keyJson.access_token,
        refresh_token: keyJson.refresh_token
      }

      this.setUserInfo(param);
      // this.$root.$emit("hide_loading")
      if ((new Date).getTime() >= keyJson.expires_in) {
        // console.log("22")
        this.registrationType = 0;
        this.userLoggedIn = false;

      } else {
        // console.log("klklklklklklklklkl")
        this.startSocket();
      }
    },
    removeHover() {
      if (this.userLoggedIn) {
        this.yPage = 1;
        this.xPage = 0;
        this.$refs.SimpleKeyboard.toggleHover(0)
      }
    },
    sendMessage() {
      if (this.chatTxt == "")
        return false

      this.yPage = 1;
      this.xPage = 1;
      this.$refs.SimpleKeyboard.toggleHover(0)
      this.sendUserMessage(this.chatTxt);
      let d = new Date();
      let showDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + '  ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      let newMessage = {
        created_at: showDate,
        text: this.chatTxt,
        user: {name: this.getUserInfo().userName},
        user_id: this.getUserInfo().userId
      }
      this.chatTxt = "";
      this.$refs.SimpleKeyboard.clearTxtInp();
      this.$refs.chats.showNewMessage(newMessage)
    },
    hasNameBefore(type) {
      // console.log(type)
      if (typeof type == "undefined") {
        this.registrationType = 2;
        this.userLoggedIn = false;
      }
      // this.userHasNameBefore = type;
    },
    manageSetName(data) {
      if (data.success == false) {
        this.errorMessage = data.message;
        this.registrationType = 2;
        this.userLoggedIn = false;
        return false;
      } else {
        this.userLoggedIn = true
      }
    },
    canJoinRoom(data) {
      this.userLoggedIn = data.success;
      (this.userLoggedIn) ? (setTimeout(() => {
        this.setInpFocus()
      }, 2000)) : (this.errorMessage = "در حال حاضر اتاق فعالی وجود ندارد")
    },
    chatList(data) {
      this.messageList = this.reversArray(data);
    },
    receivedMessage(data) {
      this.$refs.chats.showNewMessage(data)
    },
    saveUserChatDetail(data) {
      this.setUserNameID({item: "userName", amount: data.data.name});
      this.setUserNameID({item: "userId", amount: data.data.user_id});
    },
    back() {
      this.exitAndroidApp();
    },
    onChange(input) {
      this.chatTxt = input;
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.chatTxt = input.target.value;
    },
    done() {
    },
    cancel() {
    },
    getTokenData() {
      setTimeout(() => {

        this.tokenData = window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'getToken',
          data: ''
        }))


        // this.tokenData = window.AndroidFunction.getSharedPreferences('token');
        // window.AndroidFunction.showToast('getTokenData'+this.tokenData)

      }, 1000);
    },


    manageTokenGet(data) {
      this.tokenData = data
      // alert('manageTokenGet '+this.tokenData)
      if (this.tokenData == null || this.tokenData == 'null' || this.tokenData == '' || typeof this.tokenData == "undefined") {
        // console.log("33")
        this.registrationType = 0;
        this.userLoggedIn = false;
      } else {
        this.checkToken(this.tokenData);
      }
    }
  }
}
</script>

<style scoped>
.parent {
  width: 390px;
  height: 100%;
  background-color: #242328;
  /*right: 110px;*/
  /*position: a  bsolute;*/
  overflow: hidden;
}


.fixedBottom {
  /*width: 95%;*/
  width: 395px;
  height: 110px;
  right: 0px;
  position: absolute;
  bottom: 350px;
  /*border-top: 1px solid #3b3a3f;*/
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.keyboardParent {
  /*width: 95%;*/
  width: 395px;
  height: 225px;
  right: 0px;
  position: absolute;
  bottom: 120px;
  border-top: 1px solid #3b3a3f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  direction: ltr;
}

.inpParent {
  width: 70%;
  height: 70px;
  border: 2px solid #3b3a3f;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.inpParentHover {
  border: 2px solid #ffffff;
}

.chatInp {
  line-height: 60px;
  width: 100%;
  height: 60px;
  border: 0px;
  /*direction: rtl;*/
  font-size: 24px;
  background-color: transparent;
  color: #ffffff;
  text-indent: 5px;
  /*overflow: auto;*/
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.chatInp::-webkit-scrollbar {
  display: none;
}

.submitBtn {
  margin-left: 7px;
  float: left;
  width: 30%;
  height: 70px;
  margin-top: 1px;
  background-color: #039be6;
  border-radius: 15px;
  justify-content: center;
  display: flex;
  align-items: center;
}

#chatTxt:focus {
  border-color: transparent !important;
}

.errorMdg {
  width: 390px;
  height: 60px;
  right: 0px;
  position: absolute;
  top: 630px;
  /*border-top: 1px solid #3b3a3f;*/
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: red;
}

.roomTitle {
  /*width: 95%;*/
  width: 390px;
  height: 80px;
  right: 0px;
  position: absolute;
  top: 0px;
  border-bottom: 1px solid #3b3a3f;
  display: flex;
  align-items: center;
  justify-content: center;
  direction: rtl;
  /*padding: 10px;*/
  font-size: 20px;
  color: #ffffff;
}

a {
  display: none !important;
}

</style>
