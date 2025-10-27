import React from 'react';

const UploadPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload your Excel file</h2>
      <input type="file" accept=".xlsx, .xls" />
      <button>Upload</button>
    </div>
  );
};

export default UploadPage;
