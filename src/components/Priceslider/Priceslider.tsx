import React from "react";
import styled from "styled-components";
import { rem } from "polished";

const SliderContainer = styled.div`
  user-select: none;
  width: ${rem(300)};
  border: 1px solid black;
  height: ${rem(40)};
  position: relative;
`;

const SliderCircle = styled.div<ISliderCircle>`
  position: absolute;
  cursor: pointer;
  width: ${props => rem(props.sliderSize)};
  height: ${props => rem(props.sliderSize)};
  display: inline-block;
  border-radius: 50%;
  z-index: 10;
  border: 1px solid ${props => props.theme.darkGrey};
  transform: translateX(${props => props.startPos || 0}px);
`;

interface ISliderLabel {
  startX?: number;
  startY?: number;
}

const SliderLabel = styled.label<ISliderLabel>`
  position: absolute;
  transform: translate(${props => props.startX || 0}px, ${props => (props.startY && -props.startY) || 0}px);
`;

interface ISliderCircle {
  sliderSize: number;
  startPos?: number;
}

interface IProps {
  min?: number;
  max?: number;
  sliderSize?: number;
  labelHeight?: number;
  xOffsetLabel?: number;
  onChangeValue?: (range: number[]) => void;
}

interface CircleValue {
  [key: string]: number;
}

const CIRCLE_DIMENSION = 20;
const Priceslider: React.FC<IProps> = ({
  onChangeValue,
  min = 25,
  max = 2413,
  sliderSize = CIRCLE_DIMENSION,
  labelHeight = sliderSize + 2,
  xOffsetLabel = sliderSize / 4 + 1
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState<CircleValue>({ min: min, max: max });
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [selectedCircle, setSelectedCircle] = React.useState<HTMLDivElement>();

  React.useEffect(() => {
    if (containerRef?.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  React.useEffect(() => {
    const mouseUp = (event: MouseEvent) => {
      setSelectedCircle(undefined);
    };
    document.addEventListener("mouseup", mouseUp);

    return () => document.removeEventListener("mouseup", mouseUp);
  }, []);

  React.useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { left, width } = containerRef.current?.getBoundingClientRect();
        const currentXPosInContainer = event.pageX - left - CIRCLE_DIMENSION / 2;
        if (selectedCircle && currentXPosInContainer >= 0 && currentXPosInContainer < width - sliderSize) {
          selectedCircle.style.transform = `translateX(${currentXPosInContainer}px)`;

          const prev = selectedCircle.previousElementSibling as HTMLLabelElement;
          if (prev?.nodeName === "LABEL" && prev.htmlFor === selectedCircle.id) {
            prev.style.transform = `translate(${currentXPosInContainer + xOffsetLabel}px, ${selectedCircle.offsetTop -
              labelHeight}px)`;
          }

          const respectiveSliderValue = currentXPosInContainer;
          const step = max / (width - sliderSize);
          const value = currentXPosInContainer * step;
          // const respectiveSliderValue = currentXPosInContainer / (width ;

          setValue(prevValue => ({
            ...prevValue,
            [selectedCircle.id]: value
          }));
        }
      }
    };

    document.addEventListener("mousemove", mouseMove);

    return () => document.removeEventListener("mousemove", mouseMove);
  }, [containerRef, selectedCircle, min, max, labelHeight, xOffsetLabel, sliderSize]);

  React.useEffect(() => {
    if (onChangeValue) {
      onChangeValue(Object.values(value || {}).sort((a, b) => a - b));
    }
  }, [value, onChangeValue]);

  const handleMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = event.target as HTMLDivElement;
    setSelectedCircle(el);
  }, []);

  return (
    <SliderContainer ref={containerRef}>
      <SliderLabel htmlFor="min" startX={xOffsetLabel} startY={labelHeight}>
        {value?.min}
      </SliderLabel>
      <SliderCircle id="min" onMouseDown={handleMouseDown} sliderSize={sliderSize} />
      <SliderLabel htmlFor="max" startX={containerWidth - sliderSize - xOffsetLabel} startY={labelHeight}>
        {value?.max}
      </SliderLabel>
      <SliderCircle
        id="max"
        onMouseDown={handleMouseDown}
        sliderSize={sliderSize}
        startPos={containerWidth - sliderSize - xOffsetLabel}
      />
    </SliderContainer>
  );
};

export default Priceslider;
