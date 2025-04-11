import React from 'react';

interface StatCardProps {
  title: string;
  count: number;
  image: string;
  bgColor: string;
  isDarkMode?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, image, bgColor, isDarkMode }) => {
  return (
    <div
      className="box-Progress p-3 shadow-sm rounded text-center h-100"
      style={{
        backgroundColor: bgColor,
        minHeight: "180px",
        color: isDarkMode ? "#f0f0f0" : "inherit"
      }}
    >
      <img src={image} alt={`${title} Icon`} className="img-fluid mb-2" />
      <p className="fw-bold">{title}</p>
      <h3 className={isDarkMode ? "text-info" : "text-primary"}>{count}</h3>
    </div>
  );
};

export default StatCard;