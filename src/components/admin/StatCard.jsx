import React from "react";

function StatCard({ title, value, icon, bgColor, textColor, bgColorIcon}) {
  return (
    <div className={`p-4 rounded-lg shadow-lg ${bgColor}`}>
      <div className="flex items-center">
        <div className={`text-xl mr-4 p-3 rounded-full ${bgColorIcon}`}>{icon}</div>
        <div>
          <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
          <h2 className={`text-2xl font-bold ${textColor}`}>{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
