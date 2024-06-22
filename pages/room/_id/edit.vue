<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Room</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Room Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>

                  <div class="form-group col-md-3">
                    <label>Select Category</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="category_id" @change="pickCategory()">
                      <option value="">Select Category</option>
                      <option v-for="category in categories"  :key="category.id" :value="category.id">{{category.name}}</option>
                    </select>
                  </div>

                  <!-- Theme or Style -->
                  <div class="form-group col-md-3">
                    <label>Select Theme</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="theme_id" @change="pickTheme()">
                      <option value="">Select Theme</option>
                      <option v-for="theme in themes"  :key="theme.id" :value="theme.id">{{theme.name}}</option>
                    </select>
                  </div>

                  <!-- composition or looks -->
                  <div class="form-group col-md-3">
                    <label>Select Composition</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="composition_id" @change="pickComposition()">
                      <option value="">Select Composition</option>
                      <option v-for="composition in compositions"  :key="composition.id" :value="composition.id">{{composition.name}}</option>
                    </select>
                  </div>

                  <!-- composition or looks -->
                  <div class="form-group col-md-3">
                    <label>Select Room Tag</label>
                    <select class="form-control" v-model="room_tag_id">
                      <option value="">Select Room Tag</option>
                      <option v-for="roomtag in roomtags"  :key="roomtag.id" :value="roomtag.id">{{roomtag.name}}</option>
                    </select>
                  </div>

                  <div class="form-group col-md-12">
                    <label for="short_description">Short Description</label><span class="text-danger"> *</span>
                    <textarea class="form-control" v-model="short_description" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-12">
                    <label for="description">Description</label>
                    <textarea class="form-control" v-model="description" rows="5"></textarea>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="name">Room Length</label><span class="text-danger"> *</span>
                    <input type="number" class="form-control" placeholder="length" v-model="length">
                  </div>

                  <div class="form-group col-md-6">
                    <label for="name">Room Width</label><span class="text-danger"> *</span>
                    <input type="number" class="form-control" placeholder="width" v-model="width">
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
                      <p>Room Images </p>
                      <div class="image-size preview-image"  v-for="(roomImage,index) in room_images">
                        <!-- <div class="delete-image remove-image">
                          X
                        </div> -->
                        <img  alt="">
                        <img style="width:100px;height:100px;object-fit: contain;" :key="" :src="cdn+'/'+roomImage.path+'hdpi/'+roomImage.file" alt="">
                      </div>
                     <ImageUpload :title="``" :perpose="'image'"  :limit="1" @image="storeImage"></ImageUpload>
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
          {name: 'Room', link: '/room'},
          {name: 'Room Update', link: ''},
      ],

      categories: '',
      category_id: '',
      themes: '',
      theme_id: '',
      compositions: '',
      composition_id: '',
      room_tag_id: '',
      roomtags: '',
      name: '',
      short_description: '',
      description: '',
      length: '',
      width: '',
      status: '',
      room_images: [],
      room_feature_images: [],
      feature_image: [],
      images: [],
      uploadImages: []
    }
  },
  methods: {
      storeImage(data) {
          if (data.perpose == 'image') {
              this.uploadImages = data.images
          }
      },

    submit() {
      if(this.name == ''){
        this.$toast.error('Room name is required',{duration:3000})
        return
      }else if (this.category_id == '') {
          this.$toast.error('Category is required',{duration:3000})
          return
      }else if (this.theme_id == '') {
          this.$toast.error('Theme (Style) is required',{duration:3000})
          return
      }else if (this.composition_id == '') {
          this.$toast.error('Composition (Looks) is required',{duration:3000})
          return
      }else if (this.short_description == '') {
        this.$toast.error('Short Description is required',{duration:3000})
        return
      }else if (this.length == '') {
          this.$toast.error('Length is required',{duration:3000})
          return
      }else if (this.width == '') {
          this.$toast.error('Width is required',{duration:3000})
          return
      }else if (this.status == '') {
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      let formData = new FormData()
      formData.append('id', this.$route.params.id)
      formData.append('category_id', this.category_id)
      formData.append('theme_id', this.theme_id)
      formData.append('composition_id', this.composition_id)
      formData.append('room_tag_id', this.room_tag_id)
      formData.append('name', this.name)
      formData.append('short_description', this.short_description)
      formData.append('description', this.description)
      formData.append('length', this.length)
      formData.append('width', this.width)
      formData.append('status', this.status)
      this.uploadImages.forEach((item, i) => {
          formData.append(`upload_images[${i}]`, item)
      });

      http1.post('/room/update',formData).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/room')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    },

    pickCategory(){
        this.compositions = []
        this.composition_id = ''
        this.theme_id = ''
        http1.get(`/category/get/${this.category_id}/theme`,{

        }).then((response)=>{
          this.themes = response.data.data
        })
    },
    pickTheme(){
        this.composition_id = ''
        http1.get(`/theme/get/${this.theme_id}/composition`,{

        }).then((response)=>{
          this.compositions = response.data.data
        })
    },
    pickComposition(){
        http1.get(`/composition/get/${this.composition_id}/room`,{

        }).then((response)=>{
          this.rooms = response.data.data
        })
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted: function () {
    http1.get('/category/get',{
      params: {
        show_all: true
      }
    }).then((response)=>{
       this.categories = response.data.data
    })

    http1.get('/room-tag/get',{
      params: {
        show_all: true
      }
    }).then((response)=>{
       this.roomtags = response.data.data
    })

    http1.get('room/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.name = response.data.data.name
      this.category_id = response.data.data.category_id
      this.theme_id = response.data.data.theme_id
      this.composition_id = response.data.data.composition_id
      this.room_tag_id = response.data.data.room_tag_id
      this.short_description = response.data.data.short_description
      this.description = response.data.data.description
      this.length = response.data.data.length
      this.width = response.data.data.width
      this.status = response.data.data.is_active
      this.room_images = response.data.data.images
      this.room_feature_images = response.data.data.feature_images

      http1.get(`/category/get/${this.category_id}/theme`).then((response)=>{
          this.themes = response.data.data
      })

      http1.get(`/theme/get/${this.theme_id}/composition`,{

        }).then((response)=>{
          this.compositions = response.data.data
        })

      http1.get(`/composition/get/${this.composition_id}/room`,{

           }).then((response)=>{
             this.rooms = response.data.data
      })
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
