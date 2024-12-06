<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="logo">
        <router-link to="/" style="text-decoration: none;">
          <div class="logo">My Road Friend</div>
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/matches">Matches</router-link>
        <router-link to="/profile">Profile</router-link>
        <button class="start-journey-btn" @click="startJourney">
          <span>Find Your Road Friend</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    startJourney() {
      this.$router.push('/questionnaire')
    }
  }
}
</script>

<style>
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --background-color: #f8f9fa;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.app-container {
  min-height: 100vh;
  background-color: var(--background-color);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.start-journey-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.start-journey-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.start-journey-btn i {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.start-journey-btn:hover i {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
  }

  .start-journey-btn {
    width: 100%;
    justify-content: center;
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--primary-color);
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 1rem;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
}

.auth-btn {
  width: 100%;
  padding: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.auth-btn:hover {
  background: #0056b3;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.auth-footer a {
  color: #007bff;
  text-decoration: none;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}
</style>
