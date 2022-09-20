import {User} from '../store/store'
import  {ROAST_CONFIG} from "../js/config";
import {io} from '../js/socket'


export const MainSocket = {
    state: {
        socket: "",
    },
    getters: {
        getSocket(state:any) {
            return state.socket;
        },

    },

    mutations: {
        startSocket(state:any) {
            let userToken = User.state.userInfo.access_token;
            console.log("start socket ",userToken , User.getters.getTcChannel(User.state))
            state.socket = new io(ROAST_CONFIG.SOCKET_URL,{
                auth:{
                    token: "Bearer " + userToken,
                    room: User.getters.getTcChannel(User.state),
                }
            })

        },
        disconnectSocket(state:any) {

            if (state.socket != "") {
                state.socket.disconnect();
                state.socket = ""
                console.log("disconnectSocket", state.socket)
            }
        },


        emptySocketVar(state:any){
            state.socket = "";
        }
    },


    actions: {
        setUserName: (state:any, data:any) => {
            // console.log("******8setUserName*******")
            let sendData = {'data': data}
            state.state.socket.emit("set_name", sendData)
        },

        sendUserMessage: (state:any, data:any) => {
            let sendData = {'type': 'text', 'text': data}
            state.state.socket.emit("messages", sendData)
        },

        loginSocket: (state:any) => {
            // let socketConnect = state.state.socket.emit("check login", userId, private_key, hashKey, timeConnect);
        },
    }
}
