import { LOCATION_CHANGE } from './reducers';

const defaultSelectLocationState = state => state.routing;

export default function syncHistoryWithStore(history, store, {
  selectLocationState = defaultSelectLocationState,
  adjustUrlOnReplay = true
} = {}) {
  let initialLocation;
  let currentLocation;
  let unsubscribeFromStore;
  let unsubscribeFromHistory;

  // What does the store say about current location?
  const getLocationInStore = (useInitialIfEmpty?) => {
    const locationState = selectLocationState(store.getState());
    return locationState.locationBeforeTransitions ||
      (useInitialIfEmpty ? initialLocation : undefined);
  };

  // Whenever location changes, dispatch an action to get it in the store
  const handleLocationChange = (location) => {
    // Remember where we are
    currentLocation = location;

    // Are we being called for the first time?
    if (!initialLocation) {
      // Remember as a fallback in case state is reset
      initialLocation = location;

      // Respect persisted location, if any
      if (getLocationInStore()) {
        return;
      }
    }

    // Tell the store to update by dispatching an action
    store.dispatch({
      type: LOCATION_CHANGE,
      payload: location
    });
  };

  unsubscribeFromHistory = history.listen(handleLocationChange);

  // The enhanced history uses store as source of truth

  return Object.assign({}, history, {
    listen(listener) {
      // Copy of last location.
      let lastPublishedLocation = getLocationInStore(true);

      // Keep track of whether we unsubscribed, as Redux store
      // only applies changes in subscriptions on next dispatch
      let unsubscribed = false;
      const unsubscribeFromStore = store.subscribe(() => {
        const currentLocation = getLocationInStore(true);
        if (currentLocation === lastPublishedLocation) {
          return;
        }

        lastPublishedLocation = currentLocation;
        if (!unsubscribed) {
          listener(lastPublishedLocation);
        }
      });

      // History listeners expect a synchronous call. Make the first call to the
      // listener after subscribing to the store, in case the listener causes a
      // location change (e.g. when it redirects)
      listener(lastPublishedLocation);

      // Let user unsubscribe later
      return () => {
        unsubscribed = true;
        unsubscribeFromStore();
        };
    },

    unsubscribe() {
      if (adjustUrlOnReplay) {
        unsubscribeFromStore();
      }

      unsubscribeFromHistory();
    }
  });
};
