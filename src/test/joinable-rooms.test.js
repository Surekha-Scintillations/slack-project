import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import JoinableRooms from '../containers/joinable-rooms';
import Rooms from '../components/rooms';
import MockData from '../reducers/sample-data';

Enzyme.configure({
  adapter: new Adapter(),
});

const initialState = {
  joinableRooms: MockData.joinableRooms,
};
const mockStore = configureStore();
let wrapper;
let store;

describe('<Users />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<JoinableRooms store={store}/>).dive();
  });

  it('should render <Users /> component', () => {
    expect(wrapper.find(Rooms)).to.have.lengthOf(1);
  });
});
