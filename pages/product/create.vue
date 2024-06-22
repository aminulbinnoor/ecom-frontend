<template>
  <div class="row">
  <div class="col-lg-12">
      <div class="card" style="min-height:250px">
        <div class="card-header" style="background-color:rgba(0,0,0,.03)">Product Entry</div>
        <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="name">Name</label><span class="text-danger"> *</span>
                <input type="text" class="form-control" id="name" placeholder="name" v-model="name">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="short_description">Short Description</label><span class="text-danger"> *</span>
                <textarea class="form-control" v-model="short_description" rows="3"></textarea>
              </div>

              <div class="form-group col-md-12">
                <label for="description">Description</label>
                <textarea class="form-control" v-model="description" rows="5"></textarea>
              </div>
            </div>
              <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="price">Price <span class="text-danger" >*</span> </label>
                    <input type="number" class="form-control" placeholder="price" v-model="price">
                  </div>

                  <div class="form-group col-md-4">
                    <label>Instock</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="Instock" v-model="instock">
                    <span class="text-danger pl-2">-1 for unlimited and 0 for out of stock</span>
                  </div>

                  <div class="form-group col-md-4">
                    <label>Order Limits</label><span class="text-danger"> *</span>
                    <input type="number" class="form-control" placeholder="order limit" v-model="order_limit">
                  </div>

              </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>Discount Type</label>
                    <select class="form-control" v-model="discount_type">
                      <option value="">Select Type</option>
                      <option value="per">Percentage (%)</option>
                      <option value="fix">Fixed</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label>Discount</label>
                    <input type="text" class="form-control" placeholder="Discount" v-model="discount_amount">
                  </div>
                </div>
              <div class="form-row">

                <!-- <div class="form-group col-md-3">
                  <label>Select Category</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="category_id">
                    <option value="">Select Category</option>
                    <option v-for="category in categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                  </select>
                </div>

                <div class="form-group col-md-3">
                  <label>Select Theme</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="theme_id">
                    <option value="">Select Theme</option>
                    <option v-for="theme in themes"  :key="theme.id" :value="theme.id">{{theme.name}}</option>
                  </select>
                </div>

                <div class="form-group col-md-3">
                  <label>Select Composition</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="composition_id">
                    <option value="">Select Composition</option>
                    <option v-for="composition in compositions"  :key="composition.id" :value="composition.id">{{composition.name}}</option>
                  </select>
                </div>

                <div class="form-group col-md-3">
                  <label>Select Room</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="room_id">
                    <option value="">Select Room</option>
                    <option v-for="room in rooms"  :key="room.id" :value="room.id">{{room.name}}</option>
                  </select>
                </div>-->


                <!-- product category  -->
                <div class="form-group col-md-4">
                  <label>Select Product Category</label> <span class="text-danger"> *</span>
                  <select class="form-control" v-model="product_category_id">
                    <option value="">Select Product Category</option>
                    <option v-for="product_category in product_categories"  :key="product_category.id" :value="product_category.id">{{product_category.name}}</option>
                  </select>
                </div>

                <!-- product sub category -->
                <div class="form-group col-md-4">
                  <label>Select Product Subcategory</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="product_sub_category_id">
                    <option value="">Select Product Subcategory</option>
                    <option v-for="product_subcategory in product_subcategories"  :key="product_subcategory.id" :value="product_subcategory.id">{{product_subcategory.name}}</option>
                  </select>
                </div>

                <div class="form-group col-md-4">
                  <label>Select Status</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="status">
                    <option value="">Select Status</option>
                    <option v-for="tst in theStatuses"  :key="tst.key" :value="tst.key">{{tst.value}}</option>
                  </select>
                </div>

                <div class="col-md-12 mt-2">
                    <label>Feature Image </label><span class="text-danger"> *</span>
                    <ImageUpload :title="``" :perpose="'feature'"  :limit="2" @image="storeImage" ></ImageUpload>
                </div>
                <div class="col-md-12 mt-2">
                    <label>Product Images </label><span class="text-danger"> *</span>
                    <ImageUpload :title="``" :perpose="'product_image'"  :limit="2" @image="storeImage"></ImageUpload>
                </div>
              </div>
        </div>
        <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
            <button type="button" class="btn btn-success float-right" @click="submit()" v-if="!isSubmittingLoader">Create</button>

            <button class="btn btn-success float-right" type="button" v-else>
               <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Inserting...
             </button>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import {http1} from '@/api/axios'
import ImageUpload from '@/components/ImageUpload'

