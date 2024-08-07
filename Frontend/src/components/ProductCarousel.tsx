import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  images: string[];
  handleClick: (i: number) => void;
  selectedImageIndex: number;
}

const ProductCarousel = ({
  images,
  handleClick,
  selectedImageIndex,
}: ProductCarouselProps) => {
  return (
    <Carousel className="p-2 w-[90%]">
      <CarouselContent className="px-3 w-ful">
        {images.map((item, i) => (
          <CarouselItem
            key={i}
            onClick={() => {
              handleClick(i);
            }}
            className={`md:basis-1/2 lg:basis-1/3 rounded h-[150px] p-2 ${
              selectedImageIndex === i ? "border-2 border-[#f85606]" : ""
            }`}
          >
            <img
              className="object-cover h-full w-full"
              src={`http://localhost:5100/${item}`}
              alt="404 product"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="dark:!bg-slate-700 dark:!text-white" />
      <CarouselNext className="dark:!bg-slate-700 dark:!text-white" />
    </Carousel>
  );
};

export default ProductCarousel;
