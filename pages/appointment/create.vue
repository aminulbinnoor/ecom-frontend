<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Create Appointment</div>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label>Client Phone</label>
                  <input type="text" class="form-control" placeholder="Client Phone" v-model="phone">
                </div>
                <div class="form-group col-md-12">
                  <label>Appointment title</label>
                  <input type="text" class="form-control" placeholder="Appointment title" v-model="title">
                </div>
                <div class="form-group col-md-12">
                  <label>Appointment Description</label>
                  <textarea class="form-control" placeholder="Appointment conversation" v-model="description" rows="3"></textarea>
                </div>

                <div class="form-group col-md-12">
                  <label>Appointment Type</label>
                  <input type="text" class="form-control" placeholder="Appointment Type" v-model="appointment_type">
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
          {name: 'Appointment',link: '/appointment'},
          {name: 'Appointment Create',link: ''},
      ],
      phone: '',
      created_by: '',
      title: '',
      description: '',
      appointment_type: '',
    }
  },
  methods: {
    submit() {
      if(this.title == ''){
        this.$toast.error('Appointment title is required',{duration:3000})
        return
      }else if (this.description == '') {
        this.$toast.error('Appointment description is required',{duration:3000})
        return
      }

      http1.post('/appointment/create-by-admin',{
        phone: this.phone,
        created_by: this.created_by,
        title: this.title,
        description: this.description,
        appointment_type: this.appointment_type
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/appointment')
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
