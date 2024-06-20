import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CImage,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

const CarouselComponent = () => {
  return (
    <CCarousel controls indicators style={{ height: "70vh" }} interval={3000}>
      <CCarouselItem style={{ height: "70vh" }}>
        <CImage
          className="d-block w-100"
          style={{ height: "70vh", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1718804714822-8b81342a5e9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slide 1"
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem style={{ height: "70vh" }}>
        <CImage
          className="d-block w-100"
          style={{ height: "70vh", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1718804714822-8b81342a5e9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slide 2"
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem style={{ height: "70vh" }}>
        <CImage
          className="d-block w-100"
          style={{ height: "70vh", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1718804714822-8b81342a5e9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slide 3"
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>
  );
};

export default CarouselComponent;
