<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
             <p class="float-left">Consultant Assign</p>
         </div>
         <div class="card-body">
           <div class="form-row align-items-center">
             <div class="col-md-1">
               <label>Assing To</label> <span class="text-danger"> *</span>
             </div>
              <div class="col-md-10">
                <select class="form-control" v-model="admin_id">
                  <option value="">Select Consultant</option>
                  <option v-for="assign_stuff in assign_stuffs"  :key="assign_stuff.id" :value="assign_stuff.id">{{assign_stuff.first_name}}</option>
                </select>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-success mb-2" @click="submit()">Save</button>
              </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-12">
     <div class="card" v-if="get_assign_stuffs.length > 0">
        <div class="card-header" style="background-color:rgba(0,0,0,.03)">
         <p class="float-left"> Assign Person List</p>
         <!-- <router-link to="/package/create" type="button" name="button" class="float-right btn btn-info"> Add Product </router-link> -->
        </div>
        <div class="card-body">
           <table class="table table-responsive-sm table-bordered table-striped table-hover table-sm">
              <thead>
                 <tr>
                   <th style="width:7%">Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                 </tr>
              </thead>
              <tbody>

                 <tr  v-for="get_assign_stuff in get_assign_stuffs"  :key="get_assign_stuff.id">
                    <td>{{get_assign_stuff.id}}</td>
                    <td>{{get_assign_stuff.first_name}}</td>
                    <td>{{get_assign_stuff.email}}</td>
                    <td>{{get_assign_stuff.mobile}}</td>
                    <td>
                     <button type="button" class="btn btn-danger btn-sm" @click="TheDelete(get_assign_stuff.id)">Delete</button>
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
             <p>Showing {{fromq}} - {{toq}} from {{totalq}} Assign Stuff </p>
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
          {name: 'Appointment',link: '/appointment'},
          {name: 'Assign Person',link: ''},
      ],
      per_page: this.$route.query.per_page ? this.$route.query.per_page : 5,
      page: this.$route.query.page ? this.$route.query.page : 1,
      totalPage: 1,
      fromq: 0,
      toq: 0,
      totalq: 0,
      assign_stuffs: '',
      get_assign_stuffs: [],
      admin_id: '',
      currentTabIndex: 1
    }
  },
  methods: {
    toggleTabIndex(index){
      this.currentTabIndex = index;
      this.assignStuffLists();
    },
    submit() {
      if (this.admin_id == '') {
        this.$toast.error('Assign to is required',{duration:3000})
        return
      }
      http1.post('/appointment/set-assign-stuff',{
        appointment_id: this.$route.params.id,
        admin_id: this.admin_id,
      }).then((res)=>{
        if(res.data.msg.success){
          this.admin_id = ''
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.getAssignStuff()
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })
    },

    assignStuffLists(){
      http1.get('/appointment/assign-stuff-lists',{
        params: {
          show_all: true
        }
      }).then((res)=>{
         this.assign_stuffs = res.data.data
      })
    },

    getAssignStuff(){

      http1.get('/appointment/get-assign-stuff',{
        params: {
          appointment_id: this.$route.params.id
        }
      }).then((res)=>{
         this.get_assign_stuffs = res.data.data
      })
    },
    TheDelete(get_assign_stuff){
      http1.post('/appointment/delete-assign-stuff',{
        appointment_id: this.$route.params.id,
        admin_id: get_assign_stuff
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.getAssignStuff()
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })
    },
    clickCallback: function (d) {
        this.page = d
        this.$router.push({query:{page:this.page}})
        this.getAssignStuff()
    }
  },
  watch: {
    per_page: function () {
      this.page = 1
      this.$router.push({query:{page:this.page,per_page: this.per_page}})
      this.getAssignStuff()
    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted(){
    this.assignStuffLists()
    this.getAssignStuff()
  }
}

</script>
