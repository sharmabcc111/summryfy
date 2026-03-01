import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function SummaryPage() {
  const { id } = useParams();

  const [summary, setSummary] = useState("Loading summary...");
  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/summary/${id}`);

        console.log("Backend Response:", response.data);

        if (response.data?.summaryText) {
          setSummary(response.data.summaryText);
        } else {
          setSummary("No summary found");
        }

      } catch (error) {
        console.error(error);
        setSummary("Failed to load summary");
      }
    };

    fetchSummary();
  }, [id]);

  return (
    <div className="min-h-screen bg-blue-200">

      {/* ✅ Navbar */}
      <Navbar />

      {/* Padding because navbar is fixed */}
      <div className="pt-32 flex justify-center items-center p-10">

        <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">

          <h2 className="text-2xl font-bold mb-5 text-blue-900">
            Summary Result
          </h2>

          <p className="text-gray-700 whitespace-pre-line">
            {summary}
          </p>

        </div>

      </div>
    </div>
  );
}

export default SummaryPage;