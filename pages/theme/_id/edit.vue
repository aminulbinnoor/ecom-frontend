<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Theme</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Theme Name</label><span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" v-model="name">
                  </div>
                  <div class="form-group col-md-12">
                    <label>Category</label><span class="text-danger">*</span> </label>
                    <select class="form-control" v-model="category_id">
                      <option value="">Select Category</option>
                      <option v-for="category in categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                    </select>
                  </div>
                  <div class="form-group col-md-12">
                    <label>Short Description</label><span class="text-danger">*</span> </label>
                    <textarea class="form-control" v-model="short_description" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-12">
                    <label>Description</label>
                    <textarea class="form-control" v-model="description" rows="3"></textarea>
                  </div>

                </div>
                <div class="form-group">
                  <label>Status</label><span class="text-danger">*</span> </label>
                  <select class="form-control" v-model="status">
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div class="col-md-12 mt-2">
                    <p>Theme Image </p>
                    <div class="image-size preview-image"  v-for="(theme_image,index) in theme_images">
                      <!-- <div class="delete-image remove-image">
                        X
                      </div> -->
                      <img  alt="">
                      <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+theme_image.path+'hdpi/'+theme_image.file" alt="">
                    </div>

                    <ImageUpload :title="``" :perpose="'image'"  :limit="1" @image="storeImage"></ImageUpload>
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
          {name: 'Theme', link: '/theme'},
          {name: 'Theme Update', link: ''},
      ],
      name: '',
      category_id: '',
      short_description: '',
      description: '',
      status: '',
      categories: '',
      theme_images: [],
      upload_theme_images: []
    }
  },
  methods: {
      storeImage(data) {
          if (data.perpose == 'image') {
              this.upload_theme_images = data.images
          }
      },
    submit() {
      if(this.name == ''){
        this.$toast.error('Theme name is required',{duration:3000})
        return
      }else if(this.category_id == ''){
        this.$toast.error('Theme (style) is required',{duration:3000})
        return
      }else if(this.short_description == ''){
        this.$toast.error('Short description is required',{duration:3000})
        return
      }
      else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('name', this.name)
      formData.append('category_id', this.category_id)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('status', this.status)
      this.upload_theme_images.forEach((item, i) => {
          formData.append(`upload_theme_images[${i}]`, item)
      });

      http1.post('/theme/update',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/theme')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    }
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

    http1.get('/theme/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.category_id = response.data.data.category_id
      this.name = response.data.data.name
      this.short_description = response.data.data.short_description
      this.description = response.data.data.description
      this.status = response.data.data.is_active
      this.theme_images = response.data.data.images
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
