<template>
  <div class="fade-in">
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="card" style="min-height:250px">
            <div class="card-header" style="background-color:rgba(0,0,0,.03)">Create Delivery System</div>
              <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4"> Order Id</label>
                      <input type="text" class="form-control" placeholder="order id" v-model="order_id">
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputEmail4"> Courier Name</label>
                      <input type="text" class="form-control" placeholder="courier name" v-model="name">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputPassword4">Address</label>
                      <textarea class="form-control" placeholder="address.." v-model="address" rows="3"></textarea>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputAddress">Stage</label>
                      <input type="text" class="form-control" placeholder="stage" v-model="stage">
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
          {name: 'Home', link: '/'},
          {name: 'Delivery Systems', link: '/delivery-system'},
          {name: 'Delivery Systems Create', link: ''},
      ],
      name: '',
      order_id: '',
      address: '',
      stage: '',
    }
  },
  methods: {
    submit() {
      if(this.name == ''){
        this.$toast.error('Name is required',{duration:3000})
        return
      }else if (this.order_id == '') {
        this.$toast.error('Order Id is required',{duration:3000})
        return
      }else if (this.address == '') {
        this.$toast.error('Address is required',{duration:3000})
        return
      }

      http1.post('/delivery-system/create',{
        name: this.name,
        order_id: this.order_id,
        address: this.address,
        stage: this.stage
      }).then((res)=>{
        if(res.data.msg.success){
          this.$toast.success(res.data.msg.message,{duration: 3000})
          this.$router.push('/delivery-system')
        }else{
          this.$toast.error(res.data.msg.message,{duration: 3000})
        }
      })

    }
  },
  created () {
      this.$store.commit('setBreadcrumbs',this.breadcrumb)
  },
}
</script>

<style lang="scss" scoped >

</style>
