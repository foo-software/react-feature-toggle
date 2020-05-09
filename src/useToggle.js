import { useEffect, useContext } from 'react';
import {
  API_URL,
  PACKAGE_NAME,
  TOGGLE_FETCH_STATE_FULFILLED,
  TOGGLE_FETCH_STATE_PENDING,
  TOGGLE_FETCH_STATE_REJECTED
} from './constants';
import ToggleContext from './ToggleContext';

const warn = console.warn || console.log;

export default ({ toggleName }) => {
  const {
    accountId,
    environmentName,
    fetch: userDefinedFetch,
    setToggles,
    toggles
  } = useContext(ToggleContext);

  const setToggleState = state =>
    setToggles({
      ...toggles,
      [toggleName]: {
        ...(!toggles[toggleName] ? {} : toggles[toggleName]),
        ...state
      }
    });

  // support a user-defined fetch function
  const fetchFunction = userDefinedFetch || fetch;

  useEffect(() => {
    setToggleState({
      status: TOGGLE_FETCH_STATE_PENDING
    });

    async function fetchToggle() {
      try {
        // fetch toggle data from the API
        const response = await fetchFunction(
          `${API_URL}/account/${accountId}/toggle/${environmentName}/${toggleName}/state`
        );
        const responseJson = await response.json();

        // if we don't have the toggle data we're expecting
        if (
          typeof responseJson.data !== 'object' ||
          typeof responseJson.data.on === 'undefined'
        ) {
          throw Error(
            `didn't get the expected response:\n${JSON.stringify(responseJson)}`
          );
        }
        setToggleState({
          isOn: responseJson.data.on,
          status: TOGGLE_FETCH_STATE_FULFILLED
        });
      } catch (error) {
        setToggleState({
          status: TOGGLE_FETCH_STATE_REJECTED
        });
        warn(`${PACKAGE_NAME}:\n`, error);
      }
    }

    fetchToggle();
  }, []);

  return (
    toggles[toggleName] || {
      isOn: null,
      status: null
    }
  );
};
