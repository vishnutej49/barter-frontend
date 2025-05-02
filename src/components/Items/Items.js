import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Items.css';

const Items = () => {
  const [items, setItems] = useState([]);

  // Dummy item data (replace later with API)
  const dummyData = [
    { name: "Vintage Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"},
    { name: "Antique Vase", image: "https://images.unsplash.com/photo-1596075780758-b8d2fc3eafc1?auto=format&fit=crop&w=800&q=80"},
    { name: "Classic Camera", image: "https://images.unsplash.com/photo-1519183071298-a2962be96fcd?auto=format&fit=crop&w=800&q=80"},
    { name: "Rare Book", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80"},
    { name: "Dress", image: "" },
    {name: "Pen", image: ""}
  ];

  useEffect(() => {
    setItems(dummyData);
  }, []);

  return (
    <div className="items-container">
      <div className="items-header">
        <h2>Treasures for Barter</h2>
        <p>Discover unique collectibles available for exchange</p>
      </div>
      
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={40}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          className="items-swiper"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="item-card">
                <div className="item-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-image"
                    style={{ width: '100%', height: 'auto' }} // Ensures uniform size
                  />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Items;
