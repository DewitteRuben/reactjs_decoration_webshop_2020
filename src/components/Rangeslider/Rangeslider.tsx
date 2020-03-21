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
  transform: translateX(${props => props.startX}px);
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
  transform: translate(${props => props.startX}px, ${props => (props.startY && -props.startY) || 0}px);
`;

interface ISliderCircle {
  sliderSize: number;
  startX?: number;
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

const convertValueToRange = (value: number, min: number, max: number, oldMax: number) => {
  return Math.floor(((value - 0) / oldMax) * (max - min) + min);
};

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

  const triggerValues = React.useCallback(() => {
    const sortedRange = Object.values(value || {}).sort((a, b) => a - b);
    if (onChangeValue) {
      onChangeValue(sortedRange);
    }
  }, [onChangeValue, value]);

  const resetPositions = React.useCallback(() => {
    if (containerRef.current) {
      const labels = Array.from(containerRef.current.querySelectorAll("label"));
      const sliders = Array.from(containerRef.current.querySelectorAll("div"));

      const minLabel = labels.filter(label => label.htmlFor === "min")[0];
      const maxLabel = labels.filter(label => label.htmlFor === "max")[0];
      const minSlider = sliders.filter(slider => slider.id === "min")[0];
      const maxSlider = sliders.filter(slider => slider.id === "max")[0];

      minLabel.style.transform = `translate(${xOffsetLabel}px, ${-labelHeight}px)`;
      maxLabel.style.transform = `translate(${containerWidth - sliderSize + xOffsetLabel}px, ${-labelHeight}px)`;
      minSlider.style.transform = `translateX(${0}px)`;
      maxSlider.style.transform = `translateX(${containerWidth - sliderSize}px)`;
    }
  }, [containerWidth, labelHeight, sliderSize, xOffsetLabel]);

  React.useEffect(() => {
    setValue({ min, max });
    resetPositions();
  }, [min, max, resetPositions]);

  React.useEffect(() => {
    if (containerRef?.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  React.useEffect(() => {
    const mouseUp = () => {
      if (selectedCircle) {
        triggerValues();
      }
      setSelectedCircle(undefined);
    };
    document.addEventListener("mouseup", mouseUp);

    return () => document.removeEventListener("mouseup", mouseUp);
  }, [selectedCircle, triggerValues]);

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

      const valueInRange = convertValueToRange(sliderPos, min, max, maximumXOffset);

      setValue(prevValue => ({
        ...prevValue,
        [selectedCircle.id]: valueInRange
      }));
    };
    document.addEventListener("mousemove", mouseMove);

    return () => document.removeEventListener("mousemove", mouseMove);
  }, [containerRef, selectedCircle, min, max, labelHeight, xOffsetLabel, sliderSize]);

  const handleMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = event.target as HTMLDivElement;
    setSelectedCircle(el);
  }, []);

  return (
    <SliderContainer width={width} height={sliderSize + labelHeight} ref={containerRef}>
      <SliderLabel htmlFor="min" startX={xOffsetLabel} startY={labelHeight}>
        {value?.min}
      </SliderLabel>
      <SliderCircle id="min" onMouseDown={handleMouseDown} startX={0} sliderSize={sliderSize} />
      <SliderLabel htmlFor="max" startX={containerWidth - sliderSize + xOffsetLabel} startY={labelHeight}>
        {value?.max}
      </SliderLabel>
      <SliderCircle id="max" onMouseDown={handleMouseDown} sliderSize={sliderSize} startX={containerWidth - sliderSize} />
      <Line height={labelHeight + sliderSize} sliderSize={sliderSize} width={width - sliderSize} />
    </SliderContainer>
  );
};

export default Rangeslider;
