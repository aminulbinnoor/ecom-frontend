<template>
    <div class="row">
      <div class="col-md-auto">
        <div class="nav flex-column nav-pills p-4 bg-white rounded">
          <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 1 ? 'active' : '']" @click="toggleTabIndex(1)">Product Details</button>
          <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 2 ? 'active' : '']" @click="toggleTabIndex(2)">Product Variations</button>
          <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 4 ? 'active' : '']" @click="toggleTabIndex(4)">Specification Dimensions</button>
          <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 3 ? 'active' : '']" @click="toggleTabIndex(3)">Specification Details</button>
        </div>
      </div>
       <div class="col-lg">
         <div class="tab-content">
           <div class="tab-pane d-block" v-if="currentTabIndex == 1">
             <div class="card" style="min-height:250px">
               <div class="card-header" style="background-color:rgba(0,0,0,.03)">
                 <div class="float-left">
                   <p>Product Update</p>
                 </div>
                 <!-- <div class="float-right p-0">
                   <router-link type="button" class="btn btn-info btn-sm" :to="`/product/${$route.params.id}/edit/variation`">Variations</router-link>
                   <router-link type="button" class="btn btn-info btn-sm" :to="`/product/${$route.params.id}/edit/specification-dimensions`">Specification Dimensions</router-link>
                   <router-link type="button" class="btn btn-primary btn-sm" :to="`/product/${$route.params.id}/edit/specification-details`">Specification Details</router-link>
                 </div> -->
               </div>
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
                           <label>Price <span class="text-danger">*</span> </label>
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
                           <input type="text" class="form-control" placeholder="Discount Amount" v-model="discount_amount">
                         </div>
                       </div>

                     <div class="form-row">
                       <div class="form-group col-md-4">
                         <label>Select Product Category</label> <span class="text-danger"> *</span>
                         <select class="form-control" v-model="product_category_id">
                           <option value="">Select Product Category</option>
                           <option v-for="product_category in product_categories"  :key="product_category.id" :value="product_category.id">{{product_category.name}}</option>
                         </select>
                       </div>

                       <div class="form-group col-md-4">
                         <label>Select Product Subcategory</label> <span class="text-danger"> *</span>
                         <select class="form-control" v-model="product_sub_category_id">
                           <option value="">Select Product Subcategory</option>
                           <option v-for="product_subcategory in product_subcategories"  :key="product_subcategory.id" :value="product_subcategory.id">{{product_subcategory.name}}</option>
                         </select>
                       </div>

                       <div class="form-group col-md-4">
                         <label>Select Status</label><span class="text-danger"> *</span>
                         <select class="form-control" @change="onChange($event)">
                           <option value="">Select Status</option>
                           <option v-for="tst in theStatuses"  :key="tst.key" :selected="tst.key === status" :value="tst.key">{{tst.value}}</option>
                         </select>
                       </div>

                       <div class="col-md-12 mt-2">
                           <div class="">
                               <label>Feature Image </label><span class="text-danger"> *</span>
                           </div>
                           <div class="image-size preview-image"  v-for="(pfimage,index) in product_feature_images">
                             <div class="delete-image remove-image" @click="deleteImage(index,'feature')">
                               X
                             </div>
                             <img  alt="">
                             <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pfimage.path+'hdpi/'+pfimage.file" alt="">
                           </div>

                           <ImageUpload :title="``" :perpose="'feature'"  :limit="2" @image="storeImage" ></ImageUpload>
                       </div>
                       <div class="col-md-12 mt-2">
                           <div class="">
                               <label>Product Images </label><span class="text-danger"> *</span>
                           </div>
                           <div class="image-size preview-image"  v-for="(pimage,index) in product_images">
                             <div class="delete-image remove-image" @click="deleteImage(index,'pimage')">
                               X
                             </div>
                             <img  alt="">
                             <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pimage.path+'hdpi/'+pimage.file" alt="">
                           </div>
                           <ImageUpload :title="``" :perpose="'product_image'"  :limit="2" @image="storeImage" ></ImageUpload>
                       </div>
                     </div>
               </div>
               <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
                   <button :disabled="name == '' ? true : false" type="button" class="btn btn-success float-right" v-if="!isSubmittingLoader" @click="submit()">Update</button>
                   <button class="btn btn-success float-right" type="button" v-else>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Updating...
                    </button>
               </div>
             </div>
           </div>

           <div class="tab-pane d-block" v-if="currentTabIndex == 2">
             <ProductVariations></ProductVariations>
           </div>

           <div class="tab-pane d-block" v-if="currentTabIndex == 4">
             <SpecificationDimensions></SpecificationDimensions>
           </div>

           <div class="tab-pane d-block" v-if="currentTabIndex == 3">
             <SpecificationDetails></SpecificationDetails>
           </div>

         </div>
       </div>
    </div>
</template>

<script>
import {http1} from '@/api/axios'
import ProductVariations from '@/components/products/ProductVariations'
import SpecificationDetails from '@/components/products/SpecificationDetails'
import SpecificationDimensions from '@/components/products/SpecificationDimensions'

