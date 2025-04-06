<template>
  <div id="app">
    <div class="login-container">
      <div class="illustration">
        <img src="./assets/ategirl.svg" alt="Ategirl Illustration" />
      </div>
      <div class="form">
        <div class="form-container">
          <!-- Logo instead of text -->
          <img src="./assets/logo-lmc-white.png" alt="Learning Management Center Logo" class="logo" />
          <p>Welcome to LMC Admin App</p>
          <button class="google-btn">Sign in with Google</button>
          <p>or sign in with Email</p>
          <input type="email" placeholder="trainee@meditab.com" />
          <input type="password" placeholder="••••••••" />
          <a href="#" class="forgot-password">Forgot Password?</a>
          <button class="login-btn">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* Light gray background */
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.login-container {
  display: flex;
  width: 80%;
  max-width: 1200px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.illustration {
  flex: 1;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration img {
  width: 80%;
  height: auto;
}

.form {
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-container {
  width: 80%;
  max-width: 400px;
}

.logo {
  display: block;
  margin: 0 auto 20px auto; /* Centers the logo */
  width: 200px; /* Adjust based on your logo */
  height: auto;
}

.form p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

.google-btn {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
}

.form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
  margin-bottom: 20px;
  display: block;
  text-align: right;
}

.login-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}
</style>
