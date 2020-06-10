import AuthPanelLayout from '../AuthPanelLayout';
import { MockedProvider } from '@apollo/react-testing';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("auth panel layout test", () => {
   test("test1", () => {
      console.log(AuthPanelLayout)
      const wrapper = shallow(<MockedProvider><AuthPanelLayout /></MockedProvider>);
      console.log(wrapper.debug());
   })
})
