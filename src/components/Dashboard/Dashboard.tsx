import { useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";

const Dashboard = () => {
  const { name, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return null; // Or redirect to login if not using ProtectedRoute
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {name}!</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Menu Groups</h2>
          <p className="text-3xl">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Menu Items</h2>
          <p className="text-3xl">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Added 3 new items today</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
