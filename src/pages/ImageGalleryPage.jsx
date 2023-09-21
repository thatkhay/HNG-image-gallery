import React, { useState, useCallback } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  Container,
  TextField,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Spinner from '../components/Spinner';
import { useMediaQuery } from '@mui/material';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const initialImages = [
  { id: 'fall', src: Fall, alt: 'Fall', tag: 'Autumn' },
  { id: 'winter', src: Winter, alt: 'Winter', tag: 'Winter' },
  { id: 'summer', src: Summer, alt: 'Summer', tag: 'Summer' },
  { id: 'spring', src: Spring, alt: 'Spring', tag: 'Spring' },
  { id: 'fall2', src: FallTwo, alt: 'Fall 2', tag: 'Autumn' },
  { id: 'winter2', src: WinterTwo, alt: 'Winter 2', tag: 'Winter' },
  { id: 'summer2', src: SummerTwo, alt: 'Summer 2', tag: 'Summer' },
  { id: 'spring2', src: SpringTwo, alt: 'Spring 2', tag: 'Spring' },
  { id: 'fall3', src: FallThree, alt: 'Fall 3', tag: 'Autumn' },
  { id: 'winter3', src: WinterThree, alt: 'Winter 3', tag: 'Winter' },
  { id: 'summer3', src: SummerThree, alt: 'Summer 3', tag: 'Summer' },
  { id: 'spring3', src: SpringThree, alt: 'Spring 3', tag: 'Spring' },
];

const Image = ({ src, alt, id, index, tag, handleDragEnd }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [images, setImages] = useState(initialImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const onDragEnd = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      const fromIndex = images.findIndex((img) => img.id === active.id);
      const toIndex = images.findIndex((img) => img.id === over.id);
      const movedImage = images[fromIndex];
      const updatedImages = [...images];

      updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      setImages(updatedImages);
    }
  };

  const filteredImages = useCallback(() => {
    const filtered = images.filter((image) =>
      image.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered;
  }, [images, searchQuery]);

  const handleSearch = () => {
    setLoading(true);

    // Simulate loading delay (You can remove this if you want instant results)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading delay of 2 seconds
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase(); // Convert to lowercase
    setSearchQuery(query);

    // Trigger search when the input value changes and display "Not Found" notification if needed
    handleSearch();

    if (query.trim() !== '' && filteredImages().length === 0) {
      toast.error('No images found for the given search query', {
        autoClose: 2000,
      });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Container>
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <AppBar position="static" style={{ backgroundColor: 'black' }}>
            <Toolbar
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6">Seasons Image  Gallery</Typography>
            </Toolbar>
          </AppBar>
          <Container style={{ margin: '2rem 0' }}>
            <Typography variant="h4" gutterBottom>
              Welcome to our Seasons Image Gallery <span></span>

            </Typography>
            <Typography variant="body1">
              Step into the enchanting world of the four seasons through our captivating image gallery. Each season paints a unique canvas on the Earth's tapestry, offering a kaleidoscope of sights and sensations for you to explore.
            </Typography>
            <Typography variant="body1" style={{ marginTop: '1rem' }}>
              As you journey through this gallery, you'll find yourself immersed in the vivid colors of spring, where blossoms burst forth in a symphony of life. Feel the warmth of the summer sun, inviting you to bask in its golden glow, as you discover images of sun-kissed landscapes and beachside escapes.
            </Typography>
            <Typography variant="body1" style={{ marginTop: '1rem' }}>
              Autumn unveils a mesmerizing display of nature's artistry, with trees adorned in hues of red, orange, and gold. Each falling leaf tells a story of transition and transformation. Finally, brace yourself for the serene beauty of winter, where landscapes are blanketed in a pure, crystalline white, and the world seems to hush in peaceful stillness.
            </Typography>
            <Typography variant="body1" style={{ marginTop: '1rem' }}>
              Whether you're a nature enthusiast, a photography aficionado, or simply someone who finds solace and wonder in the changing seasons, our gallery is a visual journey through the cyclical wonders of nature. These images, captured by talented photographers from around the world, invite you to embrace the essence of each season and appreciate the ever-changing beauty of our planet.
            </Typography>
          </Container>
          <TextField
            label="Search Images"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleInputChange}
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
              maxWidth: !isSmallScreen ? '90%' : '700px',
              height: 'auto',
              border: '2px solid black',
              padding: '1rem',
              backgroundColor: 'skyblue',
              borderRadius: '.6rem',
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              filteredImages().map((image, index) => (
                <Image
                  key={`image-${index}`}
                  src={image.src}
                  alt={image.alt}
                  id={image.id}
                  tag={image.tag}
                  index={index}
                  handleDragEnd={onDragEnd}
                />
              ))
            )}
          </Container>
        </div>
     <button style={{height: '2rem', width: '4rem', color: 'white', backgroundColor: 'black', margin: '2rem 0', border: 'none', borderRadius: '.2rem' }}>
      <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>log out</Link>
     </button>
      </Container>
         <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </DndContext>
  );
};

export default DraggableImageGrid;
