<template>
  <div class="home">
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="main-title">Find Your Perfect Match</h1>
          <p class="main-subtitle">
            Our scientifically proven 10-question personality assessment helps you find meaningful connections with compatible partners.
          </p>
          <div class="stat-badges">
            <div class="stat-badge">
              <i class="fas fa-heart"></i>
              <span>95% Match Accuracy</span>
            </div>
            <div class="stat-badge">
              <i class="fas fa-users"></i>
              <span>10K+ Success Stories</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img 
            src="https://img.freepik.com/free-photo/excited-man-black-denim-jacket-chilling-with-girlfriend-outdoor-portrait-happy-couple-exploring-city_197531-12259.jpg" 
            alt="Happy Couple" 
            class="couple-image"
          >
        </div>
      </div>
    </div>

    <div class="personality-quiz-section">
      <h2>10 Questions to Find True Love</h2>
      <p class="section-subtitle">Our unique matching algorithm uses these key aspects to find your perfect match</p>
      
      <div class="question-categories">
        <div class="category-card">
          <div class="category-icon">
            <i class="fas fa-brain"></i>
          </div>
          <h3>Values & Beliefs</h3>
          <p>Core principles that guide your life decisions</p>
        </div>
        
        <div class="category-card">
          <div class="category-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h3>Love Language</h3>
          <p>How you express and receive affection</p>
        </div>
        
        <div class="category-card">
          <div class="category-icon">
            <i class="fas fa-star"></i>
          </div>
          <h3>Life Goals</h3>
          <p>Your ambitions and future aspirations</p>
        </div>
        
        <div class="category-card">
          <div class="category-icon">
            <i class="fas fa-laugh"></i>
          </div>
          <h3>Personality Traits</h3>
          <p>Your unique character attributes</p>
        </div>
      </div>

      <button class="start-quiz-btn" @click="startQuiz">
        Find Your Friend
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <div class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps-container">
        <div class="step">
          <div class="step-icon">
            <i class="fas fa-question-circle"></i>
          </div>
          <h3>Answer Questions</h3>
          <p>Take our carefully crafted personality assessment</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <i class="fas fa-magic"></i>
          </div>
          <h3>Get Matched</h3>
          <p>Our algorithm finds your most compatible matches</p>
        </div>
        <div class="step">
          <div class="step-icon">
            <i class="fas fa-comments"></i>
          </div>
          <h3>Connect</h3>
          <p>Start meaningful conversations with your matches</p>
        </div>
      </div>
    </div>

    <div class="why-choose-section">
      <h2 class="why-choose-header">Why Choose My Road Friend</h2>
      <p class="section-subtitle">Experience dating reimagined with cutting-edge technology and genuine connections</p>
      <div class="features-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon">
            <i :class="feature.icon"></i>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <ul class="feature-list">
            <li v-for="(item, i) in feature.items" :key="i">
              <i class="fas fa-check"></i> {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Find Your Road Friend</h3>
          <p class="footer-description">
            Connecting your real road friends with shared interests and meaningful conversations.
          </p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Community Guidelines</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Dating Safety</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 My Road Friend. All rights reserved.</p>
        <div class="app-stores">
          <a href="#" class="store-button">
            <i class="fab fa-apple"></i> App Store
          </a>
          <a href="#" class="store-button">
            <i class="fab fa-google-play"></i> Google Play
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentSlide: 0,
      successStories: [
        {
          id: 1,
          names: "Alex & Jamie",
          date: "Became Friends June 2023",
          image: "https://img.freepik.com/free-photo/young-happy-couple-love-having-fun-together_1328-2693.jpg",
          story: "We met on My Road Friend and bonded over our love for hiking and outdoor adventures."
        },
        {
          id: 2,
          names: "Taylor & Morgan",
          date: "Became Friends August 2023",
          image: "https://img.freepik.com/free-photo/cheerful-couple-laughing-together_23-2148917404.jpg",
          story: "Our shared passion for photography brought us together, and we've been exploring new places ever since."
        },
        {
          id: 3,
          names: "Jordan & Casey",
          date: "Became Friends March 2023",
          image: "https://img.freepik.com/free-photo/happy-couple-having-fun-together-outdoors_23-2149063125.jpg",
          story: "We connected through our mutual interest in cooking and have been hosting dinner parties together."
        },
        {
          id: 4,
          names: "Riley & Sam",
          date: "Became Friends September 2023",
          image: "https://img.freepik.com/free-photo/young-beautiful-couple-casual-clothes-man-woman-happy-love-having-fun-together_285396-9554.jpg",
          story: "From our first conversation about travel, we've been planning trips and exploring the world together."
        }
      ],
      features: [
        {
          title: "AI-Powered Matching",
          description: "Our advanced algorithm analyzes Instagram activity, interests, and behavior patterns.",
          items: [
            "Personality analysis",
            "Interest matching",
            "Activity compatibility"
          ]
        },
        {
          title: "Trust & Safety",
          description: "Your security is our priority with advanced verification and privacy features.",
          items: [
            "Instagram verification",
            "Profile screening",
            "Privacy controls"
          ]
        },
        {
          title: "Meaningful Connections",
          description: "Foster genuine relationships with our engagement-focused features.",
          items: [
            "Ice-breaker prompts",
            "Shared interests chat",
            "Video chat option"
          ]
        },
        {
          title: "Smart Insights",
          description: "Get personalized dating insights and recommendations.",
          items: [
            "Compatibility scores",
            "Dating preferences",
            "Success metrics"
          ]
        },
        {
          title: "Global Community",
          description: "Connect with people from around the world who share your interests.",
          items: [
            "International matching",
            "Cultural exchange",
            "Language support"
          ]
        },
        {
          title: "Event Discovery",
          description: "Find and organize meetups with your matches in your area.",
          items: [
            "Local events",
            "Group activities",
            "Interest-based meetups"
          ]
        },
        {
          title: "Community Support",
          description: "Engage with a supportive community that shares your values.",
          items: [
            "Forums and discussions",
            "Events and meetups",
            "Peer support"
          ]
        },
        {
          title: "Personalized Experience",
          description: "Tailored recommendations based on your preferences.",
          items: [
            "Customized matches",
            "Profile suggestions",
            "Activity recommendations"
          ]
        },
        {
          title: "Engagement Features",
          description: "Tools to help you connect and communicate effectively.",
          items: [
            "Messaging options",
            "Video calls",
            "Ice-breaker questions"
          ]
        },
        {
          title: "Creative Achievements",
          description: "Celebrate your milestones and achievements.",
          items: [
            "Personalized badges",
            "Achievements tracking",
            "Community recognition"
          ]
        }
      ]
    }
  },
  methods: {
    startQuiz() {
      this.$router.push('/questionnaire')
    },
    nextSlide() {
      if (this.currentSlide < Math.ceil(this.successStories.length / 3) - 1) {
        this.currentSlide++
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    }
  }
}
</script>

