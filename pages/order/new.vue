<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
           <div class="float-left">
             <p>New Order List</p>
           </div>

           <div class="btn-group float-right p-0" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary" @click="exportExcel()">CSV</button>
            <button type="button" class="btn btn-primary" @click="exportExcel()">Excel</button>
            <button type="button" class="btn btn-primary">PDF</button>
          </div>

        </div>
         <div class="card-body p-0">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Order Placed</th>
                     <th>Client Name</th>
                     <th>Delivery Method</th>
                     <th>Payment Method</th>
                     <th>Total Price</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="order in orders"  :key="order.id">
                     <td>{{order.id}}</td>
                     <td>{{order.created_at}}</td>
                     <td>{{order.user ? order.user.name : ''}}</td>
                     <td>{{order.delivery_method}}</td>
                     <td>{{order.payment_method}}</td>
                     <td>{{order.total}}</td>
                     <td><span class="badge badge-success" v-if="order.status == 1">New Order</span></td>
                     <td>
                       <router-link :to="`/order/${order.id}/details`" type="button" name="button" class="btn btn-info btn-sm">Details</router-link>
                     </td>
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
             <p>Showing {{fromq}} - {{toq}} from {{totalq}} New orders </p>
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
          {name: 'New Order List',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      orders: []
    }
  },
  methods: {
      exportExcel(){
          var a = document.createElement('a');
          a.href = this.apilink + '/report/order'
          a.setAttribute('download',true);
          a.click()
    },
    getOrders() {
      http1.get('order/get',{
        params:{
          status: '1',
          page: this.page,
          per_page: this.per_page
        }
      }).then((response)=>{
        this.orders = response.data.data.data
        this.totalPage = response.data.data.last_page
        this.fromq = response.data.data.from
        this.toq = response.data.data.to
        this.totalq = response.data.data.total
      })
    },
    clickCallback: function (d) {
        this.page = d
        this.$router.push({query:{page:this.page}})
        this.getOrders()
    }
  },
  watch: {
    per_page: function () {
      this.page = 1
      this.$router.push({query:{page:this.page,per_page: this.per_page}})
      this.getOrders()
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted () {
    this.getOrders()
  }

}
</script>

<style lang="scss" scoped >

</style>
