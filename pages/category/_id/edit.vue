<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Category</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Category Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="name" v-model="name">
                  </div>
                  <div class="form-group col-md-12">
                    <label>Details</label><span class="text-danger"> *</span>
                    <textarea class="form-control" v-model="details" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label>Status</label><span class="text-danger"> *</span>
                  <select class="form-control" v-model="status">
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </select>
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
          {name: 'Home',link: '/'},
          {name: 'Category',link: '/category'},
          {name: 'Category Update',link: ''},
      ],
      name: '',
      details: '',
      status: '',
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Category name is required',{duration:3000})
        return
      }else if(this.details == ''){
        this.$toast.error('Details is required',{duration:3000})
        return
      }else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      http1.post('/category/update',{
        id: this.$route.params.id,
        name: this.name,
        details: this.details,
        status: this.status
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/category')
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
    http1.get('category/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.name = response.data.data.name
      this.details = response.data.data.details
      this.status = response.data.data.is_active
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
