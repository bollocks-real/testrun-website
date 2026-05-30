// YouTube Data API Configuration
const YOUTUBE_API_KEY = 'AIzaSyDhpxhZWE4QAJRpqYAbyKVodpLG8P9sfuQ'; // Replace with your API key
const CHANNEL_ID = 'UCL8bh3lW4OLz4w_1xFcPIrQ'; // @testrun798 channel ID
const MAX_VIDEOS = 12;

// State management
let videos = [];
let currentVideoId = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadVideos();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  const refreshBtn = document.getElementById('refreshBtn');
  const modal = document.getElementById('videoModal');
  const closeBtn = document.querySelector('.close-modal');
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadVideos);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Load videos from YouTube API
async function loadVideos() {
  const videoGrid = document.getElementById('videoGrid');
  
  // Show loading state
  videoGrid.innerHTML = '<div class="loading">Loading videos</div>';
  
  try {
    // Check if API key is set
    if (YOUTUBE_API_KEY === 'YOUR_API_KEY_HERE') {
      showError('API Key Not Set', 'Please add your YouTube API key to script.js');
      return;
    }
    
    // Fetch channel uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error(`Channel fetch failed: ${channelResponse.status}`);
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      showError('Channel Not Found', 'Unable to find the YouTube channel. Check the channel ID.');
      return;
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    
    // Fetch videos from uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${MAX_VIDEOS}&key=${YOUTUBE_API_KEY}&order=date`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`Videos fetch failed: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    
    if (!videosData.items || videosData.items.length === 0) {
      showError('No Videos Found', 'The channel has no public videos.');
      return;
    }
    
    videos = videosData.items;
    displayVideos(videos);
    
  } catch (error) {
    console.error('Error loading videos:', error);
    
    if (error.message.includes('quota')) {
      showError('API Quota Exceeded', 'Too many requests. Please try again later.');
    } else if (error.message.includes('API key')) {
      showError('Invalid API Key', 'Please check your YouTube API key in script.js');
    } else {
      showError('Error Loading Videos', error.message);
    }
  }
}

// Display videos in grid
function displayVideos(videoList) {
  const videoGrid = document.getElementById('videoGrid');
  videoGrid.innerHTML = '';
  
  if (videoList.length === 0) {
    videoGrid.innerHTML = '<div class="no-videos">No videos available</div>';
    return;
  }
  
  videoList.forEach(item => {
    const videoId = item.contentDetails.videoId;
    const snippet = item.snippet;
    
    const videoCard = createVideoCard({
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.medium.url,
      publishedAt: new Date(snippet.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    });
    
    videoGrid.appendChild(videoCard);
  });
}

// Create individual video card
function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  
  const shortDescription = video.description.substring(0, 100) + (video.description.length > 100 ? '...' : '');
  
  card.innerHTML = `
    <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')">
      <div class="play-icon">▶</div>
    </div>
    <div class="video-info">
      <h3>${escapeHtml(video.title)}</h3>
      <div class="video-date">${video.publishedAt}</div>
      <div class="video-description">${escapeHtml(shortDescription)}</div>
      <div class="video-actions">
        <button class="btn btn-primary" onclick="playVideo('${video.id}')">Watch Here</button>
        <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" class="btn btn-secondary">YouTube</a>
      </div>
    </div>
  `;
  
  return card;
}

// Play video in modal
function playVideo(videoId) {
  currentVideoId = videoId;
  const modal = document.getElementById('videoModal');
  const iframe = document.querySelector('#videoModal iframe');
  
  // Set iframe src to YouTube embed
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal
function closeModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.querySelector('#videoModal iframe');
  
  modal.classList.remove('active');
  iframe.src = ''; // Stop video playback
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Show error message
function showError(title, message) {
  const videoGrid = document.getElementById('videoGrid');
  
  videoGrid.innerHTML = `
    <div class="error-message">
      <h3 style="color: #ff0000; margin-bottom: 1rem;">${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: #8a8a8a;">
        Need help? Check the <a href="https://github.com/bollocks-real/testrun-website#troubleshooting" target="_blank">troubleshooting guide</a>
      </p>
    </div>
  `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
