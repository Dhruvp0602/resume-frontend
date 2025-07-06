import React, { useState } from "react";
import axios from "axios";

const ProfileForm = ({ session }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
    projects: ""
  });

  const [templateName, setTemplateName] = useState("modern");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitProfile = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: session
          }
        }
      );
      alert("Profile saved!");
    } catch (err) {
      alert("Error saving profile: " + err.message);
    }
  };

  const generatePDF = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate`,
        { templateName },
        {
          headers: {
            Authorization: session
          }
        }
      );
      setDownloadUrl(res.data.downloadUrl);
    } catch (err) {
      alert("Error generating PDF: " + err.message);
    }
  };

  return (
    <div>
      <h2>Resume Profile</h2>
      {["name", "email", "education", "experience", "skills", "projects"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          onChange={handleChange}
          style={{ display: "block", margin: "5px 0", width: "300px" }}
        />
      ))}

      <button onClick={submitProfile}>Save Profile</button>

      <h3>Choose Resume Template</h3>
      <select value={templateName} onChange={(e) => setTemplateName(e.target.value)}>
        <option value="modern">Modern</option>
        <option value="classic">Classic</option>
        <option value="minimal">Minimal</option>
      </select>

      <br />
      <button onClick={generatePDF} style={{ marginTop: "10px" }}>
        Generate Resume PDF
      </button>

      {downloadUrl && (
        <div style={{ marginTop: "10px" }}>
          ✅ <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download Resume</a>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
