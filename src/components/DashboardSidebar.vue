<template>
  <div>
      <p class="text-sm grey--text text--darken-2 px-5 pt-6">DASHBOARD</p>
        <router-link to="/order-list" class="dashboard-nav-link px-4">
            <div class="d-flex align-center">
                <img v-svg-inline class="icon mr-2" src="@/assets/images/icons/bag.svg" alt="" />
                <span>Orders</span>
            </div>
            <p class="mb-0">5</p>  
        </router-link>
        
        <router-link to="/wishlist" class="dashboard-nav-link px-4">
            <div class="d-flex align-center">
                <img v-svg-inline class="icon mr-2" src="@/assets/images/icons/heart.svg" alt="" />
                <span>Wishlist</span>
                
            </div>
            <p class="mb-0">19</p>  
        </router-link>
        <router-link  to="/all-tickets" class="dashboard-nav-link px-4">
            <div class="d-flex align-center">
                <img v-svg-inline class="icon mr-2" src="@/assets/images/icons/customer-service.svg" alt="" />
                <span>Support Tickets</span>
            </div>
            <p class="mb-0">1</p>  
        </router-link >
        <p class="text-sm grey--text text--darken-2 px-5 pt-6">ACCOUNT SETTINGS</p>
        <router-link to="/view-profile" class="dashboard-nav-link px-4">
            <div class="d-flex align-center">
                <img v-svg-inline class="icon mr-2" src="@/assets/images/icons/user.svg" alt="" />
                <span>Profile Info</span>
            </div>
            <p class="mb-0">3</p>  
        </router-link>
        <router-link to="/list-address" class="dashboard-nav-link px-4">
            <div class="d-flex align-center">
                <img v-svg-inline class="icon mr-2" src="@/assets/images/icons/pin.svg" alt="" />
                <span>Addresses</span>
            </div>
            <p class="mb-0">16</p>  
        </router-link>
        <router-link to="/checkout-alternative" class="dashboard-nav-link px-4">
            <div class="d-flex align-center">
                <img v-svg-inline class="icon mr-2" src="@/assets/images/icons/credit-card.svg" alt="" />
                <span>Payment Methods</span>
            </div>
            <p class="mb-0">4</p>  
        </router-link>
  </div>
</template>

<script>

</script>

<style lang="scss">
    .dashboard-nav-link {
        color: rgb(125, 135, 156) !important;
        text-decoration: none;
        align-items: center;
        display: flex;
        justify-content: space-between;
        border-left: 4px solid #fff;
        margin-bottom: 20px;
        svg {
            width: 20px;
        }
        &.router-link-exact-active {
            color: #D23F57 !important;
            border-left: 4px solid #D23F57;
        }
        &:hover {
            color: #D23F57 !important;
            border-left: 4px solid #D23F57;
        }
    }
</style>