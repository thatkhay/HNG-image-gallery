import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Container,  Button } from '@mui/material';

import Fall from '../assets/fall.jpg';
import Winter from '../assets/winter.jpg';
import Summer from '../assets/summer.jpg';
import Spring from '../assets/spring.jpg';
import FallTwo from '../assets/fall2.jpg';
import WinterTwo from '../assets/winter2.jpg';
import SummerTwo from '../assets/summer2.jpg';
import SpringTwo from '../assets/spring2.jpg';
import FallThree from '../assets/fall3.jpg';
import WinterThree from '../assets/winter3.jpg';
import SummerThree from '../assets/summer3.jpg';
import SpringThree from '../assets/spring3.jpg';

const Image = ({ src, alt, index }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `image-${index}`,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id: `image-${index}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : 'transform 0.3s',
    boxShadow: isDragging ? '0px 0px 10px rgba(0, 0, 0, 0.3)' : 'none',
    borderRadius: '10px',
    touchAction: 'none', // Enable touch-action property for smoother mobile touch support
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDropRef(node);
      }}
      {...attributes}
      {...listeners}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s',
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

const DraggableImageGrid = () => {
  const initialImages = [
    Fall,
    Winter,
    Summer,
    Spring,
    FallTwo,
    WinterTwo,
    SummerTwo,
    SpringTwo,
    FallThree,
    WinterThree,
    SummerThree,
    SpringThree,
  ];

  const [images, setImages] = useState(initialImages);

  const shuffleImages = () => {
    const shuffledImages = [...images];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }
    setImages(shuffledImages);
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const fromIndex = parseInt(active.id.split('-')[1]);
      const toIndex = parseInt(over.id.split('-')[1]);

      const updatedImages = [...images];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      setImages(updatedImages);
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div style={{ backgroundColor: 'black' }}>
        <Container
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            width: '100%',
            margin: '0 auto',
            maxWidth: '700px',
            height: '110vh',
            border: '2px solid black',
            padding: '1rem',
            backgroundColor: 'skyblue',
            borderRadius: '.6rem',
          }}
        >
          {images.map((src, index) => (
            <Image key={`image-${index}`} src={src} alt={`Image ${index + 1}`} index={index} />
          ))}
        </Container>
      </div>
      <Button onClick={shuffleImages} variant="contained" color="primary">
        Shuffle Images
      </Button>
    </DndContext>
  );
};

export default DraggableImageGrid;
