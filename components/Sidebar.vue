<template>
  <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" :class="$store.state.sidebarMobile ? 'c-sidebar-show' : ''" id="sidebar">
    <div class="c-sidebar-brand d-lg-down-none" style="background:white !important; border-bottom:1px solid black;">
        <router-link to="/"><img style="width:118px;height:46px" class="c-sidebar-brand-full" :src="'/p-2-p-logo.png'" alt=""></router-link>
      <svg class="c-sidebar-brand-minimized" width="46" height="46" alt="CoreUI Logo">
        <use xlink:href="assets/brand/coreui.svg#signet"></use>
      </svg>
    </div>
    <ul class="c-sidebar-nav">
      <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/">
          <svg class="c-sidebar-nav-icon">
            <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
        </svg> Dashboard<span class="badge badge-info">NEW</span></router-link>
      </li>

      <template v-if="permission('staff-management')">
          <li class="c-sidebar-nav-title">Staff Management</li>
          <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'employee' ? 'c-show' : ''" v-if="permission('employee-menu')">
            <a @click="nav('employee')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
              <svg class="c-sidebar-nav-icon"><use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use></svg>
               Employee
            </a>
            <ul class="c-sidebar-nav-dropdown-items">
              <li class="c-sidebar-nav-item" v-if="permission('employee-list')"><router-link class="c-sidebar-nav-link" to="/employee"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
              <li class="c-sidebar-nav-item" v-if="permission('employee-create')"><router-link class="c-sidebar-nav-link" to="/employee/create"><span class="c-sidebar-nav-icon"></span> Add Employee</router-link></li>
            </ul>
          </li>
      </template>

      <template v-if="permission('role-management')">
        <li class="c-sidebar-nav-title">Role Management</li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'role' ? 'c-show' : ''" v-if="permission('role-menu')">
          <a @click="nav('role')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
            </svg>
            Role
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('role-list')"><router-link class="c-sidebar-nav-link" to="/role"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('role-create')"><router-link class="c-sidebar-nav-link" to="/role/create"><span class="c-sidebar-nav-icon"></span> Add Role</router-link></li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'permission' ? 'c-show' : ''" v-if="permission('permission-menu')">
          <a @click="nav('permission')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Permission</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('permission-list')"><router-link class="c-sidebar-nav-link" to="/permission"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
          </ul>
        </li>
      </template>

      <template v-if="permission('category-management')">
        <li class="c-sidebar-nav-title">Category Management</li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'category' ? 'c-show' : ''" v-if="permission('category-menu')">
          <a @click="nav('category')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
            </svg> Category</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('category-list')"><router-link class="c-sidebar-nav-link" to="/category"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('category-create')"><router-link class="c-sidebar-nav-link" to="/category/create"><span class="c-sidebar-nav-icon"></span> Create Category</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'theme' ? 'c-show' : ''" v-if="permission('theme-menu')">
          <a @click="nav('theme')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Style (Theme) </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('theme-list')"><router-link class="c-sidebar-nav-link" to="/theme"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('theme-create')"><router-link class="c-sidebar-nav-link" to="/theme/create"><span class="c-sidebar-nav-icon"></span> Create Style (Theme) </router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'composition' ? 'c-show' : ''" v-if="permission('composition-menu')">
          <a @click="nav('composition')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Looks (Composition) </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('composition-list')"><router-link class="c-sidebar-nav-link" to="/composition"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('composition-create')"><router-link class="c-sidebar-nav-link" to="/composition/create"><span class="c-sidebar-nav-icon"></span> Create Look (Composition)</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'room' ? 'c-show' : ''">
          <a @click="nav('room')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)" v-if="permission('room-menu')">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Room </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('room-list')"><router-link class="c-sidebar-nav-link" to="/room"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('room-create')"><router-link class="c-sidebar-nav-link" to="/room/create"><span class="c-sidebar-nav-icon"></span> Create Room</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'roomtag' ? 'c-show' : ''">
          <a @click="nav('roomtag')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Room Tag</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/room-tag"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/room-tag/create"><span class="c-sidebar-nav-icon"></span> Create Room Tag</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'buildingcat' ? 'c-show' : ''">
          <a @click="nav('buildingcat')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Building Category</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/building-category"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/building-category/create"><span class="c-sidebar-nav-icon"></span> Create Building Category</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'building' ? 'c-show' : ''">
          <a @click="nav('building')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Building</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/building"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/building/create"><span class="c-sidebar-nav-icon"></span> Create Building</router-link></li>
          </ul>
        </li>
      </template>

      <template v-if="permission('inventory-management')">
        <li class="c-sidebar-nav-title">Inventory Management</li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'product-category' ? 'c-show' : ''" v-if="permission('product-category-menu')">
          <a @click="nav('product-category')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Product Category</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('product-category-list')"><router-link class="c-sidebar-nav-link" to="/product-category"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('product-category-create')"><router-link class="c-sidebar-nav-link" to="/product-category/create"><span class="c-sidebar-nav-icon"></span> Add Product Category</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'product-subcategory' ? 'c-show' : ''" v-if="permission('product-subcategory-menu')">
          <a @click="nav('product-subcategory')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Product Subcategory </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('product-subcategory-list')"><router-link class="c-sidebar-nav-link" to="/product-subcategory"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('product-subcategory-create')"><router-link class="c-sidebar-nav-link" to="/product-subcategory/create"><span class="c-sidebar-nav-icon"></span> Add Product Subcategory</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'product' ? 'c-show' : ''" v-if="permission('product-menu')">
          <a @click="nav('product')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
          </svg> Product </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('product-list')"><router-link class="c-sidebar-nav-link" to="/product"><span class="c-sidebar-nav-icon"></span> Lists</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('product-create')"><router-link class="c-sidebar-nav-link" to="/product/create"><span class="c-sidebar-nav-icon"></span> Create Product</router-link></li>
          </ul>
        </li>

        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'order_management' ? 'c-show' : ''" v-if="permission('order-menu')">
          <a @click="nav('order_management')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
            <svg class="c-sidebar-nav-icon">
              <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-puzzle"></use>
            </svg> Order</a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="permission('new-order')"><router-link class="c-sidebar-nav-link" to="/order/new"><span class="c-sidebar-nav-icon"></span> New order</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('processing-order')"><router-link class="c-sidebar-nav-link" to="/order/processing"><span class="c-sidebar-nav-icon"></span> Processing Order</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('delivered-order')"><router-link class="c-sidebar-nav-link" to="/order/delivered"><span class="c-sidebar-nav-icon"></span> Delivered Order</router-link></li>
            <li class="c-sidebar-nav-item" v-if="permission('cancel-order')"><router-link class="c-sidebar-nav-link" to="/order/cancelled"><span class="c-sidebar-nav-icon"></span> Cancelled Order</router-link></li>
          </ul>
        </li>
      </template>

      <template v-if="permission('basic-setup')">
          <li class="c-sidebar-nav-title">Basic Setup</li>
          <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'appriciation' ? 'c-show' : ''" v-if="permission('appriciation-video-menu')">
            <a @click="nav('appriciation')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
              <svg class="c-sidebar-nav-icon">
                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
            </svg> Appriciation Video</a>
            <ul class="c-sidebar-nav-dropdown-items">
              <li class="c-sidebar-nav-item" v-if="permission('appriciation-video-list')"><router-link class="c-sidebar-nav-link" to="/appriciation"><span class="c-sidebar-nav-icon"></span>Lists</router-link></li>
              <li class="c-sidebar-nav-item" v-if="permission('appriciation-video-create')"><router-link class="c-sidebar-nav-link" to="/appriciation/create"><span class="c-sidebar-nav-icon"></span> Add Appriciation</router-link></li>
            </ul>
          </li>

          <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'delivery-system' ? 'c-show' : ''" v-if="permission('delivery-system-menu')">
            <a @click="nav('delivery-system')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
              <svg class="c-sidebar-nav-icon">
                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
            </svg> Delivery System</a>
            <ul class="c-sidebar-nav-dropdown-items">
              <li class="c-sidebar-nav-item" v-if="permission('delivery-system-list')"><router-link class="c-sidebar-nav-link" to="/delivery-system"><span class="c-sidebar-nav-icon"></span>Lists</router-link></li>
              <li class="c-sidebar-nav-item" v-if="permission('delivery-system-create')"><router-link class="c-sidebar-nav-link" to="/delivery-system/create"><span class="c-sidebar-nav-icon"></span> Add Delivery-system</router-link></li>
            </ul>
          </li>

          <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'subscribe-customer' ? 'c-show' : ''">
            <a @click="nav('subscribe-customer')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
              <svg class="c-sidebar-nav-icon">
                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
            </svg> Subscribed Customers</a>
            <ul class="c-sidebar-nav-dropdown-items">
              <li class="c-sidebar-nav-item"><router-link class="c-sidebar-nav-link" to="/subscribe-customer"><span class="c-sidebar-nav-icon"></span> Subscriber Lists</router-link></li>
            </ul>
          </li>

           <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'brand-partner' ? 'c-show' : ''" v-if="permission('brand-partner-menu')">
             <a @click="nav('brand-partner')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
               <svg class="c-sidebar-nav-icon">
                 <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
             </svg>Brand Partner</a>
             <ul class="c-sidebar-nav-dropdown-items">
               <li class="c-sidebar-nav-item" v-if="permission('brand-partner-list')"><router-link class="c-sidebar-nav-link" to="/brand-partner"><span class="c-sidebar-nav-icon"></span>Lists</router-link></li>
               <li class="c-sidebar-nav-item" v-if="permission('brand-partner-create')"><router-link class="c-sidebar-nav-link" to="/brand-partner/create"><span class="c-sidebar-nav-icon"></span>Create Brand Partner</router-link></li>
             </ul>
           </li>

           <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'hero-slider' ? 'c-show' : ''" v-if="permission('hero-slider-menu')">
             <a @click="nav('hero-slider')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
               <svg class="c-sidebar-nav-icon">
                 <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
             </svg>Hero Slider</a>
             <ul class="c-sidebar-nav-dropdown-items">
               <li class="c-sidebar-nav-item" v-if="permission('hero-slider-list')"><router-link class="c-sidebar-nav-link" to="/hero-slider"><span class="c-sidebar-nav-icon"></span>Lists</router-link></li>
               <li class="c-sidebar-nav-item" v-if="permission('hero-slider-create')"><router-link class="c-sidebar-nav-link" to="/hero-slider/create"><span class="c-sidebar-nav-icon"></span>Create Hero Slider</router-link></li>
             </ul>
           </li>

           <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'customer-story' ? 'c-show' : ''" v-if="permission('customer-story-menu')">
             <a @click="nav('customer-story')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
               <svg class="c-sidebar-nav-icon">
                 <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
             </svg>Customer Story</a>
             <ul class="c-sidebar-nav-dropdown-items">
               <li class="c-sidebar-nav-item" v-if="permission('customer-story-list')"><router-link class="c-sidebar-nav-link" to="/customer-story"><span class="c-sidebar-nav-icon"></span>Lists</router-link></li>
               <li class="c-sidebar-nav-item" v-if="permission('customer-story-create')"><router-link class="c-sidebar-nav-link" to="/customer-story/create"><span class="c-sidebar-nav-icon"></span>Create Customer Story</router-link></li>
             </ul>
           </li>

      </template>

      <template v-if="permission('appointment-management')">
         <li class="c-sidebar-nav-title" >Appointment Management</li>
         <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" :class="activeNav == 'appointment' ? 'c-show' : ''" v-if="permission('appointment-menu')">
           <a @click="nav('appointment')" class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(0)">
             <svg class="c-sidebar-nav-icon">
               <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cursor"></use>
           </svg>Appointment</a>
           <ul class="c-sidebar-nav-dropdown-items">
             <li class="c-sidebar-nav-item" v-if="permission('appointment-list')"><router-link class="c-sidebar-nav-link" to="/appointment"><span class="c-sidebar-nav-icon"></span>Lists</router-link></li>
             <li class="c-sidebar-nav-item" v-if="permission('appointment-create')"><router-link class="c-sidebar-nav-link" to="/appointment/create"><span class="c-sidebar-nav-icon"></span>Create Appointment</router-link></li>
           </ul>
         </li>
      </template>
    </ul>
    <button type="button" name="button" class="btn btn-info" v-if="$store.state.sidebarMobile" @click="sidebarMobile(false)">Hide</button>
    <button class="c-sidebar-minimizer c-class-toggler"  type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
  </div>
</template>

<script>
export default {
    data () {
      return {
        activeNav: ''
      }
  },
  methods: {
    sidebarMobile(status){
        this.$store.commit('sidebar',status)
    },
    nav: function (name) {
        if (this.activeNav == name) {
            this.activeNav = ''
        }else{
            this.activeNav = name
        }

    }
  }

}
</script>

<style lang="css" scoped >

</style>
