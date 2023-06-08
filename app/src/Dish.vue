<template>
    <form @submit.prevent="submitForm" ref="myForm">

        <div class="form-group">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" v-model="dish._id" disabled>
        </div>
        <div class="form-group">
            <label for="datetime">Created Datetime</label>
            <input type="text" class="form-control" id="datetime" v-model="dish._Created" disabled>
        </div>
        <div class="form-group">
            <label for="changeDatetime">Last Changed Datetime</label>
            <input type="text" class="form-control" id="changeDatetime" v-model="dish._Changed" disabled>
        </div>


        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="dish.name" placeholder="Enter name" required>
        </div>
        <div class="form-group">
            <label for="description">Short Description</label>
            <textarea class="form-control" id="description" v-model="dish.shortDescription" rows="3"
                placeholder="Enter short description" required></textarea>
        </div>
        <div class="form-group">
            <label for="price">Price</label>
            <input type="number" class="form-control" id="price" v-model="dish.price" placeholder="Enter price" required>
        </div>
        <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" id="category" v-model="dish.category" required>
                <option value="">Choose...</option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
            </select>
        </div>
        <div class="form-group">
            <label for="availability">Availability</label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="breakfast" v-model="dish.availableAt.breakfast">
                <label class="form-check-label" for="breakfast">
                    Breakfast
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="lunch" v-model="dish.availableAt.lunch">
                <label class="form-check-label" for="lunch">
                    Lunch
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="dinner" v-model="dish.availableAt.dinner">
                <label class="form-check-label" for="dinner">
                    Dinner
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="weekdays" v-model="dish.availableAt.weekdays">
                <label class="form-check-label" for="weekdays">
                    Weekdays
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="weekends" v-model="dish.availableAt.weekends">
                <label class="form-check-label" for="weekends">
                    Weekends
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="deactivate">IsActive</label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="deactivate" v-model="dish.isActive">
                <label class="form-check-label" for="deactivate">
                    Is this dish Active?
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="wait-time">Wait Time (minutes)</label>
            <input type="number" class="form-control" id="wait-time" v-model="dish.waitTime" placeholder="Enter wait time"
                required>
        </div>
        <button type="submit" class="btn btn-primary w100">
            {{ dish._id == '' ? 'Save new Dish' : 'Edit Existing Dish' }}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>content-save-outline</title>
                <path
                    d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z" />
            </svg>
        </button>
    </form>
    <br>
    <router-link to="/dishes">
        <button type="button" class="btn btn-warning">
            Back
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>arrow-left</title>
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
        </button>
    </router-link>
</template>
  
<script>
import api from './service.js';

export default {
    data() {
        return {
            dish: {
                _id: '',
                name: '',
                _Created: '',
                _Changed: '',
                shortDescription: '',
                price: '',
                category: '',
                availableAt: {
                    breakfast: false,
                    lunch: false,
                    dinner: false,
                    weekdays: false,
                    weekends: false
                },
                isActive: false,
                waitTime: ''
            }
        }
    },
    async created() {
        const dishId = this.$route.params.id;
        if (dishId && dishId != '')
            try {
                let res = (await api.getDishById(dishId)).data;
                if (!res) {
                    this.$toast.error('cannot find this ' + dishId + ', please dont try on this id', { duration: 5000, position: 'top-right' });
                    this.$router.push('/dishes')
                }
                else {
                    this.dish = res
                }

            } catch (error) {
            }

    },
    methods: {
        async submitForm(event) {

            try {
                let res = (await api.saveDish(this.dish)).data;
                this.$toast.success('successfully saved!', { duration: 5000, position: 'top-right' });
                this.dish._Changed = res._Changed;
                this.dish._Created = res._Created;
                this.dish._id = res._id;

                console.log(res)
            } catch (error) {

            }

        }
    }
}
</script>
<style scoped>
.form-group{
    margin: 0.75rem;
}
.form-group label{
    padding: 0.25rem;
}
.form-check label{
    padding: 0;
}
</style>