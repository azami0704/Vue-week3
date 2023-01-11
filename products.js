import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";
axios.defaults.baseURL = "https://vue3-course-api.hexschool.io/";
import { apiPath } from './config.js';
let myProductModal;
let myDelProductModal;

const app = {
    data() {
        return {
            productList: [],
            isNew: '',
            tempProduct: {
                imagesUrl:[]
            }
        }
    },
    methods: {
        getData() {
            axios.get(`/v2/api/${apiPath}/admin/products/all`)
                .then(res => {
                    this.productList = res.data.products;
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        callProductModal(item) {
            if (item.id) {
                this.tempProduct = item;
                //由於刪除及編輯使用同一個modal,設定isNew判斷新增還是刪除
                this.isNew = false;
            } else {
                this.tempProduct = {imagesUrl:[]};
                this.isNew = true;
            }
            myProductModal.show();
        },
        updateProduct() {
            let method='put';
            let url=`/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`;

            if (this.isNew) {
                method='post';
                url=`/v2/api/${apiPath}/admin/product`;
            }
            let data={data:this.tempProduct};
            axios[method](url,data)
            .then(res=>{
                alert(res.data.message);
                this.getData();
                myProductModal.hide();
            })
            .catch(err=>{
                alert(err.data.message);
            })
        },
        callDelModal(item) {
            this.tempProduct = item;
            myDelProductModal.show();
        },
        delProduct() {
            axios.delete(`/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`)
                .then(() => {
                    alert('刪除成功');
                    this.getData();
                    myDelProductModal.hide();
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        createImage(){
            //如果tempProduct裡沒有imagesUrl
            //宣告imagesUrl是一個陣列並放一個空字串
            if(!this.tempProduct.imagesUrl){
                this.tempProduct.imagesUrl=[''];
            }else{
                //如果陣列內已經有元素了就push新的
                this.tempProduct.imagesUrl.push('');
            }
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (token) {
            //記得刪掉
            axios.defaults.headers.common['Authorization'] = token;
            axios.post('/v2/api/user/check')
                .then(() => {
                    this.getData();
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location.href = './index.html';
                })
            const productModal = document.getElementById('productModal');
            const delModal = document.getElementById('delProductModal');
            myProductModal = new bootstrap.Modal(productModal);
            myDelProductModal = new bootstrap.Modal(delModal);
        } else {
            alert('請重新登入');
            window.location.href = './index.html';
        }
    },
}

createApp(app).mount('#app');