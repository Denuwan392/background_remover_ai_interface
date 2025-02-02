import React, { useState } from 'react';
import axios from 'axios';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function App() {
  const [file, setFile] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClear = () => {
    setFile(null);
    setOutputImage(null);
  };

  const handleGenerate = async () => {
    if (!file) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('https://4e78-34-141-227-103.ngrok-free.app/remove-background', formData, {
        responseType: 'blob', // To handle binary data
      });

      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      setOutputImage(imageUrl);
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Failed to process the image.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
       
        <h1 style={styles.title}>Image Background Remover</h1>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftSection}>
          <h2 style={styles.header}>Upload Image</h2>
          
          {/* Display uploaded image preview */}
          {file && (
            <div style={styles.previewContainer}>
              <img 
                src={URL.createObjectURL(file)} 
                alt="Uploaded Preview" 
                style={styles.previewImage} 
              />
            </div>
          )}
          
          <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        style={{ display: 'none' }} // Hide the input element visually
      />
    </Button>
          <div style={styles.buttonContainer}>
          <Stack direction="row" spacing={1}>
            <Button 
              onClick={handleClear} 
              variant="outlined"
            >
              Clear
            </Button>
            <Button 
              variant="contained"
              onClick={handleGenerate} 
              disabled={loading} 
              
            >
              {loading ? 'Processing...' : 'Remove'}
            </Button>
          </Stack>
          </div>
        </div>

        {/* Gap between the two sections */}
        <div style={styles.sectionGap}></div>

        <div style={styles.rightSection}>
          <h2 style={styles.header}>Processed Image</h2>
          {outputImage ? (
            <div style={styles.imageContainer}>
              <img src={outputImage} alt="Processed" style={styles.outputImage} />
            </div>
          ) : (
            <p style={styles.noImageText}>No image generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}



const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212', // Dark background color
    color: '#f1f1f1', // Light text for dark mode
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    textAlign: 'center',
    borderBottom: '3px solid #444',
  },
  logo: {
    width: '50px',
    marginRight: '20px',
    verticalAlign: 'middle',
  },
  title: {
    display: 'inline-block',
    color: '#fff',
    fontSize: '28px',
    verticalAlign: 'middle',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    marginTop: '20px',
    maxWidth: '1200px', // Increased width to scale up sections
    margin: 'auto',
  },
  leftSection: {
    width: '600px',
    backgroundColor: '#1e1e1e',
    padding: '30px', // Increased padding
    borderRadius: '8px',
    border: '2px solid #444', // Border around the section
    textAlign: 'center',
  },
  rightSection: {
    width: '600px',
    height: '300px',
    backgroundColor: '#1e1e1e',
    padding: '30px', // Increased padding
    borderRadius: '8px',
    border: '2px solid #444', // Border around the section
    textAlign: 'center',
  },
  sectionGap: {
    width: '4%', // Gap between the two sections
  },
  header: {
    color: '#fff',
    fontSize: '22px',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#fff',
    width: '80%',
    margin: '15px 0',
  },
  previewContainer: {
    marginBottom: '10px',
    textAlign: 'center',
  },
  previewImage: {
    maxWidth: '250px', // Scaled up preview image
    height: 'auto',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  clearButton: {
    padding: '12px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '48%',
  },
  generateButton: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '48%',
  },
  loadingButton: {
    padding: '12px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'not-allowed',
    fontSize: '16px',
    width: '48%',
  },
  imageContainer: {
    marginTop: '-20px',
    maxWidth: '100%',
  },
  outputImage: {
    maxWidth: '200px', // Scaled up output image
    height: 'auto',
    borderRadius: '10px',
  },
  noImageText: {
    color: '#ccc',
    fontSize: '18px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',  // Center buttons horizontally
    gap: '10px',               // Add space between "Clear" and "Generate" buttons
    marginTop: '20px',         // Add space between buttons and the upload button
  },
  
  leftSection: {
    width: '600px',
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '8px',
    border: '2px solid #444',
    textAlign: 'center',
    display: 'flex',           // Enable flexbox
    flexDirection: 'column',   // Arrange children in a column
    alignItems: 'center',      // Center items horizontally
    gap: '20px',               // Add space between children
  },
  
    
};

export default App;
