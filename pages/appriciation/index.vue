<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">Appriciation List</p>
          <router-link to="/appriciation/create" type="button" name="button" class="float-right btn btn-info">Add Appriciation Video</router-link>
         </div>
         <div class="card-body p-0">
            <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Client Name</th>
                     <th>Address</th>
                     <th>Video Type</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>

                  <tr  v-for="appriciation in appriciations"  :key="appriciation.id">
                     <td>{{appriciation.id}}</td>
                     <td>{{appriciation.client_name}}</td>
                     <td>{{appriciation.address}}</td>
                     <td>{{appriciation.type}}</td>
                     <td>
                       <span v-if="appriciation.status == 1" class="badge badge-success"> Active</span>
                       <span v-else="" class="badge badge-danger"> InActive</span>
                     </td>

                     <td>
                       <router-link :to="`/appriciation/${appriciation.id}/edit`" type="button" name="button" class="btn btn-info btn-sm">Edit</router-link>
                       <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(appriciation.id)">Delete</button>
                       <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal" @click="showVideo(appriciation.url)">
                         Video
                       </button>
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
             <p>Showing {{fromq}} - {{toq}} from {{totalq}} appriciation </p>
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
            <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
                <iframe width="465" height="400" :src="selectedVideo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
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
          {name: 'Appriciation List',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 10,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      appriciations: [],
      selectedVideo: '',
    }
  },
  methods: {
    getData() {
      http1.get('appriciation/get',{
        params:{
          page: this.page,
          per_page: this.per_page
        }
      }).then((res)=>{
        this.appriciations = res.data.data.data
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
      http1.post('/appriciation/delete',{
          id: id,
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.getData();
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })
    },
    showVideo(url){
      this.selectedVideo = url;
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
