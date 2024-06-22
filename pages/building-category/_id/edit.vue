<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Building Category</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Building Category Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="short_description">Short Description</label><span class="text-danger"> *</span>
                    <textarea class="form-control" v-model="short_description" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-12">
                    <label >Status</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="status">
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  <div class="col-md-12 mt-2">
                      <p>Building Category Images </p>
                      <div class="image-size preview-image"  v-for="(image,index) in images">
                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+image.path+'hdpi/'+image.file" alt="">
                      </div>
                     <ImageUpload :title="``" :perpose="'image'"  :limit="1" @image="storeImage"></ImageUpload>
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
          {name: 'Building Category', link: '/building-category'},
          {name: 'Building Category Update', link: ''},
      ],

      name: '',
      short_description: '',
      status: '',
      images: [],
      uploadImages: []
    }
  },
  methods: {
      storeImage(data) {
          if (data.perpose == 'image') {
              this.uploadImages = data.images
          }
      },

    submit() {
      if(this.name == ''){
        this.$toast.error('Room name is required',{duration:3000})
        return
      }else if (this.short_description == '') {
        this.$toast.error('Short Description is required',{duration:3000})
        return
      }else if (this.status == '') {
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('name', this.name)
      formData.append('short_description', this.short_description)
      formData.append('status', this.status)
      this.uploadImages.forEach((item, i) => {
          formData.append(`upload_images[${i}]`, item)
      });

      http1.post('/building-category/update',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/building-category')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted: function () {

    http1.get('building-category/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.name = response.data.data.name
      this.short_description = response.data.data.short_description
      this.status = response.data.data.status
      this.images = response.data.data.images
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
}
.preview-image .remove-image {
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
</style>
