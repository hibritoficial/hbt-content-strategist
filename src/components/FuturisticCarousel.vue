<template>
  <div class="futuristic-carousel">
    <div class="carousel-container" ref="carouselContainer">
      <div 
        class="carousel-track" 
        :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="carousel-slide"
          :class="{ 
            'active': index === currentIndex,
            'prev': index === currentIndex - 1,
            'next': index === currentIndex + 1
          }"
          @click="goToSlide(index)"
        >
          <div class="slide-content">
            <div class="slide-glow"></div>
            <div class="slide-inner">
              <slot :slide="slide" :index="index" :isActive="index === currentIndex">
                <div class="default-content">
                  <h3>{{ slide.title }}</h3>
                  <p>{{ slide.description }}</p>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="carousel-nav">
      <v-btn 
        icon 
        variant="text" 
        @click="prevSlide"
        :disabled="currentIndex === 0"
        class="nav-btn prev-btn"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      
      <div class="nav-dots">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="nav-dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></div>
      </div>
      
      <v-btn 
        icon 
        variant="text" 
        @click="nextSlide"
        :disabled="currentIndex === slides.length - 1"
        class="nav-btn next-btn"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 5000
  }
})

const currentIndex = ref(0)
const carouselContainer = ref(null)
const slideWidth = computed(() => 320) // Fixed width for consistent spacing

const goToSlide = (index) => {
  currentIndex.value = index
}

const nextSlide = () => {
  if (currentIndex.value < props.slides.length - 1) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Auto-play functionality
let autoPlayInterval = null

const startAutoPlay = () => {
  if (props.autoPlay) {
    autoPlayInterval = setInterval(() => {
      if (currentIndex.value < props.slides.length - 1) {
        nextSlide()
      } else {
        currentIndex.value = 0
      }
    }, props.interval)
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
}

onMounted(() => {
  startAutoPlay()
})
</script>

<style scoped>
.futuristic-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  perspective: 1000px;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  padding: 0 50px;
}

.carousel-slide {
  flex: 0 0 320px;
  height: 100%;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
}

.carousel-slide:not(.active) {
  transform: scale(0.8) rotateY(15deg);
  opacity: 0.6;
  filter: blur(2px);
}

.carousel-slide.active {
  transform: scale(1) rotateY(0deg);
  opacity: 1;
  filter: blur(0);
  z-index: 10;
}

.carousel-slide.prev {
  transform: scale(0.85) rotateY(25deg);
  opacity: 0.7;
}

.carousel-slide.next {
  transform: scale(0.85) rotateY(-25deg);
  opacity: 0.7;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.1) 0%,
    rgba(160, 82, 45, 0.15) 50%,
    rgba(210, 180, 140, 0.1) 100%
  );
  border: 1px solid rgba(210, 180, 140, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.slide-content:hover {
  border-color: rgba(210, 180, 140, 0.6);
  box-shadow: 0 8px 32px rgba(210, 180, 140, 0.2);
}

.slide-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(210, 180, 140, 0.4) 50%, 
    transparent 70%
  );
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.carousel-slide.active .slide-glow {
  opacity: 1;
  animation: slideGlow 2s ease-in-out infinite alternate;
}

@keyframes slideGlow {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.slide-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
}

.default-content h3 {
  color: #D2B48C;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.default-content p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
}

/* Navigation */
.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
}

.nav-btn {
  background: rgba(210, 180, 140, 0.1) !important;
  border: 1px solid rgba(210, 180, 140, 0.3) !important;
  color: #D2B48C !important;
  transition: all 0.3s ease !important;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(210, 180, 140, 0.2) !important;
  border-color: rgba(210, 180, 140, 0.6) !important;
  box-shadow: 0 4px 16px rgba(210, 180, 140, 0.2) !important;
}

.nav-btn:disabled {
  opacity: 0.3 !important;
}

.nav-dots {
  display: flex;
  gap: 8px;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(210, 180, 140, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(210, 180, 140, 0.2);
}

.nav-dot.active {
  background: #D2B48C;
  box-shadow: 0 0 12px rgba(210, 180, 140, 0.6);
  transform: scale(1.2);
}

.nav-dot:hover:not(.active) {
  background: rgba(210, 180, 140, 0.5);
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-slide {
    flex: 0 0 280px;
  }
  
  .carousel-track {
    padding: 0 20px;
  }
  
  .slide-inner {
    padding: 16px;
  }
}
</style>