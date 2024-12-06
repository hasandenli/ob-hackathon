<template>
  <div class="my-profile-container">
    <h2 class="section-header">My Profile</h2>
    
    <div class="profile-content">
      <div class="profile-image-section">
        <div class="image-container" @click="triggerFileInput">
          <img :src="profile.image" :alt="profile.name" class="profile-image">
          <div class="image-overlay">
            <i class="fas fa-camera"></i>
            <span>Change Photo</span>
          </div>
          <input 
            type="file" 
            ref="fileInput" 
            @change="onFileChange" 
            accept="image/*" 
            class="hidden-file-input"
          >
        </div>
      </div>

      <div class="form-section">
        <h3>Basic Information</h3>
        
        <div class="basic-info-grid">
          <!-- Row 1 -->
          <div class="info-row">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="profile.name" placeholder="Your full name">
            </div>

            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" v-model="profile.dateOfBirth">
            </div>

            <div class="form-group">
              <label>Gender</label>
              <select v-model="profile.gender">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="info-row">
            <div class="form-group">
              <label>Country</label>
              <input type="text" v-model="profile.location.country" placeholder="Your country">
            </div>

            <div class="form-group">
              <label>City</label>
              <input type="text" v-model="profile.location.city" placeholder="Your city">
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="profile.email" placeholder="Your email">
            </div>
          </div>

          <!-- Row 3 -->
          <div class="info-row">
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" v-model="profile.phone" placeholder="Your phone number">
            </div>

            <div class="form-group">
              <label>Occupation</label>
              <input type="text" v-model="profile.occupation" placeholder="Your occupation">
            </div>

            <div class="form-group">
              <label>Company/Organization</label>
              <input type="text" v-model="profile.company" placeholder="Where you work">
            </div>
          </div>

          <!-- About Me Section -->
          <div class="form-group full-width">
            <label>About Me</label>
            <textarea 
              v-model="profile.about" 
              placeholder="Tell us about yourself, your interests, and what you're looking for..."
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>Social Media</h3>
        <div class="form-group">
          <label><i class="fab fa-instagram"></i> Instagram</label>
          <input type="text" v-model="profile.social.instagram" placeholder="Your Instagram username">
        </div>
        <div class="form-group">
          <label><i class="fab fa-twitter"></i> Twitter</label>
          <input type="text" v-model="profile.social.twitter" placeholder="Your Twitter handle">
        </div>
        <div class="form-group">
          <label><i class="fab fa-linkedin"></i> LinkedIn</label>
          <input type="text" v-model="profile.social.linkedin" placeholder="Your LinkedIn profile URL">
        </div>
        <div class="form-group">
          <label><i class="fab fa-facebook"></i> Facebook</label>
          <input type="text" v-model="profile.social.facebook" placeholder="Your Facebook profile URL">
        </div>
      </div>

      <div class="form-section">
        <h3>Blog & Website</h3>
        <div class="blog-website-section">
          <div class="form-group wide-input">
            <label><i class="fas fa-globe"></i> Personal Website</label>
            <input type="url" v-model="profile.website" placeholder="https://your-website.com">
          </div>
          <div class="form-group wide-input">
            <label><i class="fas fa-blog"></i> Blog URL</label>
            <input type="url" v-model="profile.blog" placeholder="https://your-blog.com">
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>Interests</h3>
        <div class="interests-container">
          <div class="interests-list">
            <span v-for="interest in profile.interests" 
                  :key="interest" 
                  class="interest-tag">
              {{ interest }}
              <button @click="removeInterest(interest)" class="remove-interest">
                <i class="fas fa-times"></i>
              </button>
            </span>
          </div>
          <div class="add-interest">
            <input 
              type="text" 
              v-model="newInterest" 
              placeholder="Add a new interest"
              @keyup.enter="addInterest"
            >
            <button @click="addInterest" class="add-btn">
              <i class="fas fa-plus"></i> Add
            </button>
          </div>
          <div class="suggested-interests" v-if="suggestedInterests.length">
            <p>Suggested:</p>
            <div class="suggested-tags">
              <span v-for="interest in suggestedInterests" 
                    :key="interest" 
                    class="suggested-tag"
                    @click="addSuggestedInterest(interest)">
                {{ interest }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="saveProfile" class="save-btn">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
      profile: {
        name: '',
        dateOfBirth: '',
        gender: '',
        location: {
          country: '',
          city: ''
        },
        email: '',
        phone: '',
        occupation: '',
        company: '',
        about: '',
        preferences: {
          lookingFor: '',
          ageMin: null,
          ageMax: null
        },
        image: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
        social: {
          instagram: '',
          twitter: '',
          linkedin: '',
          facebook: ''
        },
        website: '',
        blog: '',
        interests: ['Photography', 'Travel', 'Cooking']
      },
      newInterest: '',
      suggestedInterests: [
        'Reading', 'Music', 'Movies', 'Sports', 'Art', 
        'Gaming', 'Fitness', 'Technology', 'Nature', 'Food'
      ]
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        if (this.validateFile(file)) {
          this.updateProfileImage(file)
        } else {
          alert('Please select an image file (JPG, PNG, or GIF) under 5MB')
        }
      }
    },
    validateFile(file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      const maxSize = 5 * 1024 * 1024 // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize
    },
    updateProfileImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.profile.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    saveProfile() {
      alert('Profile updated successfully!')
    },
    addInterest() {
      if (this.newInterest.trim() && !this.profile.interests.includes(this.newInterest.trim())) {
        this.profile.interests.push(this.newInterest.trim())
        this.newInterest = ''
      }
    },
    removeInterest(interest) {
      this.profile.interests = this.profile.interests.filter(i => i !== interest)
    },
    addSuggestedInterest(interest) {
      if (!this.profile.interests.includes(interest)) {
        this.profile.interests.push(interest)
      }
    }
  }
}
</script>

<style scoped>
.profile-image-section {
  text-align: center;
  margin-bottom: 2rem;
}

.image-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: filter 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.image-overlay i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.image-overlay span {
  font-size: 0.9rem;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-container:hover .profile-image {
  filter: blur(2px);
}

.hidden-file-input {
  display: none;
}

.form-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-section h3 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.basic-info-grid {
  width: 100%;
}

.info-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

input[type="text"],
input[type="date"],
input[type="email"],
input[type="tel"],
select,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.full-width {
  width: 100%;
  margin-top: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.save-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.save-btn:hover {
  background: #0056b3;
}

.interests-container {
  margin-top: 1rem;
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.interest-tag {
  background: #e9ecef;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-interest {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.add-interest {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-btn:hover {
  background: #218838;
}

.suggested-interests {
  margin-top: 1rem;
}

.suggested-interests p {
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.suggested-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.suggested-tag {
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
  transition: background 0.3s ease;
}

.suggested-tag:hover {
  background: #e9ecef;
}

.preferences-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.preferences-section h4 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.2rem;
}

.age-range {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.age-range input {
  width: 100px;
}

.age-range span {
  color: #666;
}

select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
}

input[type="date"],
input[type="email"],
input[type="tel"],
input[type="number"] {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .info-row {
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    width: 100%;
  }
}

.blog-website-section {
  width: 100%;
}

.wide-input {
  margin-bottom: 1.5rem;
}

.wide-input input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.wide-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

.wide-input label i {
  margin-right: 0.5rem;
  color: #666;
}

.wide-input input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
}

.my-profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}
</style> 