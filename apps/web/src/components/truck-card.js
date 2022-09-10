import { Card } from "primereact/card";

const TruckCard = ({ props: truck }) => {
  console.log(truck);
  return (
    <Card title={truck.name} subTitle={truck.description}>
      <ul>
        {truck.schedules.map((m) => {
          return (
            <li key={m.id}>
              Day: {m.dayOfWeek}
              <br />
              Open: {m.open} <br />
              Close: {m.close}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default TruckCard;
