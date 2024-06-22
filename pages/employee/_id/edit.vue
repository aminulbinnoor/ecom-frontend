<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Update Employee</div>
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
                    <label for="inputEmail4">Employee new password (reset purpose)</label>
                    <input type="text" class="form-control" placeholder="password" v-model="new_password">
                  </div>

                  <div class="form-group col-md-6">
                      <label for="inputAddress">Role </label>
                      <select class="form-control" v-model="role_id">
                        <option value="">Select role</option>
                        <option v-for="role in roles"  :key="role.id" :value="role.id">{{role.name}}</option>
                      </select>
                  </div>
               </div>

               <div class="form-row">
                 <div class="form-group col-md-6">
                   <label>Employee Mobile</label>
                   <input type="text" class="form-control" placeholder="mobile number" v-model="mobile">
                 </div>

                 <div class="form-group col-md-6">
                   <label>Employee Email</label>
                   <input type="text" class="form-control" placeholder="email" v-model="email" >
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
            {name: 'Employee', link: '/employee'},
            {name: 'Employee Update', link: ''},
        ],
        roles: '',
        first_name: '',
        employee_id: '',
        new_password: '',
        mobile: '',
        email: '',
        role_id: 1,
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
      }else if (this.role == '') {
        this.$toast.error('Role is required',{duration:3000})
        return
      }

      http1.post('/employee/update',{
        id: this.$route.params.id,
        first_name: this.first_name,
        employee_id: this.employee_id,
        new_password: this.new_password,
        mobile: this.mobile,
        email: this.email,
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
  mounted(){
    http1.get('employee/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((res)=>{
      this.first_name = res.data.data.first_name
      this.employee_id = res.data.data.employee_id
      this.password = res.data.data.password
      this.mobile =  res.data.data.mobile
      this.email =  res.data.data.email
      this.role_id = res.data.data.role_id
    })

    http1.get('/role/get?show_all=true').then((response)=>{
        this.roles = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
