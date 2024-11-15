import { Link } from "react-router-dom";
import Table from "../../components/elements/table/user/table";
import { useEffect, useState } from "react";

const DashboardUser = () => {
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }

        const result = await response.json();

        if (result.code === 200 && result.status === "OK") {
          setUserName(result.data.name); // Set nama pengguna
          setUserData(result.data); // Simpan data pengguna lengkap ke state
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Erro fetch: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
            <h2 className="text-xl">Hi, {userName || userData.name}!</h2>
          </div>
        </div>

        {/* Tautan Pengaduan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link to="/dashboard/new-report">
            <div className="bg-slate-50 flex items-center py-6 px-12 text-xl space-x-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <i className="bx bxs-notepad text-orange-500 text-4xl" />
              <h1>Buat Pengaduan</h1>
            </div>
          </Link>
          <Link to="/dashboard/history">
            <div className="bg-slate-50 flex items-center py-6 px-12 text-xl space-x-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <i className="bx bx-history text-orange-500 text-4xl" />
              <h1>Riwayat Pengaduan</h1>
            </div>
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default DashboardUser;
