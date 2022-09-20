import axios from 'axios';
import {ROAST_CONFIG} from '../js/config';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default {
    code(phone) {
        let Url = ROAST_CONFIG.API_URL + '/code'
        let Orgdata = {'mobile': phone}
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },
    signup(key, code, mobile, mac, uid, version) {
        let Url = ROAST_CONFIG.API_URL + '/signup'
        let Orgdata = {'key': key, 'code': code, 'mobile': mobile, 'mac': mac, 'uid': uid, 'version': version}
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },

    getCurrency(url) {
        let Url = url
        return axios({
            method: "GET",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },

    getTime(url) {
        let Url = url
        return axios({
            method: "GET",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },

    getNews() {
        return axios({
            method: "GET",
            url: ROAST_CONFIG.NEWS_URL,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    },
    getNewsDetail(id){
        return axios({
            method: "GET",
            url: ROAST_CONFIG.NEWS_DETAIL + id,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {

        });
    }

}