export default {
  data () {
    return {
      breadcrumb: [
          {name: 'Home', link: '/'},
          {name: 'Product', link: '/product'},
          {name: 'Product Update', link: ''},
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
      product_images: [],
      product_feature_images: [],
      feature_image: [],
      images: [],
      deletedProductImages: [],
      deletedFeatureImages: [],
      currentTabIndex: 1,
    }
  },
  methods: {
    toggleTabIndex(index){
      this.currentTabIndex = index;
    },
    submit() {
      if (this.name == '') {
          this.$toast.error('Product name is required',{duration:3000})
          return
      }else if (this.short_description == '') {
          this.$toast.error('Short Description is required',{duration:3000})
          return
      }else if (this.price == '') {
          this.$toast.error('Price is required',{duration:3000})
          return
      }else if (this.instock == '') {
          this.$toast.error('Instock is required',{duration:3000})
          return
      }else if (this.order_limit == '') {
          this.$toast.error('Order Limit is required',{duration:3000})
          return
      }else if (this.product_category_id == '') {
          this.$toast.error('Product category is required',{duration:3000})
          return
      }else if (this.product_sub_category_id == '') {
          this.$toast.error('Product Subcategory is required',{duration:3000})
          return
      }else if (this.status == '') {
          this.$toast.error('Status is required',{duration:3000})
          return
      }else if (this.images.length + this.product_images.length < 1) {
          this.$toast.error('Product image is required',{duration:3000})
          return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('product_category_id', this.product_category_id)
      formData.append('product_sub_category_id', this.product_sub_category_id)
      formData.append('name', this.name)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('price', this.price)
      formData.append('instock', this.instock)
      formData.append('order_limit', this.order_limit)
      formData.append('discount_type', this.discount_type)
      formData.append('discount_amount', this.discount_amount)
      formData.append('status', this.status)
      formData.append('deleted_product_images', JSON.stringify(this.deletedProductImages))
      formData.append('deleted_product_fimages', JSON.stringify(this.deletedFeatureImages))
      formData.append('deleted_after_product_images', JSON.stringify(this.product_images))
      formData.append('deleted_after_product_fimages', JSON.stringify(this.product_feature_images))

      this.feature_image.forEach((item, i) => {
          formData.append(`feature_image[${i}]`, item)
      });

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });

      this.isSubmittingLoader = true

      http1.post('/product/update',formData,{
          headers: {
           'Content-Type': 'multipart/form-data'
        }
      }
        ).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/product')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
          this.isSubmittingLoader = false
        }
      }).catch((e) => {
        this.$toast.error(e.response.data.message.substring(0, 100) + "...",{duration: 3000})
        this.isSubmittingLoader = false
      })

  },
  deleteImage (index,type) {
      if (type == 'feature') {
          this.deletedFeatureImages.push(this.product_feature_images[index])
          this.product_feature_images.splice(index, 1)
      }else if (type == 'pimage') {
          this.deletedProductImages.push(this.product_images[index])
          this.product_images.splice(index, 1)
      }
  },
  storeImage(data) {
      if (data.perpose == 'feature') {
          this.feature_image = data.images
      }else{
          this.images = data.images
      }
  },

   onChange(event) {
       this.status = event.target.value
   },
   pickCategory(){
       this.compositions = []
       this.composition_id = ''
       this.rooms = []
       this.room_id = ''
       this.theme_id = ''
       http1.get(`/category/get/${this.category_id}/theme`,{

       }).then((response)=>{
         this.themes = response.data.data
       })
   },
   pickTheme(){
       this.rooms = []
       this.room_id = ''
       this.composition_id = ''
       http1.get(`/theme/get/${this.theme_id}/composition`,{

       }).then((response)=>{
         this.compositions = response.data.data
       })
   },
   pickComposition(){
       http1.get(`/composition/get/${this.composition_id}/room`,{

       }).then((response)=>{
         this.rooms = response.data.data
       })
   },

  },

  watch: {
    // product category
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
        this.$toast.error('Discount amount not more than 100',{duration:5000})
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

    http1.get('product/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      // this.category_id = response.data.data.category_id
      // this.theme_id = response.data.data.theme_id
      // this.composition_id = response.data.data.composition_id
      // this.room_id = response.data.data.room_id
      this.product_category_id = response.data.data.product_category_id
      this.product_sub_category_id = response.data.data.product_sub_category_id
      this.name = response.data.data.name
      this.short_description = response.data.data.short_description
      this.description = response.data.data.description
      this.price = response.data.data.price
      this.order_limit = response.data.data.order_limit
      this.instock = response.data.data.instock
      this.discount_type = response.data.data.discount_type
      this.discount_amount = response.data.data.discount_amount
      this.status = response.data.data.status
      this.product_feature_images = response.data.data.feature_image
      this.product_images = response.data.data.images

      // http1.get(`/category/get/${this.category_id}/theme`).then((response)=>{
      //     this.themes = response.data.data
      // })
      //
      // http1.get(`/theme/get/${this.theme_id}/composition`,{
      //
      //   }).then((response)=>{
      //     this.compositions = response.data.data
      //   })
      //
      // http1.get(`/composition/get/${this.composition_id}/room`,{
      //
      //      }).then((response)=>{
      //        this.rooms = response.data.data
      // })
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
.preview-image {
  margin-right: 20px;
  display: inline-block;
  margin-top: 16px;
  border: 1px dashed;
  position: relative;
  height: 100px;

   .remove-image {
    cursor: pointer;
    position: absolute;
    right: -8px;
    background: #00A4CF;
    height: 18px;
    width: 18px;
    font-size: 11px;
    text-align: center;
    border-radius: 50%;
    top: -10px;
    color: #fff;
    padding-top: 1px;
  }
}

// tab active background-color
  .nav-pills {
    .nav-link{
      &.active{
        background: #be926f;
        color: #fff;
      }

      &:focus{
        outline: 0;
        box-shadow: none;
      }
    }
  }
</style>
