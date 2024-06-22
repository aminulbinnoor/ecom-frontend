<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Add Employee</div>
            <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Employee Name</label>
                    <input type="text" class="form-control" placeholder="employee name" v-model="first_name">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Employee ID</label>
                    <input type="text" class="form-control" placeholder="employee id" v-model="employee_id">
                  </div>

                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Employee password</label>
                    <input type="text" class="form-control" placeholder="password" v-model="password" disabled>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="inputAddress">Role</label>
                      <select class="form-control" v-model="role_id">
                        <option value="">Select Role</option>
                        <option v-for="role in roles"  :key="role.id" :value="role.id">{{role.name}}</option>
                      </select>
                  </div>
               </div>
             </div>
             <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
                 <button type="button" class="btn btn-info float-right" @click="submit()">Create</button>
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
            {name: 'Employee',link: '/employee'},
            {name: 'Employee Create',link: ''},
        ],
        roles: '',
        first_name: '',
        employee_id: '',
        password: '12345678',
        role_id: '',
    }
  },
  methods: {
    submit() {
      if(this.first_name == ''){
        this.$toast.error('Employee name is required',{duration:3000})
        return
      }else if (this.employee_id == '') {
        this.$toast.error('Employee id is required',{duration:3000})
        return
      }else if (this.password == '') {
        this.$toast.error('Password is required',{duration:3000})
        return
    }else if (this.role_id == '') {
        this.$toast.error('Role is required',{duration:3000})
        return
      }

      http1.post('/employee/create',{
        first_name: this.first_name,
        employee_id: this.employee_id,
        password: this.password,
        role_id: this.role_id,
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/employee')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    }
 },
 created () {
     this.$store.commit('setBreadcrumbs',this.breadcrumb)
 },
 mounted () {
   http1.get('/role/get?show_all=true').then((response)=>{
       this.roles = response.data.data
   })
 }
}
</script>

<style lang="scss" scoped >

</style>
