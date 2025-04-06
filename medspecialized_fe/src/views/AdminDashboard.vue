<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>

    <!-- Add User Button -->
    <button @click="showAddUserForm = !showAddUserForm">
      Add New User
    </button>

    <!-- Add User Form (Toggle visibility) -->
    <div v-if="showAddUserForm">
      <h3>Create User</h3>
      <form @submit.prevent="addUser">
        <input
          v-model="newUser.email"
          placeholder="Email"
          required
        >
        <input
          v-model="newUser.name"
          placeholder="Name"
          required
        >
        <select v-model="newUser.role">
          <option value="Admin">
            Admin
          </option>
          <option value="Trainer">
            Trainer
          </option>
          <option value="Trainee">
            Trainee
          </option>
        </select>

        <select v-model="newUser.status">
          <option value="Active">
            Active
          </option>
          <option value="Inactive">
            Inactive
          </option>
        </select>

        <input
          v-model="newUser.password"
          type="password"
          placeholder="Password"
          required
        >

        <button type="submit">
          Create User
        </button>
      </form>
    </div>

    <!-- User List -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.status }}</td>
          <td>
            <button @click="editUser(user._id)">Edit</button>
            <button @click="deleteUser(user._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  data() {
    return {
      users: [],
      newUser: {
        email: '',
        name: '',
        role: 'Trainee',
        status: 'Active',
        password: ''
      },
      showAddUserForm: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser() {
      try {
        await api.post('/users', this.newUser);
        this.newUser = {
          email: '',
          name: '',
          role: 'Trainee',
          status: 'Active',
          password: ''
        };
        this.fetchUsers();
        this.showAddUserForm = false;
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    editUser(userId) {
      this.$router.push({ name: 'edit-user', params: { id: userId } });
    },

    async deleteUser(id) {
    try {
        // Optimistic UI Update: Remove the user from the list immediately
        this.users = this.users.filter(user => user._id !== id);

        console.log(`Sending DELETE request to /users/${id}`);
        const response = await api.delete(`/users/${id}`);
        console.log('Delete response:', response.data); // Log the actual response data

        // Fetch the updated list of users after deletion
        this.fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error);

        // Optionally, you can re-add the user to the list if the delete failed
        this.fetchUsers();
    }
}



  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

button {
  margin-top: 10px;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

table th,
table td {
  padding: 10px;
  border: 1px solid #ddd;
}

input,
select {
  margin: 5px;
  padding: 5px;
}
</style>
