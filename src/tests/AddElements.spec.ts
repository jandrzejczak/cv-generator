// Components
import CreateView from '../views/CreateView.vue';

// Utilities
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
// import { shallowMount, VueWrapper } from '@vue/test-utils';

import { layoutElementTypes } from '../classes/PageElements';

describe('CreateView.vue', () => {
  let wrapper: VueWrapper | any;

  beforeEach(() => {
    // @ts-ignore
    wrapper = shallowMount(CreateView);
  });

  it('Simple text element is added to layout', async () => {
    await wrapper.vm.addNewElement(layoutElementTypes.simpleTextElement);
    expect(wrapper.vm.layout[0].type).toEqual(
      layoutElementTypes.simpleTextElement.type
    );
  });

  it('Bullet text element is added to layout', async () => {
    await wrapper.vm.addNewElement(layoutElementTypes.bulletTextElement);
    expect(wrapper.vm.layout[0].type).toEqual(
      layoutElementTypes.bulletTextElement.type
    );
  });

  it('Horizontal spacer element is added to layout', async () => {
    await wrapper.vm.addNewElement(layoutElementTypes.horizontalSpacer);
    expect(wrapper.vm.layout[0].type).toEqual(
      layoutElementTypes.horizontalSpacer.type
    );
  });

  it('Vertical spacer element is added to layout', async () => {
    await wrapper.vm.addNewElement(layoutElementTypes.verticalSpacer);
    expect(wrapper.vm.layout[0].type).toEqual(
      layoutElementTypes.verticalSpacer.type
    );
  });
});
