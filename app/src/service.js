const baseUrl = 'http://localhost:9000';
import {useToast} from 'vue-toast-notification';

export default {


async error(response){
  const $toast = useToast();
 $toast.error('something wrong with calling api!',{duration:5000,position: 'bottom-left'});
  throw new Error((await response.json()).message);
},
async ok(response){
  const $toast = useToast();
 $toast.success('api call successfully done!!',{duration:5000,position: 'bottom-left'});
return await response.json();
},

  async getDishes() {
    const response = await fetch(`${baseUrl}/dishes`);
    if (!response.ok) await this.error(response) 
    return await this.ok(response)
  },

  async clearDishes() {
    const response = await fetch(`${baseUrl}/dishes/clear`, { method: 'GET' });
    if (!response.ok) await this.error(response) 
    return await this.ok(response)
  },

  async getDishById(id) {
    const response = await fetch(`${baseUrl}/dishes/${id}`);
    if (!response.ok) await this.error(response) 
    return await this.ok(response)
  },

  async saveDish(dish) {
    const url = dish._id ? `${baseUrl}/dishes` : `${baseUrl}/dishes`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dish),
    });
    if (!response.ok) await this.error(response) 
    return await this.ok(response)
  },

  async deleteDish(id) {
    const response = await fetch(`${baseUrl}/dishes/${id}`, { method: 'DELETE' });
    if (!response.ok) await this.error(response) 
    return await this.ok(response)
  },
};