import { test, expect, vi, beforeEach } from 'vitest';
import { renderNews } from '../src/views/news.js';

const fetchMock = vi.fn();

beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);    
    fetchMock.mockReset();
});

test('Get all the news', async () => {    
    // Mock with mockImplementation to handle different URLs
    fetchMock.mockImplementation((url) => {
        if (url.includes('topstories')) {
            // First call - returns array of news IDs
            return Promise.resolve({
                ok: true,
                json: async () => ([1, 2, 3, 4, 5])
            });
        } else if (url.includes('item')) {
            // Second calls (5 times) - returns individual news items
            return Promise.resolve({
                ok: true,
                json: async () => ({
                    title: 'Test News Item',
                    url: 'https://example.com'
                })
            });
        }
        return Promise.reject(new Error('Unknown URL'));
    });

    // Ejecutamos nuestra función
    const app = document.createElement('div');
    document.body.appendChild(app);
    await renderNews( app );

    // Verificaciones (Asserts)
    expect(app.textContent).match(/Test News Item/);
    expect(fetchMock).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/topstories.json');
    expect(fetchMock).toHaveBeenCalledTimes(6); // 1 topstories + 5 items
});


