<template>
  <div class="row">
    <!-- filter box -->
    <div class="col-sm-12 col-md-12 col-lg-12">
       <div class="card" style="min-height:250px">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">Category Filter</div>
         <div class="card-body">
             <div class="form-row">
               <div class="form-group col-md-6">
                 <label for="name">Category Name</label>
                 <input type="text" class="form-control" placeholder="name" v-model="name">
               </div>
               <div class="form-group col-md-6">
                 <label >Status</label>
                 <select class="form-control" v-model="status">
                   <option value="">Select Status</option>
                   <option value="1">Active</option>
                   <option value="0">Inactive</option>
                 </select>
               </div>
            </div>
         </div>
         <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
             <button type="button" class="btn btn-success float-left">Filter</button>
         </div>
       </div>
    </div>
    <!-- end filter box -->
   <div class="col-lg-12">
      <div class="card" style="min-height:400px;">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">Category List</p>
          <router-link to="/category/create" type="button" name="button" class="float-right btn btn-info"> Add New Category </router-link>
         </div>
         <div class="card-body p-0">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Category Name</th>
                     <th>Category Slug</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="category in categories"  :key="category.id">
                     <td>{{category.id}}</td>
                     <td>{{category.name}}</td>
                     <td>{{category.slug}}</td>

                     <td>
                       <span v-if="category.is_active == 1" class="badge badge-success">Active</span>
                       <span v-else class="badge badge-danger">Inactive</span>
                     </td>
                     <td>
                       <router-link :to="`/category/${category.id}/edit`" type="button" name="button" class="btn btn-info btn-sm">Edit</router-link>
                       <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(category.id)">Delete</button>
                       <!-- <router-link :to="`/category/${category.id}/package`" type="button" name="button" class="btn btn-info">Package</router-link> -->
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
             <p>Showing {{fromq}} - {{toq}} from {{totalq}} Category </p>
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
          {name: 'Category',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 10,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      categories: []
    }
  },
  methods: {
    getData() {
      http1.get('category/get',{
        params:{
          page: this.page,
          per_page: this.per_page
        }
      }).then((response)=>{
        this.categories = response.data.data.data
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
      },
    TheDelete(id){
      http1.post('/category/delete',{
          id: id,
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.getData();
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

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
