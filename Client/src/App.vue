<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { QTable } from 'quasar';

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

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
  { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true }
];
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1 class="py-20">Items</h1>
      <div style="padding: 20px 0;">
        <q-table
            title="Items Available"
            :rows="items"
            :columns="columns"
            row-key="name"
        />
      </div>
      <h2>Add New Item</h2>
      <form @submit.prevent="addItem">
        <input v-model="newItem.name" placeholder="Name" required />
        <input v-model="newItem.price" type="number" placeholder="Price" required />
        <input v-model="newItem.description" placeholder="Description" />
        <button type="submit">Add Item</button>
      </form>
    </v-col>
  </v-row>
</template>