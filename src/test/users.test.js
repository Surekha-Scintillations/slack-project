import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Users from '../containers/users';
import User from '../components/user';
import MockData from '../reducers/sample-data';

Enzyme.configure({
  adapter: new Adapter(),
});

const initialState = {
  users: MockData.users,
};
const mockStore = configureStore();
let wrapper;
let store;

describe('<Users />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Users store={store}/>).dive();
  });

  it('should render <Users /> component', () => {
    expect(wrapper.find(User)).to.have.lengthOf(2);
  });
});
