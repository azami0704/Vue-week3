import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

axios.defaults.baseURL='https://vue3-course-api.hexschool.io';

const app={
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            axios.post('/v2/admin/signin',this.user)
            .then(res=>{
                document.cookie=`token=${res.data.token};expires=${res.data.expired};`;
                window.location.href='./admin.html';
            })
            .catch(err=>{
                alert(err.data.message);
            })
        }
    },
}

createApp(app).mount('#app');


