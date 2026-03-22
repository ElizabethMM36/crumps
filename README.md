# Crumps 🍽️

A beginner-friendly web application built using **React** and **Firebase** to reduce food waste by connecting restaurants with diners.

🔗 **Live Demo:** https://datacrumps.web.app/

---

## 📌 Overview

**Crumps** is a food-sharing platform designed to tackle the problem of food waste in restaurants.

After closing hours, restaurants often have unsold food that goes to waste. This platform allows restaurants to list available surplus food along with details like location and time, so nearby diners can discover and access it.

---

## 🚀 Features

### 🔐 Authentication
- Firebase Authentication (Email & Password)
- Role-based access:
  - Customer
  - Restaurant
  - Admin

### 🍛 Restaurant Features
- Add surplus food after closing time
- Provide details like location, food items, and availability
- Manage food listings

### 🍽️ Customer Features
- Search food using **fuzzy search**
- Find restaurants based on location
- View available food items

### 🛠️ Admin Features
- Verify restaurants before allowing them to post

---

## 🧰 Tech Stack

- **Frontend:** React, HTML, CSS  
- **Backend:** Firebase Authentication  
- **Database:** Firebase Firestore  
- **Hosting:** Firebase Hosting  
- **Search:** Fuzzy Search  

---

## 📂 Project Structure

```plaintext
/src
  /components
  /pages
  /contexts
  /firebase
  /utils
  App.jsx
  index.js
```

---

## ⚙️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/crumps.git
cd crumps
```

2. Install dependencies
```bash
npm install
```

3. Add Firebase configuration

Create a file:
```
/src/firebase/config.js
```

Add your Firebase config:
```js
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

4. Run the app
```bash
npm start
```

---

## ✨ Future Improvements

- Order and pickup system
- Notifications
- Better location-based search
- Restaurant analytics dashboard

---

## 🤝 Contributing

Feel free to contribute by opening issues or submitting pull requests.
