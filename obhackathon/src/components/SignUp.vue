<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Create Account</h2>
      <form @submit.prevent="handleSignUp">
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
            placeholder="Create a password"
            required
          >
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            v-model="form.confirmPassword" 
            placeholder="Confirm your password"
            required
          >
        </div>

        <button type="submit" class="auth-btn">Sign Up</button>
      </form>

      <div class="auth-footer">
        Already have an account? 
        <router-link to="/login">Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleSignUp() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      // Handle sign up logic here
      console.log('Sign up:', this.form)
    }
  }
}
</script> 