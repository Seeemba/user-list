import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import UserList from '../../src/components/UserList.vue';

describe('UserList', () => {
  it('renders props.msg when passed', () => {
    const msg = '';
    const wrapper = shallowMount(UserList, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
