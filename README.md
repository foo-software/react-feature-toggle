# `@foo-software/react-feature-toggle`

A feature toggle for React. Feature toggles (otherwise known as feature flags or feature switches) are a software development technique that provides a way of turning functionality or display on and off during runtime, without deploying new code. This allows for more control and experimentation over the full lifecycle of features. Feature toggles are a best practice in DevOps, often occurring within distributed version control systems.

# Setup

This library depends on an account with [Toggle Tools](https://www.toggle.tools/). Follow the steps below to get started.

1. Choose an account from the [plans page](https://www.toggle.tools/pricing) and register.
2. Navigate to the account page and click on the API tab. Make note of the account ID.
3. Create a feature toggle in the dashboard. If needed [follow the docs](https://www.foo.software/toggle-tools-how-to-create-a-feature-toggle/)!
4. Navigate to the toggle detail page through the dashboard screen and make note of the "Environment API Name" and "Toggle API Name".

At this point you should have three items noted: account ID, environment name, and toggle name.

# Usage

You'll need to use a "provider" to setup configuration at the application level. You could do this in `App.js` for example.

> App.js

```jsx
import React from 'react';
// other imports...
import { ToggleProvider } from '@foo-software/react-feature-toggle';

// this is just an example, but these values can come from anywhere
// you're comfortable with
const {
  REACT_APP_TOGGLE_ACCOUNT_ID,
  REACT_APP_TOGGLE_ENVIRONMENT,
} = process.env;

export default () => {
  // things...
  return (
    <ToggleProvider
      accountId={REACT_APP_TOGGLE_ACCOUNT_ID}
      environmentName={REACT_APP_TOGGLE_ENVIRONMENT}
    >
      {/* all the things here */}
    </ToggleProvider>
  )
};
```

With the above you can use the `useToggle` hook like so.

> Example.js

```jsx
import { useToggle } from '@foo-software/react-feature-toggle';

export default () => {
  const { isOn } = useToggle({ toggleName: 'example' });

  return (
    <>
      {isOn && (
        <div>
          My example feature.
        </div>
      )}
      <div>
        Some other thing.
      </div>
    </>
  );
};
```
