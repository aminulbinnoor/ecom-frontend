<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Role</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputEmail4">Name</label>
                    <input type="email" class="form-control" placeholder="Name" v-model="name">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputPassword4">Description</label>
                    <textarea class="form-control" v-model="description" rows="3"></textarea>
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
          {name: 'Role', link: '/role'},
          {name: 'Role Update', link: ''},
      ],
      name: '',
      description: '',
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Name is required',{duration:3000})
        return
      }

      http1.post('/role/update',{
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
      }).then((res)=>{
        if(res.data.msg.success){
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.$router.push('/role')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })

    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted(){
    http1.get('role/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((res)=>{
      this.name = res.data.data.name
      this.description = res.data.data.description
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
