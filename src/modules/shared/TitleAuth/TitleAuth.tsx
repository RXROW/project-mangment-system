interface TitleProps {
  name: string;
}
function TitleAuth({ name }: TitleProps) {
  return (
    <div className="mb-5 text-start">
      <p className="m-0 text-light">Welcome to PMS</p>
      <h2 className="m-0 fs-1" style={{ color: "rgba(239, 155, 40, 1)" }}>
        {name}
      </h2>
      <span className="line"></span>
    </div>
  );
}
export default TitleAuth;
