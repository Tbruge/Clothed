import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import Button from '@/components/bouton.vue';
import searchByName from '@/views/searchByName.vue';
import flushPromises from 'flush-promises';
import axiosMockAdapter from 'axios-mock-adapter';

jest.mock('axios');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();
const store = new Vuex.Store({
  state: {
    userData: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  }
});

describe('SearchComponent.vue', () => {
  let axiosMock;
  let wrapper;

  beforeEach(() => {
    axiosMock = new axiosMockAdapter(axios);
    wrapper = shallowMount(searchByName, {
      localVue,
      store,
      router,
      components: { Button }
    });
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('searches for articles based on the provided keyword', async () => {
    const articles = [{ id: 1, name: 'Test Article', url: 'http://localhost:3000/api/persons/images/search/${keyword.value' }];
    axiosMock.onGet(`/images/search/test`).reply(200, articles);
    wrapper.vm.keyword = 'test';
    wrapper.vm.searchByName();
    await flushPromises();

    expect(wrapper.vm.articles).toEqual(articles);
    expect(axios.get).toHaveBeenCalledWith(`/images/search/test`);
  });

  it('handles errors during search', async () => {
    axiosMock.onGet(`/images/search/fail`).reply(500);
    wrapper.vm.keyword = 'fail';
    wrapper.vm.searchByName();
    await flushPromises();

    expect(wrapper.vm.articles.length).toBe(0);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Erreur lors de la recherche'));
  });

  it('navigates back to the log account page when retour is called', async () => {
    wrapper.vm.retour();
    await flushPromises();

    expect(router.push).toHaveBeenCalledWith({ name: 'LogAccount' });
  });
});
