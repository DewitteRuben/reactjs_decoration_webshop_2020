import React from "react";
import styled from "styled-components";
import { rem } from "polished";

interface ISliderContainer {
  width: number;
  height: number;
}

const SliderContainer = styled.div<ISliderContainer>`
  user-select: none;
  width: ${props => rem(props.width)};
  height: ${props => rem(props.height)};
  display: flex;
  align-items: flex-end;
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
  border: 1px solid ${props => props.theme.darkGray};
  transform: translateX(${props => props.startPos || 0}px);
  background-color: ${props => props.theme.white};
`;

interface ILine {
  sliderSize: number;
  width: number;
  height: number;
}

const Line = styled.div<ILine>`
  position: absolute;
  z-index: 5;
  bottom: ${props => rem(props.height / 3.5)};
  left: ${props => rem(props.sliderSize / 2)};
  width: ${props => rem(props.width)};
  border-bottom: 1px dashed ${props => props.theme.darkGray};
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
  width?: number;
  onChangeValue?: (range: number[]) => void;
}

interface ICircleValue {
  [key: string]: number;
}

const Rangeslider: React.FC<IProps> = ({
  onChangeValue,
  min = 0,
  max = 10,
  sliderSize = 20,
  labelHeight = sliderSize + 5,
  xOffsetLabel = 0,
  width = 225
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState<ICircleValue>({ min, max });
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
      if (!selectedCircle || !containerRef.current) return;
      const { left, width } = containerRef.current?.getBoundingClientRect();

      const currentXPosInContainer = event.pageX - left - sliderSize / 2;

      const sliderXStart = left;
      const sliderXOffset = selectedCircle.getBoundingClientRect().x - sliderXStart;

      const maximumXOffset = width - sliderSize;
      const minimumXOffset = 0;

      if (sliderXOffset < minimumXOffset || sliderXOffset > maximumXOffset) return;

      const sliderPos =
        currentXPosInContainer <= minimumXOffset
          ? minimumXOffset
          : currentXPosInContainer >= maximumXOffset
          ? maximumXOffset
          : currentXPosInContainer;

      selectedCircle.style.transform = `translateX(${sliderPos}px)`;
      const prev = selectedCircle.previousElementSibling as HTMLLabelElement;
      if (prev?.nodeName === "LABEL" && prev.htmlFor === selectedCircle.id) {
        prev.style.transform = `translate(${sliderPos + xOffsetLabel}px, ${-labelHeight}px)`;
      }

      const respectiveSliderValue = sliderPos;
      const valueInRange = Math.floor(((respectiveSliderValue - 0) / maximumXOffset) * (max - min) + min);

      setValue(prevValue => ({
        ...prevValue,
        [selectedCircle.id]: valueInRange
      }));
    };
    document.addEventListener("mousemove", mouseMove);

    return () => document.removeEventListener("mousemove", mouseMove);
  }, [containerRef, selectedCircle, min, max, labelHeight, xOffsetLabel, sliderSize]);

  React.useEffect(() => {
    if (onChangeValue) {
      const sortedRange = Object.values(value || {}).sort((a, b) => a - b);
      onChangeValue(sortedRange);
    }
  }, [value, onChangeValue]);

  const handleMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = event.target as HTMLDivElement;
    setSelectedCircle(el);
  }, []);

  return (
    <SliderContainer width={width} height={sliderSize + labelHeight} ref={containerRef}>
      <SliderLabel htmlFor="min" startX={xOffsetLabel} startY={labelHeight}>
        {value?.min}
      </SliderLabel>
      <SliderCircle id="min" onMouseDown={handleMouseDown} sliderSize={sliderSize} />
      <SliderLabel htmlFor="max" startX={containerWidth - sliderSize + xOffsetLabel} startY={labelHeight}>
        {value?.max}
      </SliderLabel>
      <SliderCircle id="max" onMouseDown={handleMouseDown} sliderSize={sliderSize} startPos={containerWidth - sliderSize} />
      <Line height={labelHeight + sliderSize} sliderSize={sliderSize} width={width - sliderSize} />
    </SliderContainer>
  );
};

export default Rangeslider;
