// 📦 React Resume Generator App with Enhanced UI

import React, { useState } from "react";
import axios from "axios";
import "./tailwind.css";

const App = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
    projects: ""
  });
  const [template, setTemplate] = useState("modern");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, form, {
        headers: { Authorization: sessionToken },
      });
      alert("✅ Profile saved!");
    } catch (err) {
      alert("❌ Save failed: " + err.message);
    }
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/generate`, {
        templateName: template,
      }, {
        headers: { Authorization: sessionToken },
      });
      setDownloadUrl(res.data.downloadUrl);
    } catch (err) {
      alert("❌ PDF generation failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-indigo-100">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10 tracking-tight">Cloud Resume Builder</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(form).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                name={field}
                placeholder={`Enter your ${field}`}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose a Resume Template:</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            💾 Save Profile
          </button>

          <button
            onClick={handleGenerate}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            📄 Generate PDF
          </button>
        </div>

        {downloadUrl && (
          <div className="mt-8 text-center">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-lg font-semibold text-green-700 hover:underline"
            >
              ✅ Click here to download your resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
