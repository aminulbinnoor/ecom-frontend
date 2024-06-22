<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Theme Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputEmail4">Theme Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputAddress">Category</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="category_id">
                      <option value="">Select Category</option>
                      <option v-for="category in categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-12">
                    <label>Short Description</label><span class="text-danger"> *</span>
                    <textarea class="form-control" v-model="short_description" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-12">
                    <label>Description</label>
                    <textarea class="form-control" v-model="description" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Status</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="status">
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div class="col-md-12 mt-2">
                    <p>Theme Image </p>
                    <ImageUpload :title="``" :perpose="'image'"  :limit="1" @image="storeImage"></ImageUpload>
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
          {name: 'Home', link: '/'},
          {name: 'Theme', link: '/theme'},
          {name: 'Theme Entry', link: ''},
      ],
      name: '',
      category_id: '',
      short_description: '',
      description: '',
      status: '',
      theme_image: [],
      categories: '',
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Theme name is required',{duration:3000})
        return
      }else if(this.category_id == ''){
        this.$toast.error('Category is required',{duration:3000})
        return
      }else if(this.short_description == ''){
        this.$toast.error('Short description is required',{duration:3000})
        return
      }else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('category_id', this.category_id)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('status', this.status)

      this.theme_image.forEach((item, i) => {
          formData.append(`theme_image[${i}]`, item)
      });

      http1.post('/theme/create',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/theme')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    },
    storeImage(data) {
        if (data.perpose == 'image') {
            this.theme_image = data.images
        }
    },

  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    http1.get('/category/get',{
      params: {
        show_all: true
      }
    }).then((res)=>{
       this.categories = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
