import React, { useState, useEffect } from "react";
import "./Items.css";

const ItemBrowse = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setError(null);

      try {
        const response = await fetch(
          `https://mkos3c7azl.execute-api.eu-north-1.amazonaws.com/dev`
        );
        const data = await response.json();

        console.log("📦 Full API Response:", data);

        if (Array.isArray(data)) {
          setItems(data);
        } else if (Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          console.error("❌ Unexpected response format", data);
          setError("Unexpected data format from backend.");
          setItems([]);
        }

        setCurrentIndex(0);
      } catch (err) {
        console.error("❌ Failed to fetch items:", err);
        setError("Failed to load items. Check backend or network.");
        setItems([]);
      }
    };

    fetchItems();
  }, []);

  const handleDecision = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="item-page">
      <div className="browse-wrapper">
        <header className="browse-header">
          <h1>BarterMatch</h1>
          <p>Discover unique items near you</p>
        </header>

        <main className="browse-main">
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : items.length === 0 ? (
            <div className="no-items">
              <img
                src={`${process.env.PUBLIC_URL}/assets/no-items.png`}
                alt="No items"
              />
              <h3>No items found</h3>
              <p>Check back later!</p>
            </div>
          ) : currentItem ? (
            <div className="item-card fade-in">
              <img
                src={
                  currentItem.image_url ||
                  `${process.env.PUBLIC_URL}/assets/placeholder.png`
                }
                alt={currentItem.title}
                className="item-image"
              />
              <div className="item-details">
                <h2>{currentItem.title}</h2>
                <p className="location">{currentItem.category}</p>
                <p>{currentItem.description}</p>
              </div>

              <div className="btn-group">
                <button className="btn reject" onClick={handleDecision}>
                  Not Interested
                </button>
                <button className="btn accept" onClick={handleDecision}>
                  Interested
                </button>
              </div>
            </div>
          ) : (
            <div className="no-items">
              <img
                src={`${process.env.PUBLIC_URL}/assets/no-items.png`}
                alt="No more items"
              />
              <h3>That’s all for now!</h3>
              <p>You’ve seen everything we have. New items may appear on refresh.</p>
             
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ItemBrowse;
