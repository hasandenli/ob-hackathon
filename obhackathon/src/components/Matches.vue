<template>
  <div class="matches-container">
    <h2 class="section-header">Your Matches</h2>
    
    <div class="matches-grid">
      <div class="match-card" v-for="match in matches" :key="match.id">
        <img :src="match.image" :alt="match.name" class="match-image">
        <div class="match-info">
          <h3>{{ match.name }}</h3>
          <p class="match-date">Matched on {{ match.date }}</p>
          <div class="match-details">
            <p><i class="fas fa-map-marker-alt"></i> {{ match.location }}</p>
            <p><i class="fas fa-heart"></i> {{ match.compatibility }}% Match</p>
          </div>
          <button class="view-profile-btn" @click="viewProfile(match.id)">View Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchesList',
  data() {
    return {
      matches: [
        {
          id: 1,
          name: "Sarah Johnson",
          image: "https://img.freepik.com/free-photo/cheerful-young-woman-photographer-smiling_171337-9852.jpg",
          date: "Oct 15, 2023",
          location: "New York, NY",
          compatibility: 95
        },
        {
          id: 2,
          name: "Michael Chen",
          image: "https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed-white-background_23-2148222620.jpg",
          date: "Oct 14, 2023",
          location: "San Francisco, CA",
          compatibility: 92
        },
        {
          id: 3,
          name: "Emma Davis",
          image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
          date: "Oct 13, 2023",
          location: "Chicago, IL",
          compatibility: 88
        },
        {
          id: 4,
          name: "James Wilson",
          image: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
          date: "Oct 12, 2023",
          location: "Austin, TX",
          compatibility: 87
        }
      ]
    }
  },
  methods: {
    viewProfile(matchId) {
      this.$router.push(`/profile/${matchId}`)
    }
  }
}
</script>

<style scoped>
.matches-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.match-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.match-card:hover {
  transform: translateY(-5px);
}

.match-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.match-info {
  padding: 1.5rem;
}

.match-info h3 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
}

.match-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.match-details {
  margin: 1rem 0;
}

.match-details p {
  margin: 0.5rem 0;
  color: #555;
}

.match-details i {
  margin-right: 0.5rem;
  color: #007bff;
}

.view-profile-btn {
  width: 100%;
  padding: 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.view-profile-btn:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .matches-grid {
    grid-template-columns: 1fr;
  }
}
</style> 