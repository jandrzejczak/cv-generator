// Components
import LoginForm from '../components/Login/LoginComponent.vue'

// Utilities
import { mount, VueWrapper } from '@vue/test-utils'
// import { shallowMount, VueWrapper } from '@vue/test-utils';

describe('LoginComponent.vue', () => {
  let wrapper: VueWrapper | any;

  beforeEach(() => {
    // @ts-ignore
    wrapper = mount(LoginForm);
  })


  it('Login form passes', async () => {
    wrapper.vm.formData.email = 'test@test.com';
    wrapper.vm.formData.password = 'Test1234';

    await wrapper.vm.logIn();
    expect(wrapper.emitted().login[0][0].status).toEqual(200)
  })

  it('Login form invalid credentials', async () => {
    wrapper.vm.formData.email = 'test@test.com';
    wrapper.vm.formData.password = 'inValiDpAssW0rd';

    await wrapper.vm.logIn();
    expect(wrapper.emitted().login[0][0].status).toEqual(401)
  })

  it('Login form not all inputs filled', async () => {
    wrapper.vm.formData.email = 'com';
    wrapper.vm.formData.password = '';

    await wrapper.vm.logIn();
    expect(wrapper.emitted().login[0][0].status).toEqual(400)
  })
})

