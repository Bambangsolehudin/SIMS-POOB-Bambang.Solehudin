// src/components/DashboardCard.js

// eslint-disable-next-line react/prop-types
const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-xl text-blue-500">{value}</p>
    </div>
  );
};

export default DashboardCard;
