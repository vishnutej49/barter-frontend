import React, { useState, useEffect, useRef } from "react";
import "./Items.css";

const dummyData = [
  {name: "Vintage Watch",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",category: "Collectibles"},
  {name: "Antique Vase",image: "",category: "Home Decor"},
  {name: "Classic Camera",image: "",category: "Electronics"},
  {name: "Rare Book",image:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",category: "Books"},
  {name: "Vintage Dress",image: "",category: "Clothing"},
  {name: "Fountain Pen",image: "",category: "Stationery"}
];

const Items = () => {
  const [items, setItems] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    setItems(dummyData);
  }, []);

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (carouselRef.current && !isPaused) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

          if (scrollLeft + clientWidth >= scrollWidth - 50) {
            carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollRight();
          }
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <div className="treasure-container">
      <div className="treasure-header">
        <h2>Treasures for Barter</h2>
        <p>Discover unique collectibles available for exchange - find something special.</p>
      </div>

      <div className="carousel-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>
          &#10094;
        </button>

        <div
          className="carousel-content"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div className="treasure-card" key={index}>
              <div className="treasure-image-wrapper">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="treasure-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="treasure-placeholder">
                    <span>{item.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="treasure-details">
                <h3>{item.name}</h3>
                <p className="treasure-category">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Items;
