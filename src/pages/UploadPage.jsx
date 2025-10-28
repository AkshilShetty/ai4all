import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";

const UploadPage = () => {
  const { accounts } = useMsal();
  const [file, setFile] = useState(null);
  const username = accounts[0]?.username || "Anonymous";

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);

    const response = await fetch(
      "https://<your-function-app-name>.azurewebsites.net/api/UploadToBlob",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("File uploaded successfully!");
    } else {
      alert("Upload failed!");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPage;
