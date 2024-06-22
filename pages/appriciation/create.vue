<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color: rgb(0,0,0,.03);">Appriciation Video Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>Client Name</label><span class="text-danger">*</span>
                    <input type="text" class="form-control" placeholder="client name" v-model="client_name">
                  </div>

                  <div class="form-group col-md-6">
                    <label>Client Address</label><span class="text-danger">*</span>
                    <input type="text" class="form-control" placeholder="client address" v-model="address">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="inputEmail4">Appriciation Name</label>
                    <input type="text" class="form-control" placeholder="Appriciation name" v-model="name">
                  </div>

                  <div class="form-group col-md-6">
                    <label>Video Type</label>
                    <select class="form-control" v-model="type">
                      <option value="">Select Type</option>
                      <option value="youtube">Youtube</option>
                    </select>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Appriciation Video Url</label> <span class="text-danger">*</span>
                    <input type="text" class="form-control" placeholder="url" v-model="url">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="inputAddress">Status</label>
                    <select class="form-control" v-model="status">
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                  <div class="col-md-12 mt-2">
                      <label>Thumbnail Image </label><span class="text-danger"> *</span>
                      <ImageUpload :title="``" :perpose="'thumbnail'"  :limit="1" @image="storeImage" ></ImageUpload>
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
          {name: 'Appriciation Video',link: '/appriciation'},
          {name: 'Appriciation Video Entry',link: ''},
      ],
      name: '',
      client_name: '',
      address: '',
      url: '',
      type: '',
      status: '',
      thumbnail_image: [],
    }
  },
  methods: {
    submit() {
      if(this.client_name == ''){
        this.$toast.error('Client Name is required',{duration:3000})
        return
      }else if (this.address == '') {
        this.$toast.error('Address is required',{duration:3000})
        return
      }else if (this.url == '') {
        this.$toast.error('Video Url is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('client_name', this.client_name)
      formData.append('address', this.address)
      formData.append('type', this.type)
      formData.append('url', this.url)
      formData.append('status', this.status)

      this.thumbnail_image.forEach((item, i) => {
          formData.append(`thumbnail_image[${i}]`, item)
      });

      http1.post('/appriciation/create',formData).then((res)=>{
        if(res.data.msg.success){
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.$router.push('/appriciation')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })
    },
    storeImage(data) {
        if(data.perpose == 'thumbnail'){
          this.thumbnail_image = data.images
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
