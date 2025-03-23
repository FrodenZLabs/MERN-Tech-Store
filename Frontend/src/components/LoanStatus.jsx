const LoanStatus = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h4 className="text-lg font-semibold">Loan Applications</h4>
      <ul className="mt-2">
        <li className="text-gray-600">
          📌 Laptop - <span className="text-green-500">Approved</span>
        </li>
        <li className="text-gray-600">
          📌 Smartphone - <span className="text-yellow-500">Pending</span>
        </li>
        <li className="text-gray-600">
          📌 Tablet - <span className="text-red-500">Rejected</span>
        </li>
      </ul>
    </div>
  );
};

export default LoanStatus;
