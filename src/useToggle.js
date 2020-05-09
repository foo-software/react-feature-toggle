import { useEffect, useContext } from 'react';
import {
  API_URL,
  PACKAGE_NAME,
  TOGGLE_FETCH_STATE_FULFILLED,
  TOGGLE_FETCH_STATE_PENDING,
  TOGGLE_FETCH_STATE_REJECTED
} from './constants';
import ToggleContext from './ToggleContext';

export default ({ toggleName }) => {
  const {
    accountId,
    environmentName,
    fetch: userDefinedFetch,
    setToggles,
    toggles
  } = useContext(ToggleContext);

  const toggle = toggles[toggleName] || {
    isOn: null,
    status: null
  };

  const setToggleState = isOn =>
    setToggles({
      ...toggles,
      [toggleName]: {
        ...toggle,
        isOn
      }
    });

  const setToggleStatus = status =>
    setToggles({
      ...toggles,
      [toggleName]: {
        ...toggle,
        status
      }
    });

  // support a user-defined fetch function
  const fetchFunction = userDefinedFetch || fetch;

  useEffect(() => {
    setToggleStatus(TOGGLE_FETCH_STATE_PENDING);

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
        setToggleStatus(TOGGLE_FETCH_STATE_FULFILLED);
        setToggleState(responseJson.data.on);
      } catch (error) {
        setToggleStatus(TOGGLE_FETCH_STATE_REJECTED);
        console.log(`${PACKAGE_NAME}:\n`, error);
      }
    }

    fetchToggle();
  }, []);

  return toggle;
};
