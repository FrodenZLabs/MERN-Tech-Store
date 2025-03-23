import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import {
  fetchProducts,
  fetchUserPrediction,
} from "../../redux/services/authService";
import { RingLoader } from "react-spinners";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creditScore, setCreditScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const { currentUser } = useSelector((state) => state.authentication);
  const userId = currentUser.user._id;

  useEffect(() => {
    const loadPrediction = async () => {
      setLoading(true);
      const existingData = await fetchUserPrediction(userId);
      setCreditScore(existingData.guarantor_credit_score);
      setRiskLevel(existingData.risk_score);
      setLoading(false);
    };

    const loadProducts = async () => {
      setLoading(true);
      const latestProducts = await fetchProducts({
        sortOrder: "createdAt_desc",
        limit: 6,
      });
      setProducts(latestProducts);
      setLoading(false);
    };

    loadProducts();
    loadPrediction();
  }, [userId]);

  return (
    <div>
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* User Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">
          Welcome,{" "}
          <span className="italic underline text-red-500">
            {currentUser.user.username}
          </span>
        </h2>
        <p className="text-gray-900 mt-2">
          Your Credit Score:{" "}
          <span className="font-bold text-blue-600">{creditScore}</span>
        </p>
        <p className="text-gray-900">
          Risk Level:{" "}
          <span
            className={`text-md font-bold mt-2 animate-fade-in ${
              riskLevel === 0
                ? "text-green-600 bg-green-100 px-4 py-2 rounded-md inline-block"
                : riskLevel === 1
                ? "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md inline-block"
                : "text-red-600 bg-red-100 px-2 py-1 rounded-md inline-block"
            }`}
          >
            {riskLevel === 0 ? "Low" : riskLevel === 1 ? "Medium" : "High"}
          </span>
        </p>
      </div>

      {/* Tech Products with Dynamic Pricing */}
      <h3 className="text-xl font-semibold mt-6">Recent Tech Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item._id} item={item} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
