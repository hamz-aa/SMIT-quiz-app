const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-3xl mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
