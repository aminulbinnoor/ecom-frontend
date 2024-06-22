<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header">
              <h5>Set Permission for -  {{theRole.name}}</h5>
            </div>
            <div class="card-body">
                <div class="" v-for="permission in permissions">
                    <p class="mt-3 mb-3"> <strong>{{permission[0].name}}</strong> </p>
                    <hr>

                    <div class="form-row ml-2">
                      <div class="form-group col-md-2" v-for="pr in permission"  :key="pr.id">
                        <input class="form-check-input" type="checkbox" :value="pr.id" v-model="thePermission">
                        <label class="form-check-label" for="defaultCheck1">
                          {{pr.name}}
                        </label>
                      </div>
                    </div>

                </div>

            </div>

            <div class="card-footer">
              <div class="row">
                <div class="col-md-1 offset-md-11">
                     <button type="button" name="button" class="btn btn-success ml-4" @click="submit()"> Submit</button>
                </div>
              </div>

            </div>


          </div>
       </div>
    </div>
  </div>
</template>

<script>
import {http1} from '@/api/axios'

export default {
  data(){
    return {
        breadcrumb: [
            {name: 'Home',link: '/'},
            {name: 'Role',link: '/role'},
            {name: 'Set Permission',link: ''}
        ],
       permissions : [],
       thePermission: [],
       theRole: ''
   }
 },
 methods:{
   submit(){
     http1.post('/role/set-permission',{
       role_id: this.$route.params.id,
       permissions: this.thePermission
     }).then((response)=>{
       if(response.data.msg.success){
         this.$toast.success(response.data.msg.message,{duration: 3000})
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
    http1.get('/permission/get',{
      params:{
        show_all: true
      }
    }).then((response)=>{
      this.permissions = response.data.data
    })

    http1.get('/role/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.theRole = response.data.data
    })

    http1.get('/role/get-permission',{
      params:{
        role_id: this.$route.params.id
      }
    }).then((response)=>{
      this.thePermission = response.data.data
    })
  }

}
</script>

<style lang="scss" scoped >

</style>
