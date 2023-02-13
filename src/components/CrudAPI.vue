<template>
  <div>
    <h1>CRUD App</h1>
    <form @submit.prevent="createItem">
      <input type="text" v-model="newItem.name" placeholder="Name" />
      <button type="submit">Create</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>{Update}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <input type="text" v-model="item.name" @input="updateItem(item)" />
          </td>
          <td>
            <button @click="deleteItem(item)">
              {{ loading ? "loading" : "Delete" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newItem: { name: '' },
      loading: false,
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      const response = await fetch('http://localhost:5000/items');
      this.items = await response.json();
    },

async createItem() {
      const response = await fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newItem)
      });
      const item = await response.json();
      this.items.push(item);
      this.newItem = { name: '' };
    },
    async updateItem(item) {
      const response = await fetch(`http://localhost:5000/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const updatedItem = await response.json();
      const itemIndex = this.items.findIndex(i => i.id === item.id);
      this.items.splice(itemIndex, 1, updatedItem);
    },
    async deleteItem(item) {
        this.loading = true;
       try{
        await fetch(`http://localhost:5000/items/${item.id}`, {
        method: 'DELETE'
      });
       }catch(err){
        console.log(err, "err")
       }
      this.loading = false;
      this.getItems();
    //   const itemIndex = this.items.findIndex(i => i.id === item.id);
    //   this.items.splice(itemIndex, 1);
    }
  }
};
</script>
