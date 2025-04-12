# 🌍 TripCraft - AI-Powered Trip Planner

**TripCraft** is an intelligent trip planning web app that uses AI and location APIs to create personalized travel itineraries. Just enter your preferences like destination, budget, duration, and travel style—and TripCraft takes care of the rest with smart suggestions, maps, and hotel listings.

---

## ✨ Features

- 🧠 **AI-Based Trip Generation** using **Gemini API**  
- 🗺️ **Google Maps Integration** for visualizing locations  
- 🏨 **Smart Hotel Suggestions** using **OpenStreetMap** + **Wikipedia APIs**  (optional) prefer to use ggl place api
- 📍 **Nearby Places** powered by **Google Places API**  
- 🔐 **Google Sign-In Authentication** via **Firebase Auth**  
- ⚠️ **Reliable Image Fallback Handling** for broken image links  
- 🎨 **Responsive UI** with **Tailwind CSS**

---

## 🧰 Tech Stack

| Category          | Technology                            |
|-------------------|----------------------------------------|
| Frontend          | React.js                               |
| Styling           | Tailwind CSS                           |
| AI Integration    | Gemini API                             |
| Maps & Location   | Google Maps API, Google Places API     |
| Authentication    | Google Auth via Firebase               |
| Hosting & Backend | Firebase Hosting + Firestore           |
| Data Sources      | OpenStreetMap, Wikipedia API           |

---

## ⚙️ Installation & Setup

### Install Dependencies

```bash
npm install
```

---

### Create `.env` File

Create a `.env` file in the root and add your keys:

```env

REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
```

---

### Run the App Locally

```bash
npm start
```

---

## 🔥 Firebase Hosting Deployment

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

---

### Login to Firebase

```bash
firebase login
```

---

### Initialize Firebase Project

```bash
firebase init
```

---

### Build the React App

```bash
npm run build
```

---

### Deploy to Firebase

```bash
firebase deploy
```


