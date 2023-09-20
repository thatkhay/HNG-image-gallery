import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Container, Button, TextField, AppBar, Toolbar, Typography } from '@mui/material';

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

const initialImages = [
  { src: Fall, alt: 'Fall', tag: 'fall' },
  { src: Winter, alt: 'Winter', tag: 'winter' },
  { src: Summer, alt: 'Summer', tag: 'summer' },
  { src: Spring, alt: 'Spring', tag: 'spring' },
  { src: FallTwo, alt: 'Fall 2', tag: 'fall' },
  { src: WinterTwo, alt: 'Winter 2', tag: 'winter' },
  { src: SummerTwo, alt: 'Summer 2', tag: 'summer' },
  { src: SpringTwo, alt: 'Spring 2', tag: 'spring' },
  { src: FallThree, alt: 'Fall 3', tag: 'fall' },
  { src: WinterThree, alt: 'Winter 3', tag: 'winter' },
  { src: SummerThree, alt: 'Summer 3', tag: 'summer' },
  { src: SpringThree, alt: 'Spring 3', tag: 'spring' },
];

const Image = ({ src, alt, index, tag }) => {
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
    touchAction: 'none',
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
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {tag}
      </div>
    </div>
  );
};

const DraggableImageGrid = () => {
  const [images, setImages] = useState(initialImages);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filterImages = () => {
    if (!searchQuery) {
      return images;
    }

    return images.filter((image) =>
      image.alt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Nature and Animal Image Gallery</Typography>
          </Toolbar>
        </AppBar>
        <Button
          onClick={shuffleImages}
          variant="contained"
          color="primary"
          style={{ marginTop: '2rem' }}
        >
          Shuffle Images
        </Button>
        <TextField
          label="Search Images"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginTop: '1rem', width: '50%', marginBottom: '2rem' }}
        />
      </Container>
      <div>
        <Container
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            margin: '0 auto',
            width: '100%',
            maxWidth: '700px',
            height: '110vh',
            border: '2px solid black',
            padding: '1rem',
            backgroundColor: 'skyblue',
            borderRadius: '.6rem',
          }}
        >
          {filterImages().map((image, index) => (
            <Image
              key={`image-${index}`}
              src={image.src}
              alt={image.alt}
              tag={image.tag}
              index={index}
            />
          ))}
        </Container>
      </div>
    </DndContext>
  );
};

export default DraggableImageGrid;
