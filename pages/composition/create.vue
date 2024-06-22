<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)"> Composition Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputEmail4">Composition Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <!-- category  -->
                  <div class="form-group col-md-6">
                    <label>Category<span class="text-danger"> *</span></label>
                    <select class="form-control" v-model="category_id">
                      <option value="">Select Category</option>
                      <option v-for="category in categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                    </select>
                  </div>

                  <!-- category wise select theme -->
                  <div class="form-group col-md-6">
                    <label>Theme<span class="text-danger"> *</span></label>
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
                      <label>Status</label><span class="text-danger"> *</span>
                      <select class="form-control" v-model="status">
                          <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                </div>

                <div class="col-md-12 mt-2">
                    <p>Composition Image </p>
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
          {name: 'Home',link: '/'},
          {name: 'Composition',link: '/composition'},
          {name: 'Composition Entry',link: ''},
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
      specification: [
          {name: 'bedroom',value: ''},
          {name: 'dining',value: ''},
          {name: 'washroom',value: ''},
          {name: 'drawing-room',value: ''},
          {name: 'kitchen',value: ''}
      ],
      composition_code: '',
      status: '',
      composition_image: [],
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
      // formData.append('composition_image', JSON.stringify(this.composition_image))

      this.composition_image.forEach((item, i) => {
          formData.append(`composition_image[${i}]`, item)
      });

      http1.post('/composition/create',formData).then((response)=>{
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
            this.composition_image = data.images
        }
    },

    addNew(){
      this.specification.push({name: '',value: ''})
    },
    removeNew(i){
      this.specification.splice(i,1)
    },
},

  watch: {
    // category wise themes
    category_id: function (){
      http1.get(`/category/get/${this.category_id}/theme`,{

      }).then((response)=>{
         this.themes = response.data.data
      })
    },

    // min_price: function (val) {
    //   this.min_price = val;
    // },
    //
    // max_price: function(val){
    //   if(this.min_price < this.max_price){
    //     this.max_price = val;
    //   }else{
    //      this.$toast.error('Maxmum price not less than Minimum Price',{duration:3000})
    //      return this.max_price = '';
    //   }
    // }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    http1.get('/category/get',{
      params: {
        show_all: true
      }
    }).then((response)=>{
       this.categories = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
