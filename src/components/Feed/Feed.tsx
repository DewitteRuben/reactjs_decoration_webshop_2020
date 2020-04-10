import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { reaction, IReactionDisposer } from "mobx";
import storesContext from "../../store/store";
import { observer } from "mobx-react";
import _ from "lodash";

interface IRouteProps {
  category: string;
  subCategory: string;
  itemCategory: string;
  specificCategory: string;
}

@observer
class Feed extends Component<RouteComponentProps<IRouteProps>, {}> {
  static contextType = storesContext;
  context!: React.ContextType<typeof storesContext>;
  disposer?: IReactionDisposer;

  componentDidUpdate(prevProps: RouteComponentProps<IRouteProps>) {
    const { itemStore } = this.context;
    if (!_.isEqual(this.props.match.params, prevProps.match.params)) {
      itemStore.clear();

      const { category, subCategory, itemCategory, specificCategory } = this.props.match.params;
      itemStore.setCategories({ category, subCategory, itemCategory, specificCategory });
    }
  }

  componentDidMount() {
    const { itemStore } = this.context;

    itemStore.clear();

    const disposer = reaction(
      () => itemStore.filters,
      () => {
        _.debounce(() => itemStore.fetchItems())();
      }
    );

    this.disposer = disposer;

    const { category, subCategory, itemCategory, specificCategory } = this.props.match.params;
    itemStore.setCategories({ category, subCategory, itemCategory, specificCategory });
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  render() {
    const { itemStore } = this.context;
    const isLoading = itemStore.status.state !== "done";

    return <ItemList loading={isLoading} amount={itemStore.amount} items={itemStore.getItems()} />;
  }
}

export default withRouter(Feed);
