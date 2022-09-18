import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";
import Home from "./pages/home";
import "./App.css";
const firebaseConfig = {
  apiKey: "AIzaSyB21haGNJWUBxBkuaLqbM-WivO5e-7dasc",
  authDomain: "truck-or-treat.firebaseapp.com",
  projectId: "truck-or-treat",
  storageBucket: "truck-or-treat.appspot.com",
  messagingSenderId: "187978776851",
  appId: "1:187978776851:web:d0f40420cfa9bffdb05ae6",
  measurementId: "G-2E0RCKD08B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
