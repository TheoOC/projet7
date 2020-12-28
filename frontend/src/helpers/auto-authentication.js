import axios from 'axios';
import store from '../store/index';

export default function setup() {

    const token = localStorage.getItem('user-token')

    //handle auto-authentification
    //if there is a token check if it is valid
    if (token) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
        //check if userid in token is valid if not delete state variables with AUTH_LOGOUT
        store.dispatch("AUTH_AUTO", token)
            .then(() => {
                console.log(`auto login successfull`);
            })
            .catch((error) => {
                console.log(`failed to auto log in: ${error} clearing localStorage:`);
                store.dispatch("AUTH_LOGOUT")
                    .then(() => { console.log(`successfully cleared localStorage`) });
            });
    }
}


