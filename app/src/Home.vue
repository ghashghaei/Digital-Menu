<template>

<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Dishes</h5>
    <h6 class="card-subtitle mb-2 text-muted"> Manage Dishes  </h6>
    <p class="card-text"> You can manage dishes, add, edit or remove dishes in this menue </p>

    <router-link class="card-link" to="/dishes">Add Or Manage all dishes</router-link>
  </div>
</div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>