<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Building Category Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-12">
                    <label>Short Description</label>
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
                      <ImageUpload :title="``" :perpose="'image'"  :limit="1" @image="storeImage"></ImageUpload>
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
          {name: 'Building Category',link: '/building-category'},
          {name: 'Building Category Entry',link: ''},
      ],
      name: '',
      short_description: '',
      status: '',
      images: []
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
      }

      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('short_description', this.short_description)
      formData.append('status', this.status)
      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });

      http1.post('/building-category/create',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/building-category')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    },
    storeImage(data) {
        if (data.perpose == 'image') {
            this.images = data.images
        }
    },
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  }
}
</script>

<style lang="scss" scoped >

</style>
