
type StatCardProps = {
  image: string;
  title: string;
  count: number;
  bgColor: string;
};

const StatCard = ({ image, title, count, bgColor }: StatCardProps) => {
  return (
    <div
      className="box-Progress p-3 shadow-sm rounded text-center h-100"
      style={{ backgroundColor: bgColor, minHeight: "180px" }}
    >
      <img src={image} alt={`${title} Icon`} className="img-fluid mb-2" />
      <p className="fw-bold">{title}</p>
      <h3 className="text-primary">{count}</h3>
    </div>
  );
};

export default StatCard;
