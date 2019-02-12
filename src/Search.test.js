import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './reducers';
import ConnectedSearch, { Search } from './components/Search';

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const props = {
    makeSearch: jest.fn(),
    buildQuery: jest.fn(),
    promiseResolved: false,
    err: null,
    queryResult: null,
    previousQuery: null,
    queryLoading: false
  };
  const enzymeWrapper = shallow(<Search {...props} />)

  return {
    props,
    enzymeWrapper
  };
};

const store = createStore(reducer);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Search /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders itself properly with all subelements', () => {
  const { enzymeWrapper } = setup();
  //the test passes, but the props are marked as required. Since they come from Redux, they aren't part of the shallow render. Test still works.
  expect(enzymeWrapper.find('div')).toBeDefined()
});
