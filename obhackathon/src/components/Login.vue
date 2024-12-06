<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Welcome Back</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email" 
            v-model="form.email" 
            placeholder="Enter your email"
            required
          >
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            v-model="form.password" 
            placeholder="Enter your password"
            required
          >
        </div>

        <div class="remember-forgot">
          <label class="remember">
            <input type="checkbox" v-model="form.remember">
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" class="auth-btn">Log In</button>
      </form>

      <div class="auth-footer">
        Don't have an account? 
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      console.log('Login:', this.form)
    }
  }
}
</script> 