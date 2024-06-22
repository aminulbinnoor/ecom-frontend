<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Building Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-12">
                    <label>Select Building Category</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="building_category_id">
                      <option value="">Select Category</option>
                      <option v-for="category in building_categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                    </select>
                  </div>

                  <div class="form-group col-md-12">
                    <label>Short Description</label>
                    <textarea class="form-control" v-model="short_description" rows="3"></textarea>
                  </div>
                  <div class="form-group col-md-12">
                    <label>Description</label>
                    <textarea class="form-control" v-model="description" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-12">
                    <label for="name">Minimum Land Required</label>
                    <input type="text" class="form-control" placeholder="Minimum Land Required" v-model="min_land_req">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="name">Number Of Floor</label>
                    <input type="text" class="form-control" placeholder="Number Of Floor" v-model="no_of_floor">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="name">Total Space Per Floor</label>
                    <input type="text" class="form-control" placeholder="Total Space Per Floor" v-model="total_space_per_floor">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="name">Structure</label>
                    <input type="text" class="form-control" placeholder="Structure" v-model="structure">
                  </div>

                  <div class="form-group col-md-12">
                    <label for="name">Beds</label>
                    <input type="text" class="form-control" placeholder="Beds" v-model="beds">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Bathrooms</label>
                    <input type="text" class="form-control" placeholder="Bathrooms" v-model="bathrooms">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Balcony</label>
                    <input type="text" class="form-control" placeholder="Balcony" v-model="balcony">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Garden</label>
                    <input type="text" class="form-control" placeholder="Garden" v-model="garden">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Pool</label>
                    <input type="text" class="form-control" placeholder="Pool" v-model="pool">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Garage Capacity</label>
                    <input type="text" class="form-control" placeholder="Garage Capacity" v-model="garage_capacity">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Steel</label>
                    <input type="text" class="form-control" placeholder="Steel" v-model="steel">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="name">Fitting</label>
                    <input type="text" class="form-control" placeholder="Fitting" v-model="fitting">
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
                      <label>Feature Image </label><span class="text-danger"> *</span>
                      <ImageUpload :title="``" :perpose="'feature'"  :limit="2" @image="storeImage" ></ImageUpload>
                  </div>
                  <div class="col-md-12 mt-2">
                      <label>Building Images </label><span class="text-danger"> *</span>
                      <ImageUpload :title="``" :perpose="'product_image'"  :limit="2" @image="storeImage"></ImageUpload>
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
          {name: 'Building',link: '/building'},
          {name: 'Building Entry',link: ''},
      ],
      building_categories: '',
      building_category_id: '',
      name: '',
      short_description: '',
      description: '',
      min_land_req : '',
      no_of_floor : '',
      total_space_per_floor : '',
      structure : '',
      beds : '',
      bathrooms : '',
      balcony : '',
      garden : '',
      pool : '',
      garage_capacity : '',
      steel : '',
      fitting : '',
      status: '',
      feature_image: [],
      images: []
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
          this.$toast.error('Name is required',{duration:3000})
          return
      }else if (this.building_category_id == '') {
        this.$toast.error('Building Category is required',{duration:3000})
        return
      }else if (this.status == '') {
          this.$toast.error('Status is required',{duration:3000})
          return
      }else if (this.feature_image === '') {
          this.$toast.error('Feature Image is required',{duration:3000})
          return
      }
      else if (this.images === '') {
          this.$toast.error('Images is required',{duration:3000})
          return
      }

      let formData = new FormData()
      formData.append('building_category_id', this.building_category_id)
      formData.append('name', this.name)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('min_land_req', this.min_land_req)
      formData.append('no_of_floor', this.no_of_floor)
      formData.append('total_space_per_floor', this.total_space_per_floor)
      formData.append('structure', this.structure)
      formData.append('beds', this.beds)
      formData.append('bathrooms', this.bathrooms)
      formData.append('balcony', this.balcony)
      formData.append('garden', this.garden)
      formData.append('pool', this.pool)
      formData.append('garage_capacity', this.garage_capacity)
      formData.append('steel', this.steel)
      formData.append('fitting', this.fitting)
      formData.append('status', this.status)

      this.feature_image.forEach((item, i) => {
          formData.append(`feature_image[${i}]`, item)
      });

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });

      http1.post('/building/create',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/building')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    },

    storeImage(data) {
        if (data.perpose == 'feature') {
            this.feature_image = data.images
        }else{
            this.images = data.images
        }
    },
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted() {
    http1.get('building-category/get',{
      params: {
        show_all: true
      }
    }).then((res)=>{
       this.building_categories = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
