import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";
axios.defaults.baseURL="https://vue3-course-api.hexschool.io/";
import { apiPath } from './config.js';
let myProductModal;
let myDelProductModal;

const app={
    data(){
        return {
            productList:[],
            tempProduct:{}
        }
    },
    methods: {
        getData(){
            axios.get(`/v2/api/${apiPath}/admin/products/all`)
            .then(res=>{
                this.productList=res.data.products;
            })
            .catch(err=>{
                alert(err.data.message);
            })
        },
        callProductModal(item){
            if(item.id){
                this.tempProduct=item;
                this.tempProduct.isNew=false;
            }else{
                this.tempProduct={};
                this.tempProduct.isNew=true;
            }
            myProductModal.show();
        },
        updateProduct(){
            if(this.tempProduct.isNew){
                console.log('new');
                
            }else{
                console.log('update');
            }
        },
        callDelModal(item){
            this.tempProduct=item;
            myDelProductModal.show();
        },
        delProduct(){
            axios.delete(`/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`)
            .then(()=>{
                alert('刪除成功');
                this.getData();
                myDelProductModal.hide();
            })
            .catch(err=>{
                alert(err.data.message);
            })
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(token){
            console.log(token);
            axios.defaults.headers.common['Authorization']=token;
            axios.post('/v2/api/user/check')
            .then(()=>{
                this.getData();
            })
            .catch(err=>{
                alert(err.data.message);
                window.location.href='./index.html';
            })
            const productModal = document.getElementById('productModal');
            const delModal = document.getElementById('delProductModal');
            myProductModal = new bootstrap.Modal(productModal);
            myDelProductModal = new bootstrap.Modal(delModal);
        }else{
            alert('請重新登入');
            window.location.href='./index.html';
        }
    },
}

createApp(app).mount('#app');