<style scoped>
.home {
  padding: 0;
}

.hero-banner {
  background: linear-gradient(135deg, #ffffff, var(--background-color));
  padding: 0;
  margin-top: -1rem;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
}

.hero-text {
  padding-right: 2rem;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 2rem;
}

.stat-badges {
  display: flex;
  gap: 1rem;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  font-size: 0.9rem;
}

.stat-badge i {
  color: white;
}

.hero-image {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.couple-image {
  width: 100%;
  object-fit: cover;
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 1rem;
  }

  .hero-text {
    padding-right: 0;
    order: 1;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .stat-badges {
    justify-content: center;
  }

  .hero-image {
    order: 2;
    margin: 0 auto;
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }

  .main-subtitle {
    font-size: 1rem;
  }

  .stat-badges {
    flex-direction: column;
    align-items: center;
  }
}

.personality-quiz-section {
  padding: 4rem 2rem;
  text-align: center;
  background: white;
  border-radius: 1rem;
  margin: 2rem 0;
}

.question-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.category-icon i {
  font-size: 2rem;
  color: white;
}

.category-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.category-card p {
  color: #666;
  line-height: 1.6;
}

.start-quiz-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.start-quiz-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.how-it-works {
  padding: 4rem 0;
  text-align: center;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.step {
  padding: 2rem;
}

.step-icon {
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.step-icon i {
  font-size: 2rem;
  color: white;
}

.testimonials {
  padding: 4rem 0;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 1rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 0 2rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.testimonial-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.testimonial-card h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.testimonial-card p {
  font-style: italic;
  color: #666;
  line-height: 1.6;
}

h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.features-section {
  padding: 6rem 2rem;
  background-color: white;
  border-radius: 1rem;
  margin: 2rem 0;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-icon i {
  font-size: 1.5rem;
  color: white;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  color: #4a5568;
}

.feature-list i {
  color: var(--primary-color);
  font-size: 0.9rem;
}

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.footer-description {
  color: #a0aec0;
  margin: 1rem 0;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.8rem;
}

.footer-section ul a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-stores {
  display: flex;
  gap: 1rem;
}

.store-button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.store-button:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .app-stores {
    justify-content: center;
  }
}

/* Add these new styles before your existing styles */
.couple-highlight {
  padding: 0;
  background: linear-gradient(135deg, #ffffff, var(--background-color));
  margin-bottom: 2rem;
}

.couple-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.couple-image-wrapper {
  margin-top: -2rem;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease;
}

.couple-image-wrapper:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.couple-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.couple-image-wrapper:hover .couple-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom right,
    rgba(255, 107, 107, 0.1),
    rgba(78, 205, 196, 0.1)
  );
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-heart, .floating-sparkle {
  position: absolute;
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

.floating-heart:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.floating-heart:nth-child(2) { top: 30%; right: 20%; animation-delay: 1s; }
.floating-sparkle { bottom: 30%; right: 30%; animation-delay: 0.5s; }

.couple-text {
  padding: 0 2rem;
}

.highlight-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.highlight-title {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highlight-description {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 2rem;
  max-width: 600px;
}

.highlight-stats {
  display: flex;
  gap: 1rem;
}

.stat-badge {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.stat-badge i {
  color: white;
}

@media (max-width: 968px) {
  .couple-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .couple-text {
    text-align: center;
    order: -1;
  }

  .highlight-title {
    font-size: 2.5rem;
  }

  .highlight-stats {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .couple-highlight {
    padding: 2rem 1rem;
  }

  .highlight-title {
    font-size: 2rem;
  }

  .highlight-description {
    font-size: 1rem;
  }

  .highlight-stats {
    flex-direction: column;
    align-items: center;
  }
}

.success-stories-section {
  text-align: center;
  padding: 4rem 0;
}

.section-header {
  margin: 0 auto;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}

.slider-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  align-items: center;
}

.slider {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease;
}

.story-card {
  flex: 0 0 33.33%; /* Each card takes one-third of the container width */
  padding: 1rem;
  box-sizing: border-box;
}

.story-card img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
}

.story-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.story-text {
  font-style: italic;
  color: #444;
  line-height: 1.6;
}

.slider-btn {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 2;
  margin: 0 1rem;
}

.slider-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Responsive styles */
@media (max-width: 768px) {
  .story-card {
    flex: 0 0 100%; /* On mobile, show one card at a time */
  }
}

.why-choose-section {
  text-align: center;
  padding: 4rem 0;
}

.why-choose-header {
  margin: 0 auto;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}
</style> 