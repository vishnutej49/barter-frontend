import React, { useState, useEffect } from "react";
import "./Items.css";

const dummyData = {
  1: [
    {
      id: 1,
      title: "Mountain Bike",
      location: "Hyderabad",
      description:
        "A sturdy mountain bike in great condition. Perfect for off-road adventures and daily commutes.",
      image:
        "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Vintage Wooden Chair",
      location: "Bangalore",
      description:
        "Handcrafted wooden chair from reclaimed teak. Mid-century modern design with slight wear.",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
    },
  ],
  2: [
    {
      id: 3,
      title: "Acoustic Guitar",
      location: "Chennai",
      description:
        "Almost new Yamaha acoustic guitar. Includes soft case and extra strings.",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Designer Table Lamp",
      location: "Delhi",
      description:
        "LED lamp with adjustable brightness. Touch controls and energy efficient.",
      image:
        "https://images.unsplash.com/photo-1606170033648-5d55a0fd4c99?auto=format&fit=crop&w=800&q=80",
    },
  ],
  3: [],
};

const ItemBrowse = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setItems(dummyData[page] || []);
    setCurrentIndex(0);
  }, [page]);

  const handleDecision = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPage((prev) => prev + 1);
    }
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
          {currentItem ? (
            <div className="item-card fade-in">
              <img src={currentItem.image} alt={currentItem.title} className="item-image" />
              <div className="item-details">
                <h2>{currentItem.title}</h2>
                <p className="location">{currentItem.location}</p>
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
              <img src={`${process.env.PUBLIC_URL}/assets/no-items.png`} alt="No items" />
              <h3>No more items available</h3>
              <p>Check back later!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ItemBrowse;
