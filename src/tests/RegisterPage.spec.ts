// Components
import RegisterForm from '../components/Login/RegisterComponent.vue'

// Utilities
import { mount, VueWrapper } from '@vue/test-utils'
// import { shallowMount, VueWrapper } from '@vue/test-utils';

describe('RegisterComponent.vue', () => {
  let wrapper: VueWrapper | any;

  beforeEach(() => {
    // @ts-ignore
    wrapper = mount(RegisterForm);
  })


  it('Register returns not all input fields filled', async () => {
    wrapper.vm.formData.first_name = 'Testing';
    wrapper.vm.formData.last_name = 'New';
    wrapper.vm.formData.email = '';
    wrapper.vm.formData.password = 'Test@2001';
    wrapper.vm.formData.passwordConfirmation = 'Test@2001';

    await wrapper.vm.register();
    expect(wrapper.emitted().register[0][0].status).toEqual(400)
  })

  it('Register user already exists', async () => {
    wrapper.vm.formData.first_name = 'Testing';
    wrapper.vm.formData.last_name = 'New';
    wrapper.vm.formData.email = 'test@test.com';
    wrapper.vm.formData.password = 'Test1234';
    wrapper.vm.formData.passwordConfirmation = 'Test1234';

    await wrapper.vm.register();
    expect(wrapper.emitted().register[0][0].status).toEqual(409)
  })

  it('Register creates new user', async () => {
    // Kind of random mail
    let randomEmail = (Math.random() + 1).toString(36).substring(7);

    wrapper.vm.formData.first_name = 'Testing';
    wrapper.vm.formData.last_name = 'New';
    wrapper.vm.formData.email = `${randomEmail}@test.com'`
    wrapper.vm.formData.password = 'Test1234';
    wrapper.vm.formData.passwordConfirmation = 'Test1234';

    await wrapper.vm.register();
    expect(wrapper.emitted().register[0][0].status).toEqual(201)
  })
})

