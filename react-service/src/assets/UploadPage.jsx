import { useEffect, useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const [page, setPage] = useState(0);
  const size = 2;

  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 SESSION CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/");
    }
  }, [navigate]);

  // Fetch files
  const fetchFiles = async (pageNumber = 0) => {
    try {
      const response = await axios.get(
        `/summary?page=${pageNumber}&size=${size}`
      );

      setFiles(response.data.content);
      setTotalPages(response.data.totalPages);
      setPage(pageNumber);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch files");
    }
  };

  useEffect(() => {
    fetchFiles(0);
  }, []);

  // Upload file
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(`/summary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully");
      setFile(null);
      fetchFiles(page);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = (id) => {
    navigate(`/summary/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this file?"))
        return;

      await axios.delete(`/summary/${id}`);

      alert("Deleted successfully");
      fetchFiles(page);

    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-300">

      <Navbar />

      <div className="pt-32 p-10">

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Upload Document
          </h2>

          <form onSubmit={handleUpload} className="mb-8">
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mb-4"
            />

            <button
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>

          <h3 className="text-xl font-semibold mb-4">
            Uploaded Files
          </h3>

          {files.length === 0 && (
            <p className="text-gray-500">No files uploaded yet</p>
          )}

          {files.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded"
            >
              <span>{item.fileName}</span>

              <div className="flex gap-3 items-center">

                <button
                  onClick={() => handleSummarize(item.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Summarize
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 text-xl font-bold hover:text-red-800"
                >
                  ×
                </button>

              </div>
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => fetchFiles(page - 1)}
              disabled={page === 0}
              className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="py-2">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={() => fetchFiles(page + 1)}
              disabled={page + 1 >= totalPages}
              className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UploadPage;