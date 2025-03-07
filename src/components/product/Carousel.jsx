import { useState, useEffect, useCallback } from "react";

import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { slug } = useParams();
  const {
    data: {
      image_url: imageUrl,
      image_urls: partialImageUrls,
      slug: title,
    } = {},
  } = useShowProduct(slug);

  // Ensure imageUrls is always an array
  const imageUrls = append(imageUrl, partialImageUrls || []);
  console.log("ImageUrls", imageUrl);
  console.log("ImageUrls", partialImageUrls);
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  }, [imageUrls.length]);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  useEffect(() => {
    if (imageUrls.length > 1) {
      const interval = setInterval(handleNext, 3000);

      return () => clearInterval(interval);
    }
  }, []); // Correct dependency array

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <img
        alt={title}
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
    </div>
  );
};

export default Carousel;
