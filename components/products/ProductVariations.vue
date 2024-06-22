<template>
  <div class="row">
   <div class="col-lg-12">
      <div class="card">
         <div class="card-header" style="background-color:rgba(0,0,0,.03)">
          <p class="float-left">Products Variations</p>
         </div>
         <div class="card-body p-0">
             <div class="form-row">
               <div class="col-md-12 p-1" style="">
                   <div class="form-group col-md-12 ">
                     <div class="input-group mt-2" v-for="(sp,index) in variations"  :key="sp.id">
                       <input type="text" class="form-control" placeholder="type" v-model="sp.type" style="text-transform: lowercase !important">
                       <input type="text" class="form-control" placeholder="name" v-model="sp.name">
                       <input type="text" class="form-control" placeholder="value" v-model="sp.value">
                       <div class="input-group-append">
                           <div class="btn-group" role="group" aria-label="Basic example">
                               <button type="button" class="btn btn-danger btn-sm" :disabled="index == 0"  @click="removeNew(index)">X</button>
                               <button type="button" class="btn btn-info btn-sm" :disabled="index+1 !== variations.length"   @click="addNew()">+</button>
                          </div>
                       </div>
                     </div>
                   </div>
               </div>
            </div>
         </div>
         <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
             <button type="button" class="btn btn-success float-right" @click="submit()">Save</button>
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
          {name: 'Home', link: '/'},
          // {name: 'Product Update', link: `/product/${this.$route.params.id}/edit`},
          {name: 'Product', link: '/product'},
          {name: 'Product Variation', link: ''},
      ],
      variations: [],
    }
  },

  methods: {
    submit() {
      http1.post('/product/set-variations',{
        id: this.$route.params.id,
        variations: this.variations,

      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })
    },

    addNew(){
      this.variations.push({type:'', name: '',value: ''})
    },
    removeNew(i){
      this.variations.splice(i,1)
    }
  },

  mounted: function () {
    http1.get('/product/get-product-variations',{
      params:{
        id: this.$route.params.id
      }
    }).then((response)=>{
        if(response.data.data.length > 0){
            this.variations = response.data.data
        }else{
            this.variations.push({type:'', name: '',value: ''})
        }
    })
  },

  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
  // test

}
</script>

<style lang="css" scoped >

</style>
