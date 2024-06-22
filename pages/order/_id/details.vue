<template>
  <div class="row">
    <div class="col-lg-12 mb-2">
       <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <div class="row">
            <div class="col-md-2 ">

                <div class="input-group">
                    <select class="form-control form-control-sm" @change="onChangeStatus($event)">
                      <option value="">Select Status</option>
                      <option v-for="tst in theStatuses"  :key="tst.key" :selected="tst.key == status" :value="tst.key">{{tst.value}}</option>
                    </select>
                  <div class="input-group-append">
                    <button type="button" name="button" class="btn btn-info float-right btn-sm " @click="setStatus()">Save</button>
                  </div>
                </div>

            </div>
            <div class="col-md-1 offset-md-9">
                <button type="button" name="button" class="btn btn-info float-right btn-sm " @click="printNow(order.id)">Print</button>
            </div>
          </div>
         </div>
          <div class="card-body">
             <div class="row">
               <div class="col-md-6">
                 <ul>
                   <li>Order Id: <strong> {{order.id}} </strong> </li>
                   <li>Order Placed: <strong> {{order.created_at}} </strong> </li>
                   <template v-if="order.user">
                     <li>Customer Name : <strong> {{order.user.name}} </strong> </li>
                     <li>Customer phone no: <strong> {{order.user.phone}} </strong> </li>
                   </template>
                   <li>Order Status:  <strong> {{order.order_status}} </strong> </li>
                 </ul>
               </div>

               <div class="col-md-6">
                 <ul>
                   <li>Delivery method : <strong> {{order.delivery_method}} </strong> </li>
                   <li>Payment method : <strong> {{order.payment_method}} </strong> </li>
                   <li>Delivery method : <strong> {{order.delivery_method}} </strong> </li>
                   <li>Delivery Address : <strong> {{order.shipping_address}} </strong></li>
                 </ul>
               </div>

             </div>
          </div>
       </div>
    </div>

   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">products List</p>
         </div>
         <div class="card-body">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Quantity</th>
                     <th>Per Price</th>
                     <th>Total</th>
                  </tr>
               </thead>
               <tbody>

                  <tr v-if="order.products"  v-for="product in order.products"  :key="product.id">
                     <td>{{product.id}}</td>
                     <td>{{product.quantity}}</td>
                     <td>{{product.price}}</td>
                     <td class="text-right">
                         <span class="mr-2">{{product.price * product.quantity}}</span>
                     </td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <div class="row">
                              <div class="col-md-3 offset-md-9 text-right">
                                  Sub Total =
                              </div>
                          </div>
                      </td>
                      <td class="text-right">
                          <span class="mr-2">{{order.sub_total}}</span>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <div class="row">
                              <div class="col-md-4 offset-md-8 text-right">
                                  Delivery Charge =
                              </div>
                          </div>
                      </td>
                      <td class="text-right">
                          <span class="mr-2">+ {{order.delivery_charge}}</span>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <div class="row">
                              <div class="col-md-4 offset-md-8 text-right">
                                  Discount =
                              </div>
                          </div>
                      </td>
                      <td class="text-right">
                          <span class="mr-2">- {{order.discount}}</span>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="3">
                          <div class="row">
                              <div class="col-md-4 offset-md-8 text-right">
                                  Total =
                              </div>
                          </div>
                      </td>
                      <td class="text-right">
                          <span class="mr-2">{{order.total}}</span>
                      </td>
                  </tr>
               </tbody>
            </table>
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
          {name: 'Order',link: '/order/new'},
          {name: 'Details',link: ''},
      ],
      order: '',
      status: '',
      theStatuses: []
    }
  },
  methods: {
    getData() {
      http1.get('order/get',{
        params:{
          id: this.$route.params.id
        }
      }).then((response)=>{
        this.order = response.data.data
        this.status = response.data.data.status
      })
    },
    clickCallback: function (d) {
        this.page = d
        this.$router.push({query:{page:this.page}})
        this.getData()
    },


      onChangeStatus(event) {
          this.status = event.target.value
      },

       setStatus() {
           http1.post('/order/set-status',{
               id: this.$route.params.id,
               status: this.status
           }).then((response)=>{
               if(response.data.msg.success){
                 this.$toast.success(response.data.msg.message,{duration: 3000})
                 this.getData()
               }else{
                 this.$toast.error(response.data.msg.message,{duration: 3000})
               }
           })
       },
    printNow(id)
    {
            window.open('http://127.0.0.1:8000/api/v1/admin/order/invoice/'+ id, "_blank")
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  mounted () {
    this.getData()

    http1.get('/get-data-config',{
      params: {
        type: 'order_status'
      }
    }).then((response)=>{
       this.theStatuses = response.data.data
    })
  }

}
</script>

<style lang="scss" scoped >

</style>
