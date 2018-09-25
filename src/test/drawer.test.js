import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Drawer from '../drawer';
import Users from '../containers/users';
import UserRooms from '../containers/user-rooms';
import JoinableRooms from '../containers/joinable-rooms';
import SendMessage from '../components/send-message';

Enzyme.configure({
  adapter: new Adapter(),
});

let wrapper;

describe('<Drawer />', () => {
  beforeEach(() => {
    wrapper = shallow(<Drawer />).dive();
  });

  it('should render <Drawer /> component', () => {
    expect(wrapper.find(Users)).to.have.lengthOf(1);
    expect(wrapper.find(SendMessage)).to.have.lengthOf(1);
    expect(wrapper.find(UserRooms)).to.have.lengthOf(1);
    expect(wrapper.find(JoinableRooms)).to.have.lengthOf(1);
  });
});
