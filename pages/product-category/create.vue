<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Product Category Entry</div>
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
                        <p>Category Images</p>
                        <ImageUpload :title="``" :perpose="'image'"  :limit="1" @image="storeImage"></ImageUpload>
                    </div>

                    <div class="col-md-12 mt-2">
                        <p>Banner Images</p>
                        <ImageUpload :title="``" :perpose="'banner_image'"  :limit="1" @image="storeImage"></ImageUpload>
                    </div>
                </div>

            </div>
            <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
                <button type="button" class="btn btn-success float-right" @click="submit()">Create</button>
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
          {name: 'Home',link: '/'},
          {name: 'Product Category',link: '/product-category'},
          {name: 'Product Category Entry',link: ''},
      ],
      name: '',
      details: '',
      status: '',
      images: [],
      banner_image: [],
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
      formData.append('name', this.name)
      formData.append('details', this.details)
      formData.append('status', this.status)
      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });
      this.banner_image.forEach((item, i) => {
          formData.append(`banner_image[${i}]`, item)
      });

      http1.post('/product-category/create',formData).then((response)=>{
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
}
</script>

<style lang="scss" scoped >

</style>
