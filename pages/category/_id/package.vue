<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left"> <strong>{{categoryName}}</strong> Package List</p>
          <router-link to="/package/create" type="button" name="button" class="float-right btn btn-info"> Add New Package </router-link>
         </div>
         <div class="card-body">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                    <th>Id</th>
                     <th>Name</th>
                     <th>Estimate price</th>
                     <th>Category</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="pk in packages"  :key="pk.id">
                     <td>{{pk.id}}</td>
                     <td>{{pk.name}}</td>
                     <td>{{pk.estimate_price}}</td>
                     <td>{{pk.category ? pk.category.name : ''}}</td>
                     <td>
                       <span v-if="pk.is_active == 1" class="badge badge-success">Active</span>
                       <span v-else class="badge badge-danger">Inactive</span>
                     </td>
                     <td>
                       <router-link :to="`/package/${pk.id}/edit`" type="button" name="button" class="btn btn-info">Edit</router-link>
                       <router-link :to="`/package/${pk.id}/products`" type="button" name="button" class="btn btn-info">Products</router-link>
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
          {name: 'Category',link: '/category'},
          {name: 'Package',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      packages: [],
      categoryName: ''
    }
  },
  methods: {
    getData() {
      http1.get('category/package',{
        params:{
          category_id: this.$route.params.id,
          page: this.page,
          per_page: this.per_page
        }
      }).then((response)=>{
        this.packages = response.data.data.data
        this.totalPage = response.data.data.last_page
        this.fromq = response.data.data.from
        this.toq = response.data.data.to
        this.totalq = response.data.data.total
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

    http1.get('category/get',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
      this.categoryName = response.data.data.name
    })
  }

}
</script>

<style lang="scss" scoped >

</style>
