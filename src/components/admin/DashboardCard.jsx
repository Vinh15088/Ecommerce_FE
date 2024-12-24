import React from "react";

function DashboardCard({ title, amount, cash, creditCard, zaloPay, vnPay }) {
  return (
    <div className={`p-4  rounded-lg shadow-lg bg-white text-gray-600`}>
      <h2 className="text-xl text-center font-semibold text-slate-600 border-b border-gray-300 pb-2">{title}</h2>
      <p className="text-2xl text-center font-bold text-red-400 pt-2">{Number(amount).toLocaleString('vi-VN')} VND</p>
      {cash && (
        <div className="mt-2 text-sm">
          <p>Cash: {Number(cash).toLocaleString('vi-VN')} VND</p>
          <p>Zalo Pay: {Number(zaloPay).toLocaleString('vi-VN')} VND</p>
          <p>VN Pay: {Number(vnPay).toLocaleString('vi-VN')} VND</p>
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
