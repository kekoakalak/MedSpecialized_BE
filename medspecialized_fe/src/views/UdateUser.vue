<template>
  <div>
    <h3>{{ formTitle }}</h3> <!-- Dynamically change the form title -->

    <form @submit.prevent="updateUser">
      <input v-model="user.email" placeholder="Email" required />
      <input v-model="user.name" placeholder="Name" required />
      <select v-model="user.role">
        <option value="Admin">Admin</option>
        <option value="Trainer">Trainer</option>
        <option value="Trainee">Trainee</option>
      </select>

      <select v-model="user.status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <input
        v-model="user.password"
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit">
        Update User
      </button>
    </form>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  data() {
    return {
      user: {
        email: '',
        name: '',
        role: '',
        status: '',
        password: ''
      },
      formTitle: 'Update User', // Default title is "Update User"
    };
  },
  methods: {
    async fetchUser() {
      const { id } = this.$route.params; // Get ID from route params
      console.log('User ID from route params:', id); // Debug log
      try {
        const response = await api.get(`/users/${id}`);
        this.user = response.data; // Auto-fill the form with user data
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },

    async updateUser() {
      const { id } = this.$route.params;
      try {
        await api.put(`/users/${id}`, this.user);
        this.$router.push('/dashboard'); // Redirect after update
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  },
  created() {
    this.fetchUser(); // Fetch the user details based on the `id`
  }
};
</script>

<style scoped>
form {
  margin-top: 20px;
}

input,
select {
  margin: 10px 0;
  padding: 5px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
