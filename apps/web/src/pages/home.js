import { useQuery, gql } from "@apollo/client";
import TruckCard from "../components/truck-card";

const Home = () => {
  const GET_TRUCKS = gql`
    query Truck {
      trucks {
        id
        name
        schedules {
          id
          open
          close
          dayOfWeek
          address
        }
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TRUCKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  return (
    <div className="grid">
      {data.trucks.map((m) => (
        <div key={m.id} className="lg:col-3">
          <TruckCard props={m}></TruckCard>
        </div>
      ))}
    </div>
  );
};

export default Home;
