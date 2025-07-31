import { shallowMount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import Donateur from '@/views/donateur.vue';
import Button from '@/components/bouton.vue';

jest.mock('axios');
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('Donateur.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Donateur, {
      global: {
        components: {
          Button
        }
      }
    });
  });

  it('submits the form with selected image and valid category', async () => {
    const fakeEvent = { target: { files: [new File([''], 'test.jpg')] } };
    wrapper.vm.handleImageUpload(fakeEvent);
    wrapper.vm.articleCategory = 'Vêtement';
    axios.post.mockResolvedValue({ data: 'Réponse du backend' });

    await wrapper.vm.submitForm();
    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(FormData));
    expect(wrapper.vm.$router.push).not.toHaveBeenCalledWith({ name: 'Error' });
  });

  it('throws an error if no image is loaded when submitting', async () => {
    await expect(wrapper.vm.submitForm()).rejects.toThrow('Aucune image chargée');
  });

  it('throws an error if no category is selected when submitting', async () => {
    const fakeEvent = { target: { files: [new File([''], 'test.jpg')] } };
    wrapper.vm.handleImageUpload(fakeEvent);
    wrapper.vm.articleCategory = '';

    await expect(wrapper.vm.submitForm()).rejects.toThrow('Catégorie d\'article non sélectionnée');
  });

  it('resets the form correctly', () => {
    wrapper.vm.resetForm();

    expect(wrapper.vm.articleCategory).toBe('');
    expect(wrapper.vm.selectedImage).toBeNull();
  });
});

