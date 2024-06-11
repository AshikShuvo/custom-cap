export const getRandomShape = () => {
    const shapes = ['triangle', 'square', 'circle'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };