<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card" style="min-height:400px;">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">Subscription customer List</p>
         </div>
         <div class="card-body p-0">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Email</th>
                     <th>Phone No</th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="subscription in subscriptions"  :key="subscription.id">
                     <td>{{subscription.id}}</td>
                     <td>{{subscription.email}}</td>
                     <td>{{subscription.phone}}</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
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
               <p>Showing {{fromq}} - {{toq}} from {{totalq}} Subscribe Customer </p>
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
          {name: 'Subscription Customer',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      subscriptions: []
    }
  },
  methods: {
    getData() {
      http1.get('subscribe-customer/get',{
        params:{
          page: this.page,
          per_page: this.per_page
        }
      }).then((res)=>{
        this.subscriptions = res.data.data.data
        this.totalPage = res.data.data.last_page
        this.fromq = res.data.data.from
        this.toq = res.data.data.to
        this.totalq = res.data.data.total
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
  mounted () {
    this.getData()
  }

}
</script>

<style lang="scss" scoped >

</style>
