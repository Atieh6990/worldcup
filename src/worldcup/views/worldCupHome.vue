<template>
  <div class="routParent">

    <videoPlayer></videoPlayer>
    <!--    <sideMenu ref="sideMenu"></sideMenu>-->

    <router-view :key="$route.fullPath" ref="routeview"></router-view>

  </div>
</template>

<script>

import sideMenu from '../components/sideMenu/SideMenu'
import videoPlayer from '../components/video/videoPlayer'
import func from '../mixins/mixin'
import {mapMutations, mapGetters} from 'vuex'
import {ROAST_CONFIG} from "@/worldcup/js/config";


export default {
  name: "worldCupHome",
  components: {sideMenu, videoPlayer},
  mixins: [func],
  computed: {
    computedSocket() {
      return this.getSocket();
    }
  },
  watch: {
    computedSocket: function (val, oldVal) {
      this.onSocket(this.getSocket())
    }
  },
  created() {

    this.setUserTv(this.UserTVInfo())
    this.setTvChannel(ROAST_CONFIG.TV_CHANNEL);


    this.$root.$on("registerData", (data) => {
      // console.log("in registerData !!!")
      this.$refs.routeview.manageRegisterData(data)
    });
  },
  methods: {
    ...mapMutations(['setUserTv', "setTvChannel","disconnectSocket"]),
    ...mapGetters(["getSocket"]),
    up() {
      this.$refs.routeview.up();
    },
    down() {
      this.$refs.routeview.down();
    },
    left() {
      this.$refs.routeview.left();
    },
    right() {
      this.$refs.routeview.right();
    },
    enter() {

      this.$refs.routeview.enter();
    },
    back() {
      this.$router.go(-1);
    },
    done() {
    },
    cancel() {
    },


    onSocket(socket) {
      socket.on("disconnect", (data) => {
        console.log('disconnect ->', data); // not authorized
      });
      socket.on("connect_error", (err) => {
        console.log('message ->', err.message, 'data ->', err.data); // not authorized
        this.disconnectSocket();
        this.$refs.routeview.reconnectSocket()
      });
      socket.on("get_name", (data) => {
        console.log('get_name', data);
        this.$refs.routeview.hasNameBefore(data)
      })
      socket.on("set_name", (data) => {
        console.log('set_name', data);
        this.$refs.routeview.manageSetName(data)
      })
      socket.on("join_in_room", (data) => {
        console.log('join_in_room', data);
        this.$refs.routeview.canJoinRoom(data)
      })
      socket.on("room_chats", (data) => {
        console.log('room_chats', data)
        this.$refs.routeview.chatList(data)
      })
      socket.on("send_chat", (data) => {
        console.log('send_chat', data)
        this.$refs.routeview.receivedMessage(data)
      });
      socket.on("user_detail", (data) => {
        console.log('user_detail', data)
        this.$refs.routeview.saveUserChatDetail(data)
      })
      socket.on("typing", (data) => {
        console.log('typing', data)
      })

    },


  }

}
</script>

<style scoped>

@import "../styles/styles.css";

.routParent {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 1080px;
  direction: rtl;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}

.simple-keyboard {
  max-width: 390px !important;
  position: absolute;
  left: 0px !important;
  direction: ltr !important;
}

</style>
