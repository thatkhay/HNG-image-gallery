/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Fall from '../assets/fall.jpg';
import Winter from '../assets/winter.jpg';
import Summer from '../assets/summer.jpg';
import Spring from '../assets/spring.jpg';

const ImageGalleryPage = () => {
  const images = [Fall, Winter, Summer, Spring];

  return (
    <div>
      <h1>Image Gallery</h1>
      <p>This is the image gallery page</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          width: '700px',
          margin: '0 auto',
          height: '400px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {images.map((photo, index) => (
          <div
            key={index}
            style={{
              width: '275px',
              height: '200px',
              position: 'relative', // Added for positioning
            }}
          >
            <img
              src={photo}
              alt={`Image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s', // Added transitions
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', 
                borderRadius: '10px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)', // Hover background color
                opacity: 0, // Initially hidden
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'opacity 0.3s', // Added transition for opacity
              }}
            >
              Hover Effect
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryPage;
