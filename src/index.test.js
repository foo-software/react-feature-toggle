import * as packageExports from '.';

describe('@foo-software/react-feature-toggle', () => {
  it('should match snapshot', () => {
    expect(packageExports).toMatchSnapshot();
  });
});
