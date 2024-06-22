<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color: rgb(0,0,0,.03);">Hero Slider Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Name</label><span class="text-danger">*</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-12">
                    <label>Status</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="status">
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                  <div class="col-md-12 mt-2">
                      <label>Image </label><span class="text-danger"> *</span>
                      <ImageUpload :title="``" :perpose="'hslider'"  :limit="1" @image="storeImage" ></ImageUpload>
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
          {name: 'Hero Slider',link: '/hero-slider'},
          {name: 'Hero Slider Entry',link: ''},
      ],
      name: '',
      status: '',
      images: [],
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
      }else if (this.images.length < 1) {
          this.$toast.error('Image is required',{duration:3000})
          return
      }

      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('status', this.status)

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });

      http1.post('/hero-slider/create',formData).then((res)=>{
        if(res.data.msg.success){
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.$router.push('/hero-slider')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })
    },
    storeImage(data) {
      this.images = data.images
    },
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
}
</script>

<style lang="scss" scoped >

</style>
