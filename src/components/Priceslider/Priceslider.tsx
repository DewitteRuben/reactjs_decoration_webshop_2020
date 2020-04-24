import React from "react";
import Rangeslider from "../Rangeslider/Rangeslider";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";

const Priceslider = observer(() => {
  const { itemStore } = useStores();

  const handleRangeChange = React.useCallback(
    (range: number[]) => {
      itemStore.setFilters({ minPrice: range[0], maxPrice: range[1] });
    },
    [itemStore]
  );

  return (
    <Rangeslider
      onChangeValue={handleRangeChange}
      min={Math.floor(itemStore.minPrice || 0)}
      max={Math.ceil(itemStore.maxPrice || 0)}
    />
  );
});

export default Priceslider;
