import React, { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../App";
import TruckCard from "../components/truck-card";

const Home = () => {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    async function getTrucks() {
      const querySnapshot = await getDocs(
        query(collection(db, "truck"), where("isLive", "==", true))
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTrucks(data);
    }
    getTrucks();
  }, []);

  return (
    <div className="grid">
      {trucks.map((m) => (
        <div key={m.name} className="lg:col-3">
          <TruckCard props={m}></TruckCard>
        </div>
      ))}
    </div>
  );
};

export default Home;
