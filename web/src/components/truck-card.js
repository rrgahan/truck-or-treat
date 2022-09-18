import { Card } from "primereact/card";

const TruckCard = ({ props: truck }) => {
  return (
    <Card title={truck.name} subTitle={truck.description} className="h-full">
      <p className="mt-0">
        {truck.liveAddress && (
          <>
            <span className="font-italic">Now Live at:</span>
            <br />
            {truck.liveAddress}
          </>
        )}
      </p>
    </Card>
  );
};

export default TruckCard;
