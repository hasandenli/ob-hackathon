<template>
  <div class="questionnaire-container">
    <div class="cool-progress">
      <div class="progress-steps">
        <div 
          v-for="step in 10" 
          :key="step"
          :class="['step', { active: step <= currentQuestion + 1, current: step === currentQuestion + 1 }]"
        >
          {{ step }}
        </div>
      </div>
      <div class="progress-line">
        <div class="progress-fill" :style="{ width: `${(currentQuestion + 1) * 10}%` }"></div>
      </div>
      <div class="question-counter">Question {{ currentQuestion + 1 }} of 10</div>
    </div>

    <div class="question-card">
      <h2 class="question-text">{{ questions[currentQuestion].question }}</h2>
      
      <div class="options-grid">
        <div 
          v-for="(option, index) in questions[currentQuestion].options" 
          :key="index"
          :class="['option-card', { selected: selectedOptions.includes(index) }]"
          @click="toggleOption(index)"
        >
          <div class="option-content">
            <i :class="option.icon"></i>
            <h3>{{ option.text }}</h3>
          </div>
          <div class="check-mark">
            <i class="fas fa-check"></i>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button 
          v-if="currentQuestion > 0" 
          @click="previousQuestion" 
          class="nav-btn prev-btn"
        >
          <i class="fas fa-arrow-left"></i> Previous
        </button>
        <button 
          @click="nextQuestion" 
          class="nav-btn next-btn"
          :disabled="selectedOptions.length === 0"
        >
          {{ currentQuestion === 9 ? 'Finish' : 'Next' }}
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- New Loading Modal -->
    <div v-if="loading" class="loading-modal">
      <div class="loading-content">
        <div class="ai-brain">
          <div class="brain-waves"></div>
          <i class="fas fa-brain"></i>
        </div>
        
        <div class="analysis-text">
          <h2>AI Analysis in Progress</h2>
          <div class="typing-text">{{ currentAnalysisText }}</div>
        </div>

        <div class="progress-ring">
          <svg class="progress-ring__circle" width="120" height="120">
            <circle
              stroke="rgba(255, 255, 255, 0.1)"
              stroke-width="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <circle
              class="progress-ring__circle-progress"
              stroke="url(#gradient)"
              stroke-width="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FF6B6B" />
                <stop offset="100%" stop-color="#4ECDC4" />
              </linearGradient>
            </defs>
          </svg>
          <div class="progress-text">{{ loadingProgress }}%</div>
        </div>
      </div>
    </div>

    <!-- Add warning modal -->
    <div class="warning-modal" v-if="showWarning">
      <div class="warning-content">
        <h3>Maximum Selection Reached</h3>
        <p>You can only select up to 3 options for each question.</p>
        <button @click="closeWarning" class="warning-btn">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuestionnaireView',
  data() {
    return {
      currentQuestion: 0,
      selectedOptions: [],
      userId: null,
      allAnswers: [],
      loading: false,
      currentLoadingStep: 0,
      loadingProgress: 0,
      questions: [
        {
          question: "What are your main interests and hobbies?",
          options: [
            {
              icon: "fas fa-palette",
              text: "Creative Arts",
              description: "Painting, music, writing, photography, crafts"
            },
            {
              icon: "fas fa-hiking",
              text: "Outdoor & Adventure",
              description: "Hiking, camping, rock climbing, surfing"
            },
            {
              icon: "fas fa-dumbbell",
              text: "Fitness & Sports",
              description: "Gym, team sports, yoga, martial arts"
            },
            {
              icon: "fas fa-book",
              text: "Learning & Education",
              description: "Reading, courses, languages, workshops"
            },
            {
              icon: "fas fa-utensils",
              text: "Food & Cooking",
              description: "Cooking, baking, wine tasting, food exploration"
            },
            {
              icon: "fas fa-plane",
              text: "Travel & Culture",
              description: "International travel, cultural events, museums"
            },
            {
              icon: "fas fa-gamepad",
              text: "Gaming & Technology",
              description: "Video games, programming, gadgets, VR/AR"
            },
            {
              icon: "fas fa-film",
              text: "Entertainment & Media",
              description: "Movies, TV shows, podcasts, streaming"
            },
            {
              icon: "fas fa-guitar",
              text: "Music & Performance",
              description: "Playing instruments, concerts, dancing, singing"
            },
            {
              icon: "fas fa-seedling",
              text: "Nature & Environment",
              description: "Gardening, sustainability, animal care, ecology"
            }
          ]
        },
        {
          question: "What qualities do you value most in a partner?",
          options: [
            {
              icon: "fas fa-heart",
              text: "Emotional Intelligence",
              description: "Understanding and expressing feelings well"
            },
            {
              icon: "fas fa-brain",
              text: "Intelligence",
              description: "Sharp mind and intellectual curiosity"
            },
            {
              icon: "fas fa-laugh",
              text: "Sense of Humor",
              description: "Can make you laugh and enjoy life"
            },
            {
              icon: "fas fa-handshake",
              text: "Reliability",
              description: "Dependable and trustworthy"
            },
            {
              icon: "fas fa-star",
              text: "Ambition",
              description: "Drive to achieve goals"
            },
            {
              icon: "fas fa-heart-circle",
              text: "Kindness",
              description: "Caring and compassionate nature"
            },
            {
              icon: "fas fa-comments",
              text: "Communication",
              description: "Open and honest dialogue"
            },
            {
              icon: "fas fa-lightbulb",
              text: "Creativity",
              description: "Innovative thinking and artistic expression"
            },
            {
              icon: "fas fa-shield-alt",
              text: "Loyalty",
              description: "Committed and faithful nature"
            },
            {
              icon: "fas fa-balance-scale",
              text: "Maturity",
              description: "Emotional stability and wisdom"
            }
          ]
        },
        {
          question: "How do you prefer to spend your free time?",
          options: [
            {
              icon: "fas fa-home",
              text: "Cozy at Home",
              description: "Netflix, reading, or relaxing"
            },
            {
              icon: "fas fa-users",
              text: "Social Activities",
              description: "Meeting friends and socializing"
            },
            {
              icon: "fas fa-dumbbell",
              text: "Active Lifestyle",
              description: "Sports, gym, or outdoor activities"
            },
            {
              icon: "fas fa-music",
              text: "Entertainment",
              description: "Concerts, movies, or shows"
            },
            {
              icon: "fas fa-briefcase",
              text: "Self-Development",
              description: "Learning new skills or working on projects"
            },
            {
              icon: "fas fa-globe",
              text: "Exploring",
              description: "Discovering new places and experiences"
            },
            {
              icon: "fas fa-palette",
              text: "Creative Projects",
              description: "Art, crafts, or DIY activities"
            },
            {
              icon: "fas fa-gamepad",
              text: "Gaming",
              description: "Video games or board games"
            },
            {
              icon: "fas fa-utensils",
              text: "Culinary Adventures",
              description: "Cooking, baking, or trying new restaurants"
            },
            {
              icon: "fas fa-book",
              text: "Intellectual Pursuits",
              description: "Reading, studying, or philosophical discussions"
            }
          ]
        },
        {
          question: "What are your long-term goals?",
          options: [
            {
              icon: "fas fa-graduation-cap",
              text: "Career Growth",
              description: "Professional development and success"
            },
            {
              icon: "fas fa-home",
              text: "Family Life",
              description: "Building a family and settling down"
            },
            {
              icon: "fas fa-plane-departure",
              text: "Travel & Adventure",
              description: "Exploring the world"
            },
            {
              icon: "fas fa-chart-line",
              text: "Financial Success",
              description: "Building wealth and security"
            },
            {
              icon: "fas fa-heart",
              text: "Personal Growth",
              description: "Self-improvement and fulfillment"
            },
            {
              icon: "fas fa-hands-helping",
              text: "Making Impact",
              description: "Contributing to society"
            },
            {
              icon: "fas fa-book",
              text: "Educational Goals",
              description: "Advanced degrees or continuous learning"
            },
            {
              icon: "fas fa-briefcase",
              text: "Entrepreneurship",
              description: "Starting own business or venture"
            },
            {
              icon: "fas fa-leaf",
              text: "Sustainable Living",
              description: "Environmental consciousness and lifestyle"
            },
            {
              icon: "fas fa-palette",
              text: "Creative Achievement",
              description: "Artistic or creative accomplishments"
            }
          ]
        },
        {
          question: "How do you handle conflicts?",
          options: [
            {
              icon: "fas fa-comments",
              text: "Open Communication",
              description: "Discussing issues calmly"
            },
            {
              icon: "fas fa-pause",
              text: "Need Space",
              description: "Taking time to process"
            },
            {
              icon: "fas fa-balance-scale",
              text: "Compromise",
              description: "Finding middle ground"
            },
            {
              icon: "fas fa-hand-peace",
              text: "Problem Solving",
              description: "Finding practical solutions"
            },
            {
              icon: "fas fa-user-friends",
              text: "Seek Support",
              description: "Getting advice from others"
            },
            {
              icon: "fas fa-heart-broken",
              text: "Emotional Expression",
              description: "Expressing feelings openly"
            },
            {
              icon: "fas fa-frown",
              text: "Aggressive",
              description: "Expressing feelings aggressively"
            },
            {
              icon: "fas fa-hand-paper",
              text: "Avoidance",
              description: "Avoiding conflicts and ignoring issues"
            },
            {
              icon: "fas fa-hand-peace",
              text: "Mediation",
              description: "Trying to find a middle ground"
            },
            {
              icon: "fas fa-balance-scale",
              text: "Compromise",
              description: "Finding middle ground"
            }
          ]
        },
        {
          question: "What's your ideal date?",
          options: [
            {
              icon: "fas fa-utensils",
              text: "Fine Dining",
              description: "Romantic restaurant experience"
            },
            {
              icon: "fas fa-hiking",
              text: "Outdoor Adventure",
              description: "Active and nature-based activities"
            },
            {
              icon: "fas fa-palette",
              text: "Cultural Experience",
              description: "Museums, galleries, or shows"
            },
            {
              icon: "fas fa-coffee",
              text: "Casual Meet",
              description: "Coffee and conversation"
            },
            {
              icon: "fas fa-cocktail",
              text: "Night Out",
              description: "Dancing or bar hopping"
            },
            {
              icon: "fas fa-home",
              text: "Cozy Home Date",
              description: "Cooking together or movie night"
            },
            {
              icon: "fas fa-bicycle",
              text: "Adventure Date",
              description: "Exploring new places on a bike"
            },
            {
              icon: "fas fa-camera",
              text: "Photography Date",
              description: "Exploring new places with a camera"
            },
            {
              icon: "fas fa-paint-brush",
              text: "Art Date",
              description: "Exploring new places with art"
            },
            {
              icon: "fas fa-book",
              text: "Literature Date",
              description: "Exploring new places with literature"
            }
          ]
        },
        {
          question: "How important is physical attraction to you?",
          options: [
            {
              icon: "fas fa-star",
              text: "Very Important",
              description: "Strong physical attraction is crucial"
            },
            {
              icon: "fas fa-balance-scale",
              text: "Balanced View",
              description: "Mix of physical and emotional attraction"
            },
            {
              icon: "fas fa-brain",
              text: "Secondary",
              description: "Personality matters more"
            },
            {
              icon: "fas fa-heart",
              text: "Grows Over Time",
              description: "Develops with emotional connection"
            },
            {
              icon: "fas fa-fire",
              text: "Initial Spark",
              description: "Important at first, then other factors"
            },
            {
              icon: "fas fa-user-friends",
              text: "Connection Based",
              description: "Based on overall chemistry"
            },
            {
              icon: "fas fa-heart-broken",
              text: "No Physical Attraction",
              description: "No physical attraction at all"
            },
            {
              icon: "fas fa-eye-slash",
              text: "Avoidance",
              description: "Avoiding physical contact"
            },
            {
              icon: "fas fa-heart-broken",
              text: "Disinterest",
              description: "Disinterest in physical attraction"
            },
            {
              icon: "fas fa-heart-broken",
              text: "Physical Abuse",
              description: "Physical abuse or violence"
            }
          ]
        },
        {
          question: "What's your communication style?",
          options: [
            {
              icon: "fas fa-comments",
              text: "Direct",
              description: "Clear and straightforward"
            },
            {
              icon: "fas fa-heart",
              text: "Emotional",
              description: "Expressive and feeling-based"
            },
            {
              icon: "fas fa-brain",
              text: "Analytical",
              description: "Logical and thoughtful"
            },
            {
              icon: "fas fa-laugh",
              text: "Playful",
              description: "Humorous and light"
            },
            {
              icon: "fas fa-user-friends",
              text: "Diplomatic",
              description: "Tactful and considerate"
            },
            {
              icon: "fas fa-envelope",
              text: "Reserved",
              description: "Private and selective"
            },
            {
              icon: "fas fa-microphone",
              text: "Loud",
              description: "Loud and assertive"
            },
            {
              icon: "fas fa-volume-up",
              text: "Noisy",
              description: "Noisy and distracting"
            },
            {
              icon: "fas fa-microphone-slash",
              text: "Avoidance",
              description: "Avoiding communication"
            },
            {
              icon: "fas fa-microphone-slash",
              text: "Disinterest",
              description: "Disinterest in communication"
            }
          ]
        },
        {
          question: "What role does family play in your life?",
          options: [
            {
              icon: "fas fa-home",
              text: "Very Close",
              description: "Strong family bonds and involvement"
            },
            {
              icon: "fas fa-balance-scale",
              text: "Balanced",
              description: "Important but independent"
            },
            {
              icon: "fas fa-globe",
              text: "Distant",
              description: "Limited family interaction"
            },
            {
              icon: "fas fa-users",
              text: "Chosen Family",
              description: "Close friends as family"
            },
            {
              icon: "fas fa-heart",
              text: "Growing",
              description: "Building own family"
            },
            {
              icon: "fas fa-handshake",
              text: "Supportive",
              description: "There when needed"
            },
            {
              icon: "fas fa-child",
              text: "Active",
              description: "Actively participating in family activities"
            },
            {
              icon: "fas fa-child-play",
              text: "Supportive",
              description: "Supporting family members"
            },
            {
              icon: "fas fa-child-care",
              text: "Responsible",
              description: "Taking responsibility for family members"
            },
            {
              icon: "fas fa-child-care",
              text: "Overprotective",
              description: "Overprotecting family members"
            }
          ]
        },
        {
          question: "What are your views on marriage?",
          options: [
            {
              icon: "fas fa-ring",
              text: "Traditional",
              description: "Believe in marriage institution"
            },
            {
              icon: "fas fa-heart",
              text: "Eventually",
              description: "Open to it in the future"
            },
            {
              icon: "fas fa-handshake",
              text: "Partnership",
              description: "Commitment without paper"
            },
            {
              icon: "fas fa-question-circle",
              text: "Undecided",
              description: "Still figuring it out"
            },
            {
              icon: "fas fa-times-circle",
              text: "Not Interested",
              description: "Prefer other arrangements"
            },
            {
              icon: "fas fa-clock",
              text: "No Rush",
              description: "Taking it slow"
            },
            {
              icon: "fas fa-heart-broken",
              text: "No Interest",
              description: "No interest in marriage"
            },
            {
              icon: "fas fa-heart-broken",
              text: "Disinterest",
              description: "Disinterest in marriage"
            },
            {
              icon: "fas fa-heart-broken",
              text: "Physical Abuse",
              description: "Physical abuse or violence"
            },
            {
              icon: "fas fa-heart-broken",
              text: "Emotional Abuse",
              description: "Emotional abuse or violence"
            }
          ]
        }
      ],
      analysisTexts: [
        "Analyzing personality patterns...",
        "Processing compatibility metrics...",
        "Generating match profiles...",
        "Finalizing results..."
      ],
      currentAnalysisText: "Initializing AI analysis...",
      showWarning: false,
    }
  },
  created() {
    // Generate or retrieve userId on component creation
    this.initializeUserId();
  },
  methods: {
    initializeUserId() {
      // Check if userId exists in localStorage
      let storedUserId = localStorage.getItem('myroadfriend_user_id');
      if (!storedUserId) {
        // Generate a new userId if none exists
        storedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('myroadfriend_user_id', storedUserId);
      }
      this.userId = storedUserId;
    },
    toggleOption(index) {
      const position = this.selectedOptions.indexOf(index)
      if (position === -1) {
        // Check if already selected 3 options
        if (this.selectedOptions.length >= 3) {
          this.showWarning = true
          return
        }
        this.selectedOptions.push(index)
      } else {
        this.selectedOptions.splice(position, 1)
      }
    },
    closeWarning() {
      this.showWarning = false
    },
    async nextQuestion() {
      // Store current question's answers
      this.allAnswers.push({
        questionId: this.currentQuestion,
        question: this.questions[this.currentQuestion].question,
        selectedOptions: this.selectedOptions.map(index => ({
          optionId: index,
          text: this.questions[this.currentQuestion].options[index].text
        }))
      });

      if (this.currentQuestion < 9) {
        this.currentQuestion++;
        this.selectedOptions = [];
      } else {
        // Show loading modal first
        this.loading = true;
        this.currentLoadingStep = 0;
        this.loadingProgress = 0;
        
        try {
          // Animate through the steps
          await this.animateLoadingSteps();
          
          // Add a delay before submitting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Then submit answers
        } catch (error) {
          console.error('Error:', error);
          alert('There was an error processing your answers. Please try again.');
        }
      }
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        // Restore previous answers if they exist
        const previousAnswers = this.allAnswers[this.currentQuestion];
        this.selectedOptions = previousAnswers ? 
          previousAnswers.selectedOptions.map(option => option.optionId) : [];
      }
    },
    async submitAnswers() {
      try {
        const submission = {
          userId: this.userId,
          answers: this.allAnswers,
          timestamp: new Date().toISOString()
        };

        const response = await axios.post('http://localhost:3000/store', submission);
        
        if (!response.data.success) {
          throw new Error('Submission failed');
        }
        
        localStorage.setItem('myroadfriend_answers', JSON.stringify(this.allAnswers));
      } catch (error) {
        console.error('Error submitting answers:', error);
        throw error; // Re-throw to be caught in animateLoadingSteps
      }
    },

    async animateLoadingSteps() {
      const stepDuration = 2000; // 2 seconds per step
      
      try {
        // Submit data first
        await this.submitAnswers();
        
        // Then show animation
        for (let step = 1; step <= 4; step++) {
          await new Promise(resolve => {
            setTimeout(() => {
              this.currentLoadingStep = step;
              this.loadingProgress = step * 25;
              this.currentAnalysisText = this.analysisTexts[step - 1];
              resolve();
            }, stepDuration);
          });
        }

        // After animation completes, wait a brief moment then navigate
        setTimeout(() => {
          this.loading = false;
          this.$router.push('/matches');
        }, 500);

      } catch (error) {
        console.error('Error:', error);
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.questionnaire-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.cool-progress {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  position: relative;
}

.step {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  color: #666;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.step.active {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

.step.current {
  animation: pulse 2s infinite;
}

.progress-line {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  position: relative;
  margin: 0 15px;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.question-counter {
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
  }
}

.question-card {
  margin-top: 20px;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 400px;
}

.question-text {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 600;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1.5rem;
  row-gap: 4rem;
  padding: 1rem 1rem 30px 1rem;
  margin-bottom: 5rem;
}

.option-card {
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 0.8rem;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.option-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.option-content i {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
}

.option-content h3 {
  font-size: 1rem;
  color: #2c3e50;
  margin: 0;
  transition: color 0.3s ease;
  font-weight: 600;
}

.check-mark {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: 2;
}

.check-mark i {
  color: white;
  font-size: 0.8rem;
}

.option-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.option-card.selected {
  border-color: var(--primary-color);
  background: rgba(255, 107, 107, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2);
}

.option-card.selected::before {
  opacity: 0.1;
}

.option-card.selected .option-content i,
.option-card.selected .option-content h3 {
  color: var(--primary-color);
}

.option-card.selected .check-mark {
  opacity: 1;
  transform: scale(1);
}

.navigation-buttons {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  padding-top: 0;
  border-top: none;
  margin-top: 25px;
}

.nav-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.prev-btn {
  background: #f0f0f0;
  color: #666;
}

.next-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-weight: 500;
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

@media (max-width: 1200px) {
  .options-grid {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 4rem;
  }
}

@media (max-width: 992px) {
  .options-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4rem;
  }
}

@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3rem;
  }

  .step {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }

  .cool-progress {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .options-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Add loading overlay styles */
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

.loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.ai-brain {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-brain i {
  font-size: 3rem;
  color: white;
  z-index: 2;
}

.brain-waves {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.analysis-text {
  text-align: center;
  color: white;
}

.analysis-text h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  min-height: 1.5em;
}

.progress-ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring__circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-ring__circle-progress {
  stroke-dasharray: 326.73;
  stroke-dashoffset: calc(326.73 - (326.73 * var(--progress)) / 100);
  transition: stroke-dashoffset 0.5s ease;
}

.progress-text {
  position: absolute;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

@keyframes pulse {
  from { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.3; }
  100% { transform: scale(0.95); opacity: 0.5; }
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* Update progress ring based on loading progress */
.progress-ring__circle-progress {
  --progress: v-bind(loadingProgress);
}

/* Add these styles for the warning modal */
.warning-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.warning-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.warning-content h3 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.warning-content p {
  margin-bottom: 1.5rem;
  color: #666;
}

.warning-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.warning-btn:hover {
  background: var(--secondary-color);
}
</style> 