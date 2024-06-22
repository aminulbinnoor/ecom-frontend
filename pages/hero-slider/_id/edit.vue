<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color: rgb(0,0,0,.03);">Update Hero Slider Image</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Name</label><span class="text-danger">*</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="inputAddress">Status</label><span class="text-danger">*</span>
                    <select class="form-control" v-model="status">
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                  <div class="col-md-12 mt-2">
                      <div class="">
                          <label>Images </label><span class="text-danger"> *</span>
                      </div>
                      <div class="image-size preview-image"  v-for="(pimage,index) in hslider_images">
                        <div class="delete-image remove-image" @click="deleteImage(index,'hslider')">
                          X
                        </div>
                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pimage.path+'hdpi/'+pimage.file" alt="">
                      </div>
                      <ImageUpload :title="``" :perpose="'hslider_image'"  :limit="1" @image="storeImage" ></ImageUpload>
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
          {name: 'Home',link: '/'},
          {name: 'Hero Slider',link: '/hero-slider'},
          {name: 'Hero Slider Update',link: ''},
      ],
      name: '',
      status: '',
      hslider_images: [],
      images: [],
      deletedProductImages: []
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Name is required',{duration:3000})
        return
      }else if (this.status == '') {
        this.$toast.error('Status is required',{duration:3000})
        return
      }else if (this.images.length + this.hslider_images.length < 1) {
          this.$toast.error('Image is required',{duration:3000})
          return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('name', this.name)
      formData.append('status', this.status)
      formData.append('deleted_hslider_timages', JSON.stringify(this.deletedProductImages))
      formData.append('deleted_after_hslider_timages', JSON.stringify(this.hslider_images))

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });

      http1.post('/hero-slider/update',formData).then((res)=>{
        if(res.data.msg.success){
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.$router.push('/hero-slider')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })

    },
    deleteImage (index,type) {
      if (type == 'hslider') {
            this.deletedProductImages.push(this.hslider_images[index])
            this.hslider_images.splice(index, 1)
      }
    },
    storeImage(data) {
        if (data.perpose == 'hslider_image') {
            this.images = data.images
        }
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    http1.get('hero-slider/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.name = response.data.data.name
      this.status = response.data.data.status
      this.hslider_images = response.data.data.images
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
