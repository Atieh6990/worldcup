<template>
  <div id="app">
    <router-view :key="$route.fullPath" ref="routeview"></router-view>
  </div>
</template>


<script>


export default {
  created() {
    window.addEventListener("keydown", this.keyEvent);
  },
  methods: {
    keyEvent(event) {
      const keyCode = event.keyCode;
      // console.log("keyCode = " + keyCode);
      switch (keyCode) {

        case 38://Up
        case 29460://Up
          this.$refs.routeview.up();

          break;
        case 39://Right
        case 5://Right

          this.$refs.routeview.right();

          break;
        case 37://Left
        case 4://Left

          this.$refs.routeview.left();
          break;
        case 40://Down
        case 29461://Down

          this.$refs.routeview.down();
          break;
        case 13://Enter
        case 29443://Enter
          this.$refs.routeview.enter();

          break;
        case 10009://Return
        case 187:

          this.$refs.routeview.back();


          break
          /* case 187://Return
             //alert(this.$refs.sideMenu.active + ' ** ' + this.$refs.sideMenu.show + ' ** ' + this.$refs.routeview.activeRoute)
             if (this.modalOn) {
               this.$refs.routeview.back();
             } else if (this.$refs.sideMenu.active && this.$refs.sideMenu.show) {
               // else
               if (this.$refs.routeview.activeRoute == 0) {
                 this.$refs.sideMenu.back();
                 this.$refs.routeview.activeRoute = 1;
               } else {
                 this.$refs.routeview.back();
                 // this.$refs.routeview.activeRoute = 0;
               }

             } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
               if (this.$refs.routeview.activeRoute == 0) {
                 this.$refs.sideLeft.back();
                 this.$refs.routeview.activeRoute = 1;
               } else {
                 this.$refs.routeview.back();
                 // this.$refs.routeview.activeRoute = 0;
               }
             } else if (this.$refs.popup.show) {
               this.$refs.popup.back();
             } else {
               this.$refs.routeview.back();
             }

             break;*/


        case 35:


          break;
        case 65376: //key done

          this.$refs.routeview.done();

          break;
        case 65385: //key cancel

          this.$refs.routeview.cancel();

          break;
        case 54:
          //   if (this.networkFlag == false && this.loadingFlag == false) {
          //    this.setParam('Islogout', '1');
          //   this.$router.push('/seven/'+new Date().getTime());
          //  }


          break;
        case 10182: // Exit

          tizen.application.getCurrentApplication().exit();

          break;
        case 427:
          // alert("app")
          this.$refs.routeview.channelUp();
          break;
        case 428:
          this.$refs.routeview.channelDown();
          break;
        case 48: //key 0
        case 49: //key 1
        case 50: //key 2
        case 51: //key 3
        case 52: //key 4
        case 53: //key 5
        case 54: //key 6
        case 55: //key 7
        case 56: //key 8
        case 57: //key 9
          this.$refs.routeview.showNumber(parseInt(keyCode) - 48)

          break;
        case 10190: //key PRE-CH

          this.$refs.routeview.showNumber(parseInt(keyCode) - 48);

          break;
          // case 8: //key Backspace
          //     this.$refs.routeview.showNumber(parseInt(keyCode) - 48);
          //     break;
      }

    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
