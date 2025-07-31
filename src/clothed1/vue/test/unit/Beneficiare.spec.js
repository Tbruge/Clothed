import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import Beneficiare from '@/views/beneficiare.vue';

jest.mock('axios');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();
const store = new Vuex.Store({
  state: {
    userData: {
      name: "John Doe",
      email: "john@example.com"
    }
  }
});

describe('Beneficiare.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Beneficiare, {
      localVue,
      store,
      router
    });
  });

  it('fetches images on mount', async () => {
    const data = { data: [{ id: '1', name: 'Test Image', url: 'http://localhost:3000/api/persons/image/search/person/${id}' }] };
    axios.get.mockResolvedValue(data);
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith('/images');
    expect(wrapper.vm.articles).toEqual(data.data);
  });

  it('handles category sort correctly', async () => {
    const category = 'Vêtement';
    const data = { data: [{ id: '1', name: 'Jacket', url: 'http://localhost:3000/api/persons/image/${category}' }] };
    axios.get.mockResolvedValue(data);
    await wrapper.vm.SortByCategory(category);
    expect(axios.get).toHaveBeenCalledWith(`/image/${category}`);
    expect(wrapper.vm.articles).toEqual(data.data);
  });

  it('fetches person name by ID and shows it', async () => {
    const id = '123';
    const data = { data: [{ nom: 'Jane', prenom: 'Doe' }] };
    axios.get.mockResolvedValue(data);
    await wrapper.vm.getNameByID(id);
    expect(axios.get).toHaveBeenCalledWith(`/image/search/person/${id}`);
    expect(wrapper.vm.nameImage).toEqual(data.data[0]);
    expect(wrapper.vm.isNameVisible).toBeTruthy();

    // Simulate timeout
    jest.advanceTimersByTime(5000);
    expect(wrapper.vm.isNameVisible).toBeFalsy();
  });

  it('throws error with empty category in SortByCategory', async () => {
    const category = '';
    await expect(wrapper.vm.SortByCategory(category)).rejects.toThrow('Category is undefined or empty.');
  });

  it('throws error when ID is empty in getNameByID', async () => {
    const id = '';
    await expect(wrapper.vm.getNameByID(id)).rejects.toThrow('Image ID is undefined or empty.');
  });
});

