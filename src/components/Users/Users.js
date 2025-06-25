import React, { useState, useEffect, useRef } from 'react';
import './Users.css';

const url = "https://mkos3c7azl.execute-api.eu-north-1.amazonaws.com/dev";

function Users() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [inputVisibility, setInputVisibility] = useState({
    title: false,
    description: false,
    category: false,
    image: false
  });
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setInputVisibility(prev => ({ ...prev, title: true })), 100),
      setTimeout(() => setInputVisibility(prev => ({ ...prev, description: true })), 300),
      setTimeout(() => setInputVisibility(prev => ({ ...prev, category: true })), 500),
      setTimeout(() => setInputVisibility(prev => ({ ...prev, image: true })), 700)
    ];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    
    const maxSize = 2 * 1024 * 1024; 

    if (file.size > maxSize) {
      alert('File size should not exceed 2MB.');
      return;
    }
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setBase64Image(base64);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async () => {
    if(!image || !category || !description || !title){
      alert("All fields are mandatory");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          title: title,
          user_id: "user1",
          description: description,
          category: category
        }),
      });
      if (res.ok) {
        setBase64Image('');
        setImage(null);
        setTitle('');
        setCategory('');
        setDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        alert("Item uploaded successfully!");
      } else {
        const errorText = await res.json();
        alert("Submission failed: " + errorText.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className="form">
        <h2>Product Details</h2>
        <input
          className={inputVisibility.title ? 'input-visible' : 'input-hidden'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product name"
        />
        <input
          className={inputVisibility.description ? 'input-visible' : 'input-hidden'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
        />
        <input
          className={inputVisibility.category ? 'input-visible' : 'input-hidden'}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          ref={fileInputRef}
          className={inputVisibility.image ? 'input-visible' : 'input-hidden'}
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleUpload}
          placeholder='Image'
        />
        {image && (
          <img src={URL.createObjectURL(image)} alt={title} />
        )}
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <div className="spinner"></div>}
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
export default Users;