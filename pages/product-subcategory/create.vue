<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Product Subcategory Entry</div>
            <div class="card-body">

                <div class="form-row">
                    <div class="form-group col-md-12">
                      <label>Product Subcategory Name</label><span class="text-danger"> *</span>
                      <input type="text" class="form-control" placeholder="name" v-model="name">
                    </div>

                    <div class="form-group col-md-12">
                      <label>Product Category</label><span class="text-danger"> *</span>
                      <select class="form-control" v-model="product_category_id">
                        <option value="">Select Product Category</option>
                        <option v-for="product_category in product_categories" :key="product_category.id" :value="product_category.id">{{product_category.name}}</option>
                      </select>
                    </div>

                    <div class="form-group col-md-12">
                      <label>Details</label><span class="text-danger"> *</span>
                      <textarea class="form-control" v-model="details" rows="3"></textarea>
                    </div>

                    <div class="form-group col-md-12">
                      <label>Status</label><span class="text-danger"> *</span>
                      <select class="form-control" v-model="status">
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </select>
                    </div>
                </div>

            </div>
            <div class="card-footer" style="background-color:rgba(0,0,0,.03)">
                <button type="button" class="btn btn-success float-right" @click="submit()">Create</button>
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
          {name: 'Product Subcategory',link: '/product-subcategory'},
          {name: 'Product Subcategory Entry',link: ''},
      ],
      name: '',
      product_category_id: '',
      details: '',
      status: '',
      product_categories:'',
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Product Subcategory name is required',{duration:3000})
        return
      }else if (this.product_category_id == '') {
        this.$toast.error('Product Category is required',{duration:3000})
        return
      }else if(this.details == ''){
        this.$toast.error('Product Subcategory Details is required',{duration:3000})
        return
      }else if(this.status == ''){
        this.$toast.error('Status is required',{duration:3000})
        return
      }

      http1.post('/product-subcategory/create',{
        name: this.name,
        product_category_id: this.product_category_id,
        details: this.details,
        status: this.status
      }).then((response)=>{
        if(response.data.msg.success){
          this.$toast.success(response.data.msg.message,{duration: 3000})
          this.$router.push('/product-subcategory')
        }else{
          this.$toast.error(response.data.msg.message,{duration: 3000})
        }
      })

    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },

  mounted() {
    http1.get('product-category/get',{
      params: {
        show_all: true
      }
    }).then((res)=>{
       this.product_categories = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped >

</style>
