import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });
  });

  afterAll(() => {
    jest.unmock('axios');
    jest.unmock('lodash');
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/users/1';

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/comments/1';
    const mockResponseData = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post',
    };

    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockResponseData);
  });
});
