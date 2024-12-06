<template>
  <div class="profile-container">
    <div class="profile-header">
      <img :src="matchProfile.image" :alt="matchProfile.name" class="profile-image">
      <h1>{{ matchProfile.name }}</h1>
      <div class="match-stats">
        <span class="compatibility">
          <i class="fas fa-heart"></i> {{ matchProfile.compatibility }}% Match
        </span>
        <span class="location">
          <i class="fas fa-map-marker-alt"></i> {{ matchProfile.location }}
        </span>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-section">
        <h2>About</h2>
        <p>{{ matchProfile.about }}</p>
      </div>

      <div class="profile-section">
        <h2>Interests</h2>
        <div class="interests-tags">
          <span v-for="interest in matchProfile.interests" 
                :key="interest" 
                class="interest-tag">
            {{ interest }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      matchProfile: null
    }
  },
  created() {
    // Simulate fetching profile data
    // In a real app, you would fetch this from an API
    this.matchProfile = this.getMatchProfile(this.id)
  },
  methods: {
    getMatchProfile(id) {
      // Simulated profile data
      return {
        id: id,
        name: "Sarah Johnson",
        image: "https://img.freepik.com/free-photo/cheerful-young-woman-photographer-smiling_171337-9852.jpg",
        location: "New York, NY",
        compatibility: 95,
        about: "Photography enthusiast and adventure seeker. Love exploring new places and capturing moments through my lens.",
        interests: ["Photography", "Travel", "Hiking", "Art", "Coffee", "Music"]
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.match-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.match-stats i {
  color: #007bff;
  margin-right: 0.5rem;
}

.profile-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.interest-tag {
  background: #e9ecef;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #495057;
}

@media (max-width: 768px) {
  .profile-container {
    margin: 1rem;
  }
  
  .match-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 