export default {
  components:{ImageUpload},
  data () {
    return {
      breadcrumb: [
          {name: 'Home',link: '/'},
          {name: 'Product',link: '/product'},
          {name: 'Product Entry',link: ''},
      ],
      theStatuses: [],
      // categories: '',
      // category_id: '',
      // themes: '',
      // theme_id: '',
      // compositions: '',
      // composition_id: '',
      // rooms: '',
      // room_id: '',
      product_categories: '',
      product_category_id: '',
      product_subcategories: '',
      product_sub_category_id: '',
      name: '',
      price: '',
      short_description: '',
      description: '',
      instock: '',
      order_limit: '',
      discount_type: '',
      discount_amount: '',
      status: '',
      feature_image: [],
      images: [],
    }
  },
  methods: {
    submit() {

        if (this.name === '') {
            this.$toast.error('Product name is required',{duration:3000})
            return
        }
        else if (this.short_description === '') {
            this.$toast.error('Short Description is required',{duration:3000})
            return
        }
        else if (this.price === '') {
            this.$toast.error('Price is required',{duration:3000})
            return
        }
        else if (this.instock === '') {
            this.$toast.error('Instock is required',{duration:3000})
            return
        }
        else if (this.order_limit === '') {
            this.$toast.error('Order Limit is required',{duration:3000})
            return
        }
        else if (this.product_category_id === '') {
            this.$toast.error('Product category is required',{duration:3000})
            return
        }
        else if (this.product_sub_category_id === '') {
            this.$toast.error('Product Subcategory is required',{duration:3000})
            return
        }
        else if (this.status === '') {
            this.$toast.error('Status is required',{duration:3000})
            return
        }
        else if (this.feature_image === '') {
            this.$toast.error('Feature Image is required',{duration:3000})
            return
        }
        else if (this.images === '') {
            this.$toast.error('Images is required',{duration:3000})
            return
        }


      let formData = new FormData()
      // formData.append('category_id', this.category_id)
      // formData.append('theme_id', this.theme_id)
      // formData.append('composition_id', this.composition_id)
      // formData.append('room_id', this.room_id)
      formData.append('product_category_id', this.product_category_id)
      formData.append('product_sub_category_id', this.product_sub_category_id)
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('instock', this.instock)
      formData.append('order_limit', this.order_limit)
      formData.append('discount_type', this.discount_type)
      formData.append('discount_amount', this.discount_amount)
      formData.append('status', this.status)
      // formData.append('feature_image', JSON.stringify(this.feature_image))
      //formData.append('images', JSON.stringify(this.images))

      this.feature_image.forEach((item, i) => {
          formData.append(`feature_image[${i}]`, item)
      });

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });
      this.isSubmittingLoader =  true

      http1.post('/product/create',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/product')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
          this.isSubmittingLoader = false
        }
        console.log(response)
      }).catch((e) => {
        this.$toast.error(e.response.data.message.substring(0, 100) + "...",{duration: 3000})
        this.isSubmittingLoader = false
        console.log(e.response)
      })
   },
   storeImage(data) {
       if (data.perpose == 'feature') {
           this.feature_image = data.images
       }else{
           this.images = data.images
       }
   },
  cropImageActionProductImages(d){
     this.images.push(d.image)
   },
   cropImageActionFeatureImage(d){
     this.feature_image.push(d.image)
   },
  },

  watch: {
    // category wise themes
    // category_id: function (){
    //   http1.get(`/category/get/${this.category_id}/theme`,{
    //
    //   }).then((response)=>{
    //      this.themes = response.data.data
    //   })
    // },
    //
    // // theme wise compositions
    // theme_id: function (){
    //   http1.get(`/theme/get/${this.theme_id}/composition`,{
    //
    //   }).then((response)=>{
    //      this.compositions = response.data.data
    //   })
    // },
    //
    // // composition wise rooms
    // composition_id: function (){
    //   http1.get(`/composition/get/${this.composition_id}/room`,{
    //
    //   }).then((response)=>{
    //      this.rooms = response.data.data
    //   })
    // },

    product_category_id: function () {
      http1.get(`/product-category/get/${this.product_category_id}/product-subcategory`,{

      }).then((response)=>{
         this.product_subcategories = response.data.data
      })
    },

    discount_type: function(val){
      this.discount_type = val;
    },

    discount_amount: function(val){
      if(this.discount_type == "per" && this.discount_amount > 100){
        this.$toast.error('Discount amount not more than 100',{duration:3000})
        return this.discount_amount = '100';
      }else{
        this.discount_amount = val;
      }
    }

  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted: function () {
    http1.get('/product-category/get',{
      params: {
        show_all: true
      }
    }).then((response)=>{
       this.product_categories = response.data.data
    })

    http1.get('/category/get',{
      params: {
        show_all: true
      }
    }).then((response)=>{
       this.categories = response.data.data
    })

    http1.get('/get-data-config',{
      params: {
        type: 'product_status'
      }
    }).then((response)=>{
       this.theStatuses = response.data.data
    })

  }
}
</script>

<style lang="scss" scoped >

</style>
