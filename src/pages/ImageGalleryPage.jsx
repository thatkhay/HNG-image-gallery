import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Fall from '../assets/fall.jpg';
import Winter from '../assets/winter.jpg';
import Summer from '../assets/summer.jpg';
import Spring from '../assets/spring.jpg';

const Image = ({ src, alt, index, moveImage }) => {
  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transform: 'translate3d(0, 0, 0)', // Enable hardware acceleration
        transition: 'transform 0.3s, box-shadow 0.3s', // Added transitions
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Added box shadow
        borderRadius: '10px', // Added rounded corners
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Control how the image is displayed (e.g., 'cover', 'contain')
          transition: 'transform 0.3s', // Add transition for image zoom
          borderRadius: '10px', // Add rounded corners to the image
        }}
      />
    </div>
  );
};

const DraggableImageGrid = () => {
  const initialImages = [Fall, Winter, Summer, Spring];

  const [images, setImages] = useState(initialImages);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Responsive column layout
          gap: '1rem', // Adjust gap between items for smaller screens
          width: '100%', // Make sure it spans the full width
          margin: '0 auto',
          maxWidth: '700px', // Limit the width for larger screens
        }}
      >
        {images.map((src, index) => (
          <Image key={index} src={src} alt={`Image ${index + 1}`} index={index} moveImage={moveImage} />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableImageGrid;
