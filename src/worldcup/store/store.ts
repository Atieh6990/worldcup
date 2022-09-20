export const User = {
    state: {
        userTv: {
            android_id: '', mac: "", android_version: "", model: "", ver: "",
        },
        userInfo: {
            expires_in: "",
            // access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjOWQxYzNlZGFiY2U1ZjE5YWY4MTdkNjlhZTYzYzNlOWY2ZjQ2MzlmMzQ3MTY3NTYyYjFjODA3YmJmZWUzNjZkZjQ5Njc3ZTY2ZGY4NzNiIn0.eyJhdWQiOiIzIiwianRpIjoiZWM5ZDFjM2VkYWJjZTVmMTlhZjgxN2Q2OWFlNjNjM2U5ZjZmNDYzOWYzNDcxNjc1NjJiMWM4MDdiYmZlZTM2NmRmNDk2NzdlNjZkZjg3M2IiLCJpYXQiOjE2MTU3MTM0MzksIm5iZiI6MTYxNTcxMzQzOSwiZXhwIjoxNjQ3MjQ5NDM5LCJzdWIiOiI2MzY0Iiwic2NvcGVzIjpbXX0.DE9cJgY2HxmT1ymkYBrVbT2QqX7ziZS8wkr2G-SG1HtXdV0TqX08D9XrlRCAEXgj9vlUhrsXzFi3_KeEtLZpd2BsDxF1l_VnvzM-OHX2atjki4MKuEK1Gwjq_8GW2W48iwQhimppg-GZlec-tIUa4SQRYOprbysMgj3EcEhZpYfDXVqSbr3MnOF10wAPvOrAPUAls0ydyhP48R4hfWl8zhqutnNWxfWx4AP9WC2utOee-8vgmTSiUFGDJZO-D0eZMC41yq81IgGNK2X1wk-owneTQs5Xj_8XI-mgRkvYHWtv2ulnro3X213yIP0vPG9P5iFi11NlOB_G_YQgeryJYFXurlIAvPg3HYDxiVlijsIJTWkTqEzZpgutMEQegggCaa4V_-aypJ8A4f8Q3wTGnhNpsymfz0cduQ3McBUD5q2Ow1AMImSJ-KXMAKLXI2gRG6tLb__wJ-Jf5dzT5UbAdUjKYhQ3NSCF_L1u5VRlr4VbHR_ugPFkuzfVdjgft1WTxwux_a5B9C-HNvFnCa_D48Xv3C3-lSlnezL6KBJeEz195LsjhqWCQBpcacThRU35YQLaMSQzYUfDzA17qghygfk7Cu2VsxDWZl4CHsAAWnhFky8JT8zZZYWReHQdz8TFuvQ4TiZOG1QDE40nNVMLiMLvs3lblmwyANm5mshQCgk",
            access_token: "",
            refresh_token: "",
            userName: "", userId: "",
        },
        tvChannel: "",
        timeInfo:
            {
                timeData1: "", timeData2: ""
            }
    },
    mutations: {

        setUserTv(state?: any, param?: any) {
            state.userTv = {
                mac: param.mac,
                ver: param.ver,
                model: param.model,
                android_id: param.android_id,
            };
        },

        setUserInfo(state?: any, param?: any) {
            state.userInfo = {
                expires_in: param.expires_in,
                access_token: param.access_token,
                refresh_token: param.refresh_token
            }
        }
        ,
        setUserNameID(state?: any, data?: any) {
            state.userInfo[data["item"]] = data["amount"];
        }
        ,
        setTimeInfo(state?: any, data?: any) {
            state.timeInfo[data["item"]] = data["amount"];
        }
        ,
        setTvChannel(state?: any, index?: any) {
            state.tvChannel = index;
        }
    }
    ,
    getters: {
        getUserTv(state: any) {
            return state.userTv;
        }
        ,
        getUserInfo(state: any) {
            return state.userInfo;
        }
        ,
        getTimeInfo(state: any) {
            return state.timeInfo;
        }
        ,
        getTcChannel(state: any) {
            return state.tvChannel;
        }
    }
    ,
    modules: {}
}
