import { Card } from "primereact/card";

const TruckCard = ({ props: truck }) => {
  return (
    <Card title={truck.name} subTitle={truck.description}>
      <p className="mt-0">
        <span className="font-italic">Now Live at:</span>
        <br />
        {truck.liveAddress}
      </p>
    </Card>
  );
};

export default TruckCard;
