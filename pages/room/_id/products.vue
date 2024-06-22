<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-row align-items-center">
              <div class="col-md-2">
                <label>Product Id</label> <span class="text-danger"> *</span>
              </div>
              <div class="col-md-7">
                <input type="text" class="form-control mb-2" placeholder="Type Product Id here" v-model="product_id">
              </div>
              <div class="col-md-3">
                <button type="button" class="btn btn-success mb-2"  @click="submit()">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left"> Products List</p>
          <!-- <router-link to="/package/create" type="button" name="button" class="float-right btn btn-info"> Add Product </router-link> -->
         </div>
         <div class="card-body">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                    <th style="width:7%">Product Id</th>
                     <th>Name</th>
                     <th>Slug</th>
                     <th>Price</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="product in products"  :key="product.id">
                     <td>{{product.id}}</td>
                     <td>{{product.name}}</td>
                     <td>{{product.slug}}</td>
                     <td>{{product.price}}</td>
                     <td>
                      <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(product.id)">Delete</button>
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
              <p>Showing {{fromq}} - {{toq}} from {{totalq}} orders </p>
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
          {name: 'Room', link: '/room'},
          {name: 'Room Product',link: ''},
      ],
      product_id: '',
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      products: []
    }
  },
  methods: {
    submit() {
      if(this.product_id == ''){
          this.$toast.error('Product Id is required',{duration:3000})
          return
      }

      http1.post('/room/create-room-product',{
        room_id: this.$route.params.id,
        product_id: this.product_id
      }).then((response)=>{
        if(response.data.msg.success){
          this.product_id = ''
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.getData()
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })
    },
    TheDelete(productId){
      http1.post('/room/delete-room-product',{
        room_id: this.$route.params.id,
        product_id: productId
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.getData()
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    },
    getData() {
      http1.get('/room/room-product',{
          params:{
            room_id: this.$route.params.id
          }
      }).then((response)=>{
        this.products = response.data.data
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
    // http1.get('product/get',{
    //   params:{
    //     show_all: true,
    //   }
    // }).then((response)=>{
    //   this.products = response.data.data
    // })
  }

}
</script>

<style lang="scss" scoped >

</style>
