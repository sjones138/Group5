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
</script>

<template>
  <div>
    <h1>Items</h1>
    <ul>
      <li v-for="item in items" :key="item._id">{{ item.name }} - {{ item.price }} - {{ item.description }}</li>
    </ul>
    <h2>Add New Item</h2>
    <form @submit.prevent="addItem">
      <input v-model="newItem.name" placeholder="Name" required />
      <input v-model="newItem.price" type="number" placeholder="Price" required />
      <input v-model="newItem.description" placeholder="Description" />
      <button type="submit">Add Item</button>
    </form>
  </div>
</template>