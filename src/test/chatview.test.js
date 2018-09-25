import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import ChatView from '../containers/chat-view';
import Drawer from '../drawer';

Enzyme.configure({
  adapter: new Adapter(),
});

const initialState = {
};
const mockStore = configureStore();
let wrapper;
let store;

describe('<ChatView />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<ChatView store={store} currentUserId="Surekha" />).dive();
  });

  it('should render <ChatView /> with 1 Drawer component', () => {
    expect(wrapper.find(Drawer)).to.have.lengthOf(1);
  });
});
