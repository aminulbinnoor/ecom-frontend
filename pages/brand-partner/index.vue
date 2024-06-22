<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">Brand Partner List</p>
          <router-link to="/brand-partner/create" type="button" name="button" class="float-right btn btn-info">Add Brand Partner Image</router-link>
         </div>
         <div class="card-body p-0">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Image</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="bpartner in bpartners"  :key="bpartner.id">
                     <td style="width:10%">{{bpartner.id}}</td>
                     <td style="width:30%">{{bpartner.name}}</td>
                     <td style="width:5%"><img :key="" :src="cdn+'/'+bpartner['images'][0].path+'hdpi/'+bpartner['images'][0].file" alt="" height="40px" width="40px"></td>
                     <td style="width:20%">
                       <span v-if="bpartner.status == 1" class="badge badge-success"> Active</span>
                       <span v-else="" class="badge badge-danger"> InActive</span>
                     </td>

                     <td style="width:20%">
                       <router-link :to="`/brand-partner/${bpartner.id}/edit`" type="button" name="button" class="btn btn-info btn-sm">Edit</router-link>
                       <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(bpartner.id)">Delete</button>
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
             <p>Showing {{fromq}} - {{toq}} from {{totalq}} Brand Partner</p>
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
          {name: 'Brand Partner List',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 10,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      bpartners: [],
    }
  },
  methods: {
    getData() {
      http1.get('brand-partner/get',{
        params:{
          page: this.page,
          per_page: this.per_page
        }
      }).then((res)=>{
        this.bpartners = res.data.data.data
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
    },
    TheDelete(id){
      http1.post('/brand-partner/delete',{
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
