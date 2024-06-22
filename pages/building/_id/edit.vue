<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Building</div>
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
                    <label for="short_description">Short Description</label><span class="text-danger"> *</span>
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
                      <div class="">
                          <label>Feature Image </label><span class="text-danger"> *</span>
                      </div>
                      <div class="image-size preview-image"  v-for="(pfimage,index) in product_feature_images">
                        <div class="delete-image remove-image" @click="deleteImage(index,'feature')">
                          X
                        </div>
                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pfimage.path+'hdpi/'+pfimage.file" alt="">
                      </div>

                      <ImageUpload :title="``" :perpose="'feature'"  :limit="2" @image="storeImage" ></ImageUpload>
                  </div>
                  <div class="col-md-12 mt-2">
                      <div class="">
                          <label>Building Images </label><span class="text-danger"> *</span>
                      </div>
                      <div class="image-size preview-image"  v-for="(pimage,index) in product_images">
                        <div class="delete-image remove-image" @click="deleteImage(index,'pimage')">
                          X
                        </div>
                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+pimage.path+'hdpi/'+pimage.file" alt="">
                      </div>
                      <ImageUpload :title="``" :perpose="'product_image'"  :limit="2" @image="storeImage" ></ImageUpload>
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
          {name: 'Building', link: '/building'},
          {name: 'Building Update', link: ''},
      ],

      building_category_id: '',
      building_categories: '',
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
      product_images: [],
      product_feature_images: [],
      feature_image: [],
      images: [],
      deletedProductImages: [],
      deletedFeatureImages: [],
    }
  },
  methods: {
    deleteImage (index,type) {
        if (type == 'feature') {
            this.deletedFeatureImages.push(this.product_feature_images[index])
            this.product_feature_images.splice(index, 1)
        }else if (type == 'pimage') {
            this.deletedProductImages.push(this.product_images[index])
            this.product_images.splice(index, 1)
        }
    },
    storeImage(data) {
        if (data.perpose == 'feature') {
            this.feature_image = data.images
        }else{
            this.images = data.images
        }
    },

    submit() {
      if(this.name == ''){
        this.$toast.error('Name is required',{duration:3000})
        return
      }else if (this.building_category_id == '') {
        this.$toast.error('Building Category is required',{duration:3000})
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
      formData.append('deleted_product_images', JSON.stringify(this.deletedProductImages))
      formData.append('deleted_product_fimages', JSON.stringify(this.deletedFeatureImages))
      formData.append('deleted_after_product_images', JSON.stringify(this.product_images))
      formData.append('deleted_after_product_fimages', JSON.stringify(this.product_feature_images))

      this.feature_image.forEach((item, i) => {
          formData.append(`feature_image[${i}]`, item)
      });

      this.images.forEach((item, i) => {
          formData.append(`images[${i}]`, item)
      });

      http1.post('/building/update',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/building')
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
    http1.get('building/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.building_category_id = response.data.data.building_category_id
      this.name = response.data.data.name
      this.short_description = response.data.data.short_description
      this.description = response.data.data.description
      this.min_land_req = response.data.data.min_land_req
      this.no_of_floor = response.data.data.no_of_floor
      this.total_space_per_floor = response.data.data.total_space_per_floor
      this.structure = response.data.data.structure
      this.beds = response.data.data.beds
      this.bathrooms = response.data.data.bathrooms
      this.balcony = response.data.data.balcony
      this.garden = response.data.data.garden
      this.pool = response.data.data.pool
      this.garage_capacity = response.data.data.garage_capacity
      this.steel = response.data.data.steel
      this.fitting = response.data.data.fitting
      this.status = response.data.data.status
      this.product_feature_images = response.data.data.feature_image
      this.product_images = response.data.data.images
    })

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
.preview-image {
  margin-right: 20px;
  display: inline-block;
  margin-top: 16px;
  border: 1px dashed;
  position: relative;
  height: 100px;

   .remove-image {
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
}

// tab active background-color
  .nav-pills {
    .nav-link{
      &.active{
        background: #be926f;
        color: #fff;
      }

      &:focus{
        outline: 0;
        box-shadow: none;
      }
    }
  }
</style>
