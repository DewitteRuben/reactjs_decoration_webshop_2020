import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { CarouselProvider, Slider, Slide, ImageWithZoom, Dot, CarouselContext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Icon from "../Icon/Icon";
import { IShopItemImage } from "../../io-ts-types";
import Skeleton from "react-loading-skeleton";

interface ICarouselProps {
  images?: IShopItemImage[];
  step?: number;
  loading?: boolean;
}

const ItemImageContainer = styled.div`
  width: ${rem(702)};
  margin-right: 35px;
`;

const MainImage = styled(ImageWithZoom)`
  height: ${rem(500)};
  width: 100%;

  div {
    background-position: center;
    background-size: contain !important;
    background-repeat: no-repeat;
  }

  div:first-child {
    opacity: 1;
  }

  div:last-child {
    transition: none;
  }

  &:hover {
    div:first-child {
      opacity: 0;
    }
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  z-index: 10;
  top: 50%;
  right: 30px;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  transition: transform 0.1s linear;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }
`;

const NextArrow = styled(ArrowButton)`
  right: 30px;
`;
const BackArrow = styled(ArrowButton)`
  left: 30px;
`;

const SliderContainer = styled.div`
  position: relative;
`;

const OtherImage = styled.img`
  margin-top: 10px;
  width: ${rem(124)};
  height: ${rem(128)};
  margin-right: ${rem(8)};

  &:hover {
    cursor: pointer;
  }
`;

const ImageDot = styled(Dot)`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`;

const LeftSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 95px;
`;

const RightSidebar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 95px;
`;

interface ICarouselControlsProps {
  maxLength: number;
  step?: number;
}

const CarouselControls: React.FC<ICarouselControlsProps> = ({ maxLength, step = 1 }) => {
  const carouselContext = React.useContext(CarouselContext);

  const [currentSlide, setCurrentSlide] = React.useState(carouselContext.state.currentSlide);
  React.useEffect(() => {
    const onChange = () => {
      setCurrentSlide(carouselContext.state.currentSlide);
    };
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  const switchSlide = (prev?: boolean) => () => {
    carouselContext.setStoreState({ currentSlide: (currentSlide + (prev ? -step : step) + maxLength) % maxLength });
  };

  return (
    <>
      <BackArrow onClick={switchSlide(true)}>
        <Icon name="back" />
      </BackArrow>
      <NextArrow onClick={switchSlide()}>
        <Icon name="next" />
      </NextArrow>
      <LeftSidebar />
      <RightSidebar />
    </>
  );
};

const ItemImages: React.FC<ICarouselProps> = ({ images, step, loading }) => {
  const isLoading = loading || !images;

  return (
    <ItemImageContainer>
      <CarouselProvider naturalSlideWidth={702} naturalSlideHeight={500} totalSlides={images?.length || 3}>
        <SliderContainer>
          <Slider>
            {isLoading ? (
              <Skeleton width={702} height={500} />
            ) : (
              images?.map((image: IShopItemImage, index: number) => (
                <Slide index={index} key={`image-${index}`}>
                  <MainImage src={image.full} />
                </Slide>
              ))
            )}
          </Slider>
          <CarouselControls step={step} maxLength={images?.length || 3} />
        </SliderContainer>
        {isLoading ? (
          <Skeleton width={124} height={128} />
        ) : (
          images?.map((image: IShopItemImage, index: number) => (
            <ImageDot key={`image-${index}`} slide={index}>
              <OtherImage src={image.thumb} />
            </ImageDot>
          ))
        )}
      </CarouselProvider>
    </ItemImageContainer>
  );
};

export default ItemImages;
