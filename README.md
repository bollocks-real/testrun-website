# 🎬 TestRun Video Hub

A dynamic website for the TestRun YouTube channel (@testrun798) with integrated YouTube Data API v3.

## ✨ Features

- 📺 **Live Video Gallery** - Automatically displays the 12 most recent videos from the channel
- 🎥 **Embedded Player** - Watch videos directly on the website
- 🔗 **YouTube Links** - Quick access to watch on YouTube
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **YouTube-Inspired UI** - Dark theme with YouTube-red accents
- ⚡ **Fast Loading** - Optimized API calls and caching
- 🔄 **Refresh Button** - Manually reload videos anytime

## 🚀 Quick Start

### Step 1: Get Your API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create an API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your new API key

### Step 2: Add Your API Key

1. Open `script.js`
2. Find this line (near the top):
   ```javascript
   const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### Step 3: Deploy

#### Option A: GitHub Pages (Free)
1. Go to your repository **Settings**
2. Scroll to **Pages**
3. Under "Source", select "Deploy from a branch"
4. Choose `main` branch
5. Click **Save**
6. Your site will be live at: `https://bollocks-real.github.io/testrun-website`

#### Option B: Any Web Host
Simply upload all files to your hosting provider

## 📁 File Structure

```
testrun-website/
├── index.html      # Main HTML structure
├── styles.css      # YouTube-inspired styling
├── script.js       # YouTube API integration
└── README.md       # This file
```

## 🎯 What Each File Does

### `index.html`
- Page structure and layout
- Navigation bar with YouTube link
- Hero section with call-to-action buttons
- Video grid container
- Modal for embedded video player
- Footer with links

### `styles.css`
- YouTube-inspired dark theme (#0f0f0f background)
- Responsive grid layout
- Hover effects and animations
- Mobile-friendly breakpoints
- Modal styling

### `script.js`
- YouTube Data API v3 integration
- Fetches live videos from @testrun798
- Creates video cards dynamically
- Modal player functionality
- Error handling and user guidance

## 🔧 Customization

### Change Video Count
In `script.js`, modify:
```javascript
const MAX_VIDEOS = 12; // Change to desired number
```

### Change Channel
To display videos from a different channel, find the `CHANNEL_ID`:
1. Go to the channel's YouTube page
2. Click "About"
3. Look for the channel ID in the URL or share options
4. Replace `CHANNEL_ID` in `script.js`

### Customize Colors
All colors in `styles.css` use CSS variables approach. Edit:
- `#ff0000` (YouTube red) to your brand color
- `#0f0f0f` (Dark background) to your preference

## 🛠️ Troubleshooting

### "Unable to load videos" Error

**API Key Issues:**
- ✅ Verify API key is copied correctly (no spaces)
- ✅ Check YouTube Data API v3 is enabled
- ✅ Confirm API key has YouTube API access

**CORS Issues:**
- YouTube API works best in production (public domain)
- Local testing might require additional setup

**Empty Video List:**
- Verify channel ID is correct
- Check channel has public videos
- Ensure API quota isn't exceeded (100 requests/second limit)

### Videos Not Loading After Deploy
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check browser console for error messages: `F12` → Console tab
- Verify API key is correctly set in `script.js`

## 📊 API Usage

This website uses the **YouTube Data API v3** with these quotas:
- **Free Tier**: 10,000 units/day
- Each video fetch costs ~101 units
- Loading 12 videos ≈ 101 units
- You can load videos ~99 times per day

For high-traffic sites, consider [YouTube API paid quota](https://developers.google.com/youtube/youtube_api_overview#quota).

## 🔐 Security Notes

- ⚠️ Your API key is visible in the source code
- For production, consider using a backend server to manage the API key
- Restrict your API key to specific referrers in Google Cloud Console:
  1. Go to Credentials
  2. Click on your API key
  3. Set "Application restrictions" to "HTTP referrers (websites)"
  4. Add your domain

## 🌐 Deployment Checklist

- [ ] API key obtained from Google Cloud Console
- [ ] API key added to `script.js`
- [ ] Tested locally by opening `index.html` in browser
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled in repository settings
- [ ] Verified site is live and videos are loading

## 📚 Resources

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Google Cloud Console](https://console.cloud.google.com/)
- [GitHub Pages Setup Guide](https://pages.github.com/)
- [YouTube Channel URL](https://www.youtube.com/@testrun798)

## 💡 Future Enhancements

- [ ] Search/filter videos by title
- [ ] Video categories or playlists
- [ ] Comments section integration
- [ ] Video statistics (views, likes)
- [ ] Subscribe button with notifications
- [ ] Dark/Light theme toggle
- [ ] Backend server for API key security

## 📄 License

This project is open source and available for personal and commercial use.

---

**Made with ❤️ for TestRun Channel**

Questions? Check the [YouTube API docs](https://developers.google.com/youtube/v3) or visit the [GitHub repo](https://github.com/bollocks-real/testrun-website).
