<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Customer Story Entry</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label>Customer Story Name</label><span class="text-danger"> *</span>
                    <input type="text" class="form-control" placeholder="name" v-model="name">
                  </div>
                  <div class="form-group col-md-12">
                    <label>Customer Stories</label><span class="text-danger"> *</span>
                    <textarea class="form-control" v-model="stories" rows="3"></textarea>
                  </div>
                  <div class="form-group col-md-12">
                    <label>Status</label><span class="text-danger"> *</span>
                    <select class="form-control" v-model="status">
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
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
          {name: 'Customer Story',link: '/customer-story'},
          {name: 'Customer Story Entry',link: ''},
      ],
      name: '',
      stories: '',
      status: '',
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Name is required',{duration:3000})
        return
      }else if(this.stories == ''){
        this.$toast.error('Stories is required',{duration:3000})
        return
      }
      else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      http1.post('/customer-story/create',{
        name: this.name,
        stories: this.stories,
        status: this.status
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/customer-story')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
}
</script>

<style lang="scss" scoped >

</style>
