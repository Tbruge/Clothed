import { shallowMount, createLocalVue } from '@vue/test-utils';
import ArticleDetails from '@/views/article_details.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';

jest.mock('axios');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();
const store = new Vuex.Store({
  state: {
    articleDetail: {}
  },
  mutations: {
    setArticleDetail(state, { article }) {
      state.articleDetail = article;
    },
    setUserDataMessage(state, payload) {
      state.userData = payload;
    }
  }
});

describe('ArticleDetails.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ArticleDetails, {
      localVue,
      store,
      router,
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
  });

  it('fetches article on mount with valid ID', async () => {
    const responseData = { data: [{ id: '123', name: 'Test Article', url: 'http://localhost:3000/api/persons/image/search/${articleId}' }] };
    axios.get.mockResolvedValue(responseData);
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith('/image/search/123');
    expect(wrapper.vm.article).toEqual(responseData.data[0]);
  });

  it('throws error when ID is missing', async () => {
    wrapper = shallowMount(ArticleDetails, {
      localVue,
      store,
      router,
      mocks: {
        $route: { params: {} } // Missing ID
      }
    });
    await expect(wrapper.vm.fetchArticle).toThrow('Article ID is missing.');
  });

  it('login without username and password throws error', async () => {
    await expect(wrapper.vm.login()).rejects.toThrow('Both username and password are required for login.');
  });

  it('save to local storage with empty article details throws error', () => {
    wrapper.setData({ article: {} });
    expect(() => {
      wrapper.vm.saveToLocalStorage();
    }).toThrow('Cannot save empty article details to localStorage.');
  });
});

