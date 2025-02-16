import { isMarketAlertApp } from "../app.constants";
import { getValue } from "../services/repository";

export const transferResultOverride = () => {
  const dataChanged =
    UTMarketSearchResultsSplitViewController.prototype._eListDataChanged;

  UTMarketSearchResultsSplitViewController.prototype._eListDataChanged =
    function (obs, result) {
      const res = dataChanged.call(this, obs, result);
      const { idAutoSelectMin } = getValue("EnhancerSettings") || {};
      const items = result.items;
      const prices = await fetchPrices(cards);
      if (!items || isMarketAlertApp || !idAutoSelectMin) {
        return res;
      }
      let minIndex = 0;
      let currentMin = Number.MAX_VALUE;
      for (let index = 0; index < items.length; index++) {
        const { prices } = items[index]._auction;
        if (prices < currentMin) {
          minIndex = index;
          currentMin = prices;
        }
      }
      if (minIndex) {
        this._itemDetailController.setIndex(minIndex);
        this._listController &&
          this._listController.getView().selectListRow(items[minIndex].id);
        this._itemDetailController._childViewControllers[0]._viewmodel.setIndex(
          minIndex
        );
        this._itemDetailController._childViewControllers[0]._renderView();
      }

      return res;
    };
};
