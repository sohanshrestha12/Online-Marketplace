import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CImage,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import banner1 from '../assets/images/banner/banner1.jpg'
import banner2 from '../assets/images/banner/banner1.jpeg'
import banner3 from '../assets/images/banner/banner3.jpg'

const CarouselComponent = () => {
  return (
    <CCarousel controls indicators style={{ height: "65vh" }} interval={3000}>
      <CCarouselItem style={{ height: "70vh" }}>
        <CImage
          className="d-block w-100"
          style={{ height: "70vh", objectFit: "fill" }}
          src={banner1}
          alt="slide 1"
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Premium Online Shop</h5>
          <p>Special Offer 75% off! Shop online Now!</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem style={{ height: "70vh" }}>
        <CImage
          className="d-block w-100"
          style={{ height: "70vh", objectFit: "fill" }}
          src={banner2}
          alt="slide 2"
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Flash Sales</h5>
          <p>Special Offer upto 70% off! Shop online Now!</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem style={{ height: "70vh" }}>
        <CImage
          className="d-block w-100"
          style={{ height: "70vh", objectFit: "fill" }}
          src={banner3}
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Global Collection</h5>
          <p>Shop online to get upto 50% off on your first product</p>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>
  );
};

export default CarouselComponent;
