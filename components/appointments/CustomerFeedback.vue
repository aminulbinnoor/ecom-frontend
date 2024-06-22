<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
            <p class="float-left">Customer Feedback</p>
         </div>
        <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Customer Feedback</label>
                <textarea class="form-control" placeholder="write customer feedback" v-model="customer_feedback" rows="3"></textarea>
              </div>
              <div class="form-group col-md-6">
                <label>Note</label><span class="text-danger"> *</span>
                <textarea class="form-control" placeholder="note about next conversation" v-model="note" rows="3"></textarea>
              </div>
            </div>
              <button type="button" class="btn btn-info float-right" @click="submit()">Save</button>
        </div>
      </div>
    </div>
  <div class="col-lg-12">
   <div class="card" v-if="getFeedbacks.length > 0">
      <div class="card-header" style="background-color:rgba(0,0,0,.03)">
        <p class="float-left"> Customer Feedback</p>
      </div>
      <div class="card-body">
         <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
            <thead>
               <tr>
                 <th style="width:7%">Id</th>
                 <th>Customer Feedback</th>
                 <th>Note</th>
                 <th>Date</th>
                 <th></th>
               </tr>
            </thead>
            <tbody>

               <tr  v-for="customerfeedback in getFeedbacks"  :key="customerfeedback.id">
                  <td>{{customerfeedback.id}}</td>
                  <td>{{customerfeedback.customer_feedback}}</td>
                  <td>{{customerfeedback.note}}</td>
                  <td>{{customerfeedback.created_at}}</td>
                  <td>
                   <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(customerfeedback.id)">Delete</button>
                  </td>
               </tr>
            </tbody>
         </table>
         <nav class="float-left">
           <div class="form-group">
             <select class="form-control" v-model="per_page">
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="20">20</option>
               <option value="30">30</option>
             </select>
           </div>
         </nav>
         <nav class="float-left ml-4 mt-1">
           <p>Showing {{fromq}} - {{toq}} from {{totalq}} Customer FeedBack </p>
         </nav>
         <nav class="float-right">
           <paginate
           :value="Number(page)"
            :pageCount="Number(totalPage)"
            :firstLastButton="true"
            :containerClass="'pagination'"
            :pageClass="'page-item'"
            :pageLinkClass="'page-link'"
            :prevClass="'page-item'"
            :prevLinkClass="'page-link'"
            :nextClass="'page-item'"
            :nextLinkClass="'page-link'"
            :clickHandler="clickCallback">
             </paginate>
         </nav>
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
          {name: 'Customer Feedback',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,

      customer_feedback: '',
      note: '',
      getFeedbacks: [],
      currentTabIndex: 1
    }
  },
  methods: {
    toggleTabIndex(index){
      this.currentTabIndex = index;
    },
    submit() {
      if (this.note == '') {
        this.$toast.error('Note is required',{duration:3000})
        return
      }
      http1.post('/appointment/create-customer-feedback',{
        id: this.$route.params.id,
        customer_feedback: this.customer_feedback,
        note: this.note,
      }).then((res)=>{
        if(res.data.msg.success){
          this.customer_feedback = '',
          this.note = '',
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.getCustomerfeedback()
          //this.$router.push('/appointment')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })
    },

    getCustomerfeedback() {
      http1.get('appointment/get-customer-feedback',{
        params:{
          id: this.$route.params.id
        }
      }).then((res)=>{
        this.getFeedbacks = res.data.data
      })
    },

    TheDelete(customerfeedback){
      http1.post('/appointment/delete-customer-feedback',{
        appointment_id: this.$route.params.id,
        id: customerfeedback
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.getCustomerfeedback()
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })
    },
    clickCallback: function (d) {
        this.page = d
        this.$router.push({query:{page:this.page}})
        this.getCustomerfeedback()
    }
  },
  watch: {
    per_page: function () {
      this.page = 1
      this.$router.push({query:{page:this.page,per_page: this.per_page}})
      this.getCustomerfeedback()
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    this.getCustomerfeedback()

  }
}

</script>
