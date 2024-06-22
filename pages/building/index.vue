<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">Building List</p>
          <router-link to="/building/create" type="button" name="button" class="float-right btn btn-info"> Add New Building </router-link>
         </div>
         <div class="card-body p-0">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                    <th>Id</th>
                     <th>Name</th>
                     <th>Short Description</th>
                     <th>Slug</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="building in buildings"  :key="building.id">
                     <td>{{building.id}}</td>
                     <td>{{building.name}}</td>
                     <td>{{building.short_description}}</td>
                     <td>{{building.slug}}</td>
                     <td>
                       <span v-if="building.status == 1" class="badge badge-success">Active</span>
                       <span v-else class="badge badge-danger">Inactive</span>
                     </td>
                     <td>
                       <router-link :to="`/building/${building.id}/edit`" type="button" name="button" class="btn btn-info btn-sm">Edit</router-link>
                       <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(building.id)">Delete</button>
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
             <p>Showing {{fromq}} - {{toq}} from {{totalq}} Building </p>
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
          {name: 'Building List',link: ''},
      ],

      per_page: this.$route.query.per_page ? this.$route.query.per_page : 10,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      buildings: [],

    }
  },
  methods: {
    getData() {
      http1.get('building/get',{
        params:{
          page: this.page,
          per_page: this.per_page
        }
      }).then((response)=>{
        this.buildings = response.data.data.data
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
      http1.post('/building/delete',{
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
