<template>
  <div class="row">
    <div class="col-md-2 ">
      <div class="nav flex-column nav-pills p-4 bg-white rounded">
        <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 1 ? 'active' : '']" @click="toggleTabIndex(1)">Appointment Details</button>
        <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 2 ? 'active' : '']" @click="toggleTabIndex(2)">Customer Feedback</button>
        <button type="button" class="btn nav-link text-left" :class="[currentTabIndex == 3 ? 'active' : '']" @click="toggleTabIndex(3)">Assign To</button>
      </div>
    </div>
      <div class="col-lg">
        <div class="tab-content">
          <div class="tab-pane d-block" v-if="currentTabIndex == 1">
            <AppointmentDetails></AppointmentDetails>
          </div>
          <div class="tab-pane d-block" v-if="currentTabIndex == 2">
            <CustomerFeedback></CustomerFeedback>
          </div>
          <div class="tab-pane d-block" v-if="currentTabIndex == 3">
            <AppointmentAssign></AppointmentAssign>
          </div>
        </div>
      </div>
  </div>


   <!-- customer_feedback data -->
   <!-- <div class="col-lg-12">
     <div class="card">
        <div class="card-header" style="background-color:rgba(0,0,0,.03)">
         <p class="float-left">Customer Feedback</p>
         <button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#exampleModal"> Add Feedback</button>
        </div>
        <div class="card-body">
           <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
              <thead>
                 <tr>
                   <th>ID</th>
                   <th>Feedback</th>
                   <th>Note</th>
                   <!-- <th>Assign Stuff</th>                    -->
                 <!-- </tr>
              </thead>
              <tbody>
                <template v-if="appointment">
                  <tr v-for="feedback in appointment.feedbacks"  :key="feedback.id">
                    <td>{{feedback.id}}</td>
                    <td>{{feedback.customer_feedback}}</td>
                    <td>{{feedback.note}}</td>
                    <!-- <td>{{feedback.appointment_type}}</td> -->


                  <!-- </tr>
                </template>
              </tbody>
           </table>
        </div>
     </div>
     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
            <h5 class="modal-title">Customer Feedback</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
           <div class="modal-body">
             <div class="card-body">
                 <div class="form-row">
                   <div class="form-group col-md-12">
                     <label>Customer Feedback</label>
                     <textarea class="form-control" placeholder="customer feedback" v-model="customer_feedback" rows="3"></textarea>
                   </div>
                   <div class="form-group col-md-12">
                     <label>Note</label>
                     <textarea class="form-control" placeholder="note about next conversation" v-model="note" rows="3"></textarea>
                   </div>
                 </div>
                 <div class="form-group">
                   <label>Assign To</label>
                   <select class="form-control" v-model="assign_to">
                     <option value="">Select Consultant</option>
                     <option v-for="assign_stuff in assign_stuffs"  :key="assign_stuff.id" :value="assign_stuff.id">{{assign_stuff.first_name}} {{assign_stuff.last_name}}</option>
                   </select>
                 </div>
             </div>
           </div>
           <div class="modal-footer">
            <button type="button" class="btn btn-info float-right" @click="submit()">Save Customer Feedback</button>
          </div>
         </div>
       </div>
     </div> -->
  <!-- </div>
  </div>  -->
   <!-- end customer_feedback data -->
 </template>

<script>
import {http1} from '@/api/axios'
import AppointmentAssign from '@/components/appointments/AppointmentAssign'
import AppointmentDetails from '@/components/appointments/AppointmentDetails'
import CustomerFeedback from '@/components/appointments/CustomerFeedback'

export default {
  data () {
    return {
      breadcrumb: [
          {name: 'Home',link: '/'},
          {name: 'Appointment',link: '/appointment'},
          {name: 'Appointment Details',link: ''},
      ],
      appointment: '',
      currentTabIndex: 1
    }
  },
  methods: {
    toggleTabIndex(index){
      this.currentTabIndex = index;
    },
    submit() {
      // if (this.assign_to == '') {
      //   this.$toast.error('Assign to is required',{duration:3000})
      //   return
      // }
      http1.post('/appointment/update',{
        id: this.$route.params.id,
        customer_feedback: this.customer_feedback,
        note: this.note,
      }).then((res)=>{
        if(res.data.msg.success){
          // this.customer_feedback = '',
          // this.note = '',
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.getAppoinment()
          //this.$router.push('/appointment')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })
    },

    getAppoinment() {
      http1.get('appointment/get',{
        params:{
          id: this.$route.params.id
        }
      }).then((res)=>{
        this.appointment = res.data.data
      })
    },
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    this.getAppoinment()

  }
}
</script>


<style lang="scss" scoped>
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
