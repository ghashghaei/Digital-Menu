<template>
  <router-link to="/dish">
    <button type="button" class="btn btn-primary">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>plus</title>
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
      Add
    </button>
  </router-link>
  <br />
  <br />
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr class="table-success">
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">price</th>
          <th scope="col">category</th>
          <th scope="col">availability?</th>
          <th scope="col">IsActive?</th>
          <th scope="col">WaitTime?</th>
          <th scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(dish, index) in dishes" :key="index">

          <tr>
            <td>{{ dish._id }}</td>
            <td>{{ dish.name }}</td>
            <td>{{ dish.shortDescription }}</td>
            <td>{{ dish.price.toLocaleString() }}</td>
            <td>{{ dish.category }}</td>
            <td>



              <span v-if="dish.availableAt.breakfast === true" class="badge bg-success">breakfast</span>
              <span v-if="dish.availableAt.lunch === true" class="badge bg-success">lunch</span>
              <span v-if="dish.availableAt.dinner === true" class="badge bg-success">dinner</span>
              <span v-if="dish.availableAt.weekdays === true" class="badge bg-success">weekdays</span>
              <span v-if="dish.availableAt.weekends === true" class="badge bg-success">weekends</span>




            </td>
            <td>
              <svg v-if="!dish.isActive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>close</title>
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
              <svg v-if="dish.isActive === true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>check</title>
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
            </td>
            <td>{{ dish.waitTime }}</td>
            <td>
              <router-link class="card-link" :to="'/dish/' + dish._id">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>pencil</title>
                  <path
                    d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </router-link>

              <span class="card-link" @click="toDeleteItem = dish; deleteModal = true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>delete</title>
                  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </span>
            </td>
          </tr>
        </template>

      </tbody>
      <tfoot>
        <tr class="table-success">
          <td colspan="10">Total Count: {{ dishes.length }}</td>
        </tr>
      </tfoot>
    </table>




    <div>

      <modal :show-modal="deleteModal" @update:show-modal="deleteModal = $event">

        <h2>Delete Confirm</h2>

        <h4>
          Are you sure to delete dish '{{ toDeleteItem.name }}' with id {{ toDeleteItem._id }}
        </h4>
        <div>
          <button type="button" class="btn btn-danger" @click="removeToDeleteItem()">
            Confirm Delete
          </button>
          <button type="button" class="btn btn-warning" @click="deleteModal = false">
            Cancel
          </button>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import api from './service.js';
import modal from './modal.vue';
export default {
  data() {
    return {
      dishes: [],
      deleteModal: false,
      toDeleteItem: {},
    };
  },
  components: {
    modal,
  },
  async created() {
    try {
      this.dishes = (await api.getDishes()).data;
      console.error(this.dishes);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {

    async removeToDeleteItem() {
      try {
        let res = (await api.deleteDish(this.toDeleteItem._id)).data;
        this.dishes = (await api.getDishes()).data;
        this.deleteModal = false;
        this.$toast.success('successfully deleted!', { duration: 5000, position: 'top-right' });

      } catch (error) {
        console.error(error);
      }
    }

  },
  name: 'Dishes'
}
</script>
  
<style scoped>
table{
  min-width:600px;
}
th, td {
  font-size: 80%;
}
svg{
  width: 20px;
}
@media only screen and (max-width: 768px){
  th, td {
  font-size: 60%;
}
svg{
  width: 15px;
}
}
</style>