<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Composition</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Composition Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" v-model="name">
                  </div>

                  <div class="form-group col-md-6">
                    <label>Select Category</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="category_id">
                      <option value="">Select Category</option>
                      <option v-for="category in categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                    </select>
                  </div>

                  <div class="form-group col-md-6">
                    <label>Theme</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="theme_id">
                      <option value="">Select Theme</option>
                      <option v-for="theme in themes"  :key="theme.id" :value="theme.id">{{theme.name}}</option>
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

                  <div class="form-group col-md-4">
                    <label>Minimum Price</label><span class="text-danger"> *</span>
                    <input type="number" class="form-control" placeholder="Minimum Price" v-model="min_price">
                  </div>

                  <div class="form-group col-md-4">
                    <label>Maximum Price</label>
                    <input type="number" class="form-control" placeholder="Maximum Price" v-model="max_price">
                  </div>

                  <div class="form-group col-md-4">
                    <label>Costing Price</label>
                    <input type="number" class="form-control" placeholder="Costing Price" v-model="costing_price">
                  </div>

                  <div class="col-md-12 p-1" style="border:1px solid #d8dbe0;border-radius:4px">
                      <div class="form-group col-md-12 row ">
                        <label class="col-md-12">Specification<span class="text-danger">*</span></label>
                        <div class="input-group mt-2 col-md-4" v-for="(sp,index) in specification"  :key="sp.id">
                          <input type="text" class="form-control col-md-4" placeholder="name" v-model="sp.name" disabled>
                          <input type="number" class="form-control" placeholder="quantity" v-model="sp.value">
                          <!-- <div class="input-group-append">
                              <div class="btn-group" role="group" aria-label="Basic example">
                                      <button type="button" class="btn btn-danger btn-sm" :disabled="index == 0"  @click="removeNew(index)">X</button>
                                      <button type="button" class="btn btn-info btn-sm" :disabled="index+1 !== specification.length"   @click="addNew()">+</button>
                                 </div>
                          </div> -->
                        </div>
                      </div>
                  </div>

                </div>

                <div class="form-row mt-4">
                    <div class="form-group col-md-6">
                      <label>Composition code</label><span class="text-danger"> *</span>
                      <input type="number" class="form-control" placeholder="Composition code" v-model="composition_code">
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputAddress">Status</label><span class="text-danger"> *</span>
                      <select class="form-control" v-model="status">
                          <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                </div>

                <div class="col-md-12 mt-2">
                    <div class="">
                        <label>Composition Image </label><span class="text-danger"> *</span>
                    </div>
                    <div class="image-size preview-image"  v-for="(pfimage,index) in composition_images">
                      <!-- <div class="delete-image remove-image" @click="deleteImage(index,'feature')">
                        X
                      </div> -->
                      <img  alt="">
                      <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pfimage.path+'hdpi/'+pfimage.file" alt="">
                    </div>

                    <ImageUpload :title="``" :perpose="'image'"  :limit="2" @image="storeImage" ></ImageUpload>
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
          {name: 'Composition', link: '/composition'},
          {name: 'Composition Update', link: ''},
      ],
      name: '',
      categories: '',
      category_id: '',
      themes: '',
      theme_id: '',
      short_description: '',
      description: '',
      min_price: '',
      max_price: '',
      costing_price: '',
      specification: [],
      composition_code: '',
      status: '',
      composition_images: [],
      upload_composition_images: [],
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Composition name is required',{duration:3000})
        return
      }else if(this.category_id == ''){
        this.$toast.error('Category is required',{duration:3000})
        return
      }else if(this.theme_id == ''){
        this.$toast.error('Theme (style) is required',{duration:3000})
        return
      }else if(this.short_description == ''){
        this.$toast.error('Short description is required',{duration:3000})
        return
      }else if(this.min_price == ''){
        this.$toast.error('Minimum price is required',{duration:3000})
        return
      }else if(this.specification == ''){
        this.$toast.error('Specification is required',{duration:3000})
        return
      }else if(this.composition_code == ''){
        this.$toast.error('Composition Code is required',{duration:3000})
        return
      }else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('name', this.name)
      formData.append('category_id', this.category_id)
      formData.append('theme_id', this.theme_id)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('min_price', this.min_price)
      formData.append('max_price', this.max_price)
      formData.append('costing_price', this.costing_price)
      formData.append('specification', JSON.stringify(this.specification))
      formData.append('composition_code', this.composition_code)
      formData.append('status', this.status)
      this.upload_composition_images.forEach((item, i) => {
          formData.append(`upload_composition_images[${i}]`, item)
      });

      http1.post('/composition/update',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/composition')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

  },

  storeImage(data) {
      if (data.perpose == 'image') {
          this.upload_composition_images = data.images
      }
  },
  addNew(){
    this.specification.push({name: '',value: ''})
  },
  removeNew(i){
    this.specification.splice(i,1)
  }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  watch: {
    // category wise themes
    category_id: function (){
      http1.get(`/category/get/${this.category_id}/theme`,{

      }).then((response)=>{
         this.themes = response.data.data
      })
    }
  },
  mounted(){
    http1.get('/category/get',{
      params: {
        show_all: true
      }
    }).then((response)=>{
       this.categories = response.data.data
    })

    http1.get('/composition/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.name = response.data.data.name
      this.category_id = response.data.data.category_id
      this.theme_id = response.data.data.theme_id
      this.short_description = response.data.data.short_description
      this.description = response.data.data.description
      this.min_price = response.data.data.min_price
      this.max_price = response.data.data.max_price
      this.costing_price = response.data.data.costing_price
      this.specification = response.data.data.specification
      this.status = response.data.data.is_active
      this.composition_code = response.data.data.composition_code
      this.composition_images = response.data.data.images
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
