import React from "react";
import { parseStoreItemKey } from "../../utils/string";
import Breadcrumbs, { IBreadcrumbProps } from "../Breadcrumbs/Breadcrumbs";
import { IParams } from "../../api/api";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

type ICategoryBreadcrumbsProps = Partial<IBreadcrumbProps>;

const CategoryBreadcrumbs: React.FC<ICategoryBreadcrumbsProps> = observer(({ items, currentItem, ...other }) => {
  const { category, subCategory, itemCategory, specificCategory } = useParams();

  const categories = { category, subCategory, itemCategory, specificCategory };
  const categoryList = Object.values(categories).filter(e => e) as string[];

  const current = parseStoreItemKey(categoryList[categoryList.length - 1]);
  const breadcrumbs: IParams[] = categoryList.map(breadcrumb => ({
    value: parseStoreItemKey(breadcrumb),
    key: breadcrumb
  }));

  return <Breadcrumbs {...other} items={breadcrumbs} currentItem={current} />;
});

export default CategoryBreadcrumbs;
