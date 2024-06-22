<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Permission</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputEmail4">Name</label>
                    <input type="email" class="form-control" placeholder="title" v-model="name">
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
          {name: 'Home',link: '/'},
          {name: 'Permission',link: '/permission'},
          {name: 'Permission Update',link: ''},
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

      http1.post('/permission/update',{
        id: this.$route.params.id,
        name: this.name,
      }).then((res)=>{
        if(res.data.msg.success){
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.$router.push('/permission')
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
    http1.get('permission/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((res)=>{
      this.name = res.data.data.name
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
