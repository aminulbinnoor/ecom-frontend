<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Product Category</div>
            <div class="card-body">
              <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Product Category Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-12">
                    <label>Details</label><span class="text-danger"> *</span>
                    <textarea class="form-control" v-model="details" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-12">
                    <label>Status</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="status">
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>


                  <div class="col-md-12 mt-2">
                      <div class="">
                          <label>Images </label><span class="text-danger"> *</span>
                      </div>
                      <div class="image-size preview-image"  v-for="(pfimage,index) in images">

                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pfimage.path+'hdpi/'+pfimage.file" alt="">
                      </div>

                      <ImageUpload :title="``" :perpose="'image'"  :limit="2" @image="storeImage" ></ImageUpload>
                  </div>
                  <div class="col-md-12 mt-2">
                      <div class="">
                          <label>Banner Images </label><span class="text-danger"> *</span>
                      </div>
                      <div class="image-size preview-image"  v-for="(pimage,index) in banner_image">
                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pimage.path+'hdpi/'+pimage.file" alt="">
                      </div>
                      <ImageUpload :title="``" :perpose="'banner_image'"  :limit="2" @image="storeImage" ></ImageUpload>
                  </div>


              </div>
            </div>
            <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
                <button type="button" class="btn btn-success float-right" @click="submit()">Update</button>
            </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import {http1} from '@/api/axios'

export default {
  data () {
    return {
      breadcrumb: [
          {name: 'Home', link: '/'},
          {name: 'Product Category', link: '/product-category'},
          {name: 'Product Category Update', link: ''},
      ],
      name: '',
      details: '',
      status: '',
      room_images: [],
      images: [],
      banner_image: []
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Product category name is required',{duration:3000})
        return
      }else if(this.details == ''){
        this.$toast.error('Product Details is required',{duration:3000})
        return
      }else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('name', this.name)
      formData.append('details', this.details)
      formData.append('status', this.status)

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });
      this.banner_image.forEach((item, i) => {
          formData.append(`banner_image[${i}]`, item)
      });

      http1.post('/product-category/update',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/product-category')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    },
    storeImage(data) {
        if (data.perpose == 'image') {
            this.images = data.images
        }else{
          this.banner_image = data.images
        }
    },
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted(){
    http1.get('product-category/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.name = response.data.data.name
      this.details = response.data.data.details
      this.status = response.data.data.is_active
      this.images = response.data.data.images
      this.banner_image = response.data.data.banner_image
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

</style>
