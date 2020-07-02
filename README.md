# React Feature Toggle

> `@foo-software/react-feature-toggle`

A feature toggle for React. Feature toggles (otherwise known as feature flags or feature switches) are a software development technique that provides a way of turning functionality or display on and off during runtime, without deploying new code. This allows for more control and experimentation over the full lifecycle of features. Feature toggles are a best practice in DevOps, often occurring within distributed version control systems.

## Setup

This library depends on a [feature toggle account with Foo](https://www.foo.software). Follow the steps below to get started.

1. Choose an account from the [plans page](https://www.foo.software/pricing) and register.
2. Navigate to the account page and click on the API tab. Make note of the account ID.
3. Create a feature toggle in the dashboard. If needed [follow the docs](https://www.foo.software/toggle-tools-how-to-create-a-feature-toggle/)!
4. Navigate to the toggle detail page through the dashboard screen and make note of the "Environment API Name" and "Toggle API Name".

At this point you should have three items noted: account ID, environment name, and toggle name.

## Usage

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

## `ToggleProvider`: Props

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>accountId</code></td>
    <td>string</td>
    <td>yes</td>
    <td>The account ID of your Toggle Tools account as explained in the <a href="#setup">setup section</a>.</td>
  </tr>
  <tr>
    <td><code>environmentName</code></td>
    <td>string</td>
    <td>yes</td>
    <td>The environment the toggle belongs to by name as explained in the <a href="#setup">setup section</a>.</td>
  </tr>
  <tr>
    <td><code>fetch</code></td>
    <td>function</td>
    <td>no</td>
    <td>By default React Feature Toggle will use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch Web API</a> to fetch toggle state from Toggle Tools API. This prop can be used to override by providing preferable fetch function. It should share the same API.</td>
  </tr>
  <tr>
    <td><code>children</code></td>
    <td>node</td>
    <td>yes</td>
    <td>The node to be rendered by the provider. This is similar to any standard provider component.</td>
  </tr>
</table>

## `useToggle`

Accepts an object argument with a `toggleName` property. `toggleName` should be the value described in the [setup section](#setup).

#### `useToggle`: Return Object

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>isOn</code></td>
    <td>boolean</td>
    <td>Signifies whether the toggle is toggled on.</td>
  </tr>
  <tr>
    <td><code>status</code></td>
    <td>oneOf([<code>null</code>, "<code>pending</code>", "<code>fulfilled</code>", "<code>rejected</code>"])</td>
    <td>Fetch status of the toggle.</td>
  </tr>
</table>

## `ToggleContext`

A React context set by `ToggleProvider`. It holds values from props passed to `ToggleProvider` with the addition of a value named `toggles`. `toggles` is a collection of all toggles set in the current runtime. Below is an example.

```json
{
  "myToggle1": {
    "isOn": false,
    "status": "fulfilled"
  },
  "myToggle2": {
    "isOn": null,
    "status": "rejected"
  }
}
```
