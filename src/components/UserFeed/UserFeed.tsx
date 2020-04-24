import React, { Component } from "react";
import ItemList from "../ItemList/ItemList";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import SortBySelect from "../SortBySelect/SortBySelect";
import Typography from "../Typography/Typography";
import Skeleton from "react-loading-skeleton";
import { storesContext } from "../../store/store";
import _ from "lodash";

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface IUserFeedProps {
  userId: string;
}

@observer
class UserFeed extends Component<IUserFeedProps, {}> {
  static contextType = storesContext;
  context!: React.ContextType<typeof storesContext>;
  disposer?: IReactionDisposer;

  componentDidMount() {
    const { itemStore } = this.context;
    const { userId } = this.props;

    itemStore.clear();

    const disposer = autorun(() => {
      _.debounce(() => itemStore.fetchItemsByUserId(userId))();
    });

    this.disposer = disposer;
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  render() {
    const { itemStore } = this.context;

    return (
      <FeedContainer>
        <ActionContainer>
          <Typography>
            {itemStore.isLoading ? (
              <Skeleton width={70} />
            ) : (
              `Item${itemStore.amount === 0 || itemStore.amount > 1 ? "s" : ""}: ${itemStore.amount}`
            )}
          </Typography>
          <SortBySelect />
        </ActionContainer>
        <ItemList
          emptyMessage="This user is currently not selling any items."
          items={itemStore.getItems()}
          loading={itemStore.isLoading}
          amount={itemStore.amount}
        />
      </FeedContainer>
    );
  }
}

export default UserFeed;
