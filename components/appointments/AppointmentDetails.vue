<template>
  <div class="card">
     <div class="card-header" style="background-color:rgba(0,0,0,.03)">
      <p class="float-left">Appointment Details</p>
     </div>
     <div class="card-body">
        <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
           <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
           </thead>
           <tbody>
              <tr>
                <td>{{appointment.id}}</td>
                <td>{{appointment.user ? appointment.user.first_name : '' }}</td>
                <td>{{appointment.user ? appointment.user.email:''}}</td>
                <td>{{appointment.user ? appointment.user.phone:''}}</td>
                <td>{{appointment.created_at}}</td>
                <td>{{appointment.status}}</td>
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
          <p>Showing {{fromq}} - {{toq}} from {{totalq}} Appointment Details</p>
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
</template>

<script>
import {http1} from '@/api/axios'
export default {
  data () {
    return {
      breadcrumb: [
          {name: 'Home',link: '/'},
          {name: 'Appointment',link: '/appointment'},
          {name: 'Appointment Details',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      appointment: '',
      currentTabIndex: 1
    }
  },
  methods: {
    toggleTabIndex(index){
      this.currentTabIndex = index;
    },
    getData() {
      http1.get('appointment/get',{
        params:{
          id: this.$route.params.id
        }
      }).then((res)=>{
        this.appointment = res.data.data
      })
    },
    clickCallback: function (d) {
        this.page = d
        this.$router.push({query:{page:this.page}})
        this.getData()
    }
  },
  watch: {
    per_page: function () {
      this.page = 1
      this.$router.push({query:{page:this.page,per_page: this.per_page}})
      this.getData()
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    this.getData()
  }
}
</script>
