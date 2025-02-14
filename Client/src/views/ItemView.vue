<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);
const newItem = ref({ name: '', price: 0, description: '' });

onMounted(async () => {
  await fetchItems();
});

const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/items');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addItem = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/items', newItem.value);
    items.value.push(response.data);
    newItem.value = { name: '', price: 0, description: '' };
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5001/api/items/${id}`);
    items.value = items.value.filter(item => item._id !== id);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const updateItem = async () => {
  try {
    const response = await axios.put(`http://localhost:5001/api/items/${editItem.value._id}`, editItem.value);
    const index = items.value.findIndex(item => item._id === editItem.value._id);
    items.value[index] = response.data;
    editItem.value = null;
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

const startEdit = (item) => {
  editItem.value = { ...item };
};
</script>

<template>
  <q-page class="flex flex-center q-pa-md" style="height: 100vh; background-color: #333;">
    <div class="q-mx-auto" style="max-width: 600px; width: 100%;">
      <h1>Items</h1>
      <ul>
        <li v-for="item in items" :key="item._id">
          {{ item.name }} - {{ item.price }} - {{ item.description }}
          <button @click="startEdit(item)">Edit</button>
          <button @click="deleteItem(item._id)">Delete</button>
        </li>
      </ul>
      <h2 v-if="editItem">Edit Item</h2>
      <form v-if="editItem" @submit.prevent="updateItem">
        <input v-model="editItem.name" placeholder="Name" required />
        <input v-model="editItem.price" type="number" placeholder="Price" required />
        <input v-model="editItem.description" placeholder="Description" />
        <button type="submit">Update Item</button>
      </form>
      <h2>Add New Item</h2>
      <form @submit.prevent="addItem">
        <input v-model="newItem.name" placeholder="Name" required />
        <input v-model="newItem.price" type="number" placeholder="Price" required />
        <input v-model="newItem.description" placeholder="Description" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  </q-page>
</template>

<style scoped>


</style>