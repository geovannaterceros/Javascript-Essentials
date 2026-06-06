// userService.test.js
import { test, expect, vi } from 'vitest';
import { renderProfile } from '../src/views/profile.js';
import axios from 'axios';

// 1. Tell Vitest to intercept any import of 'axios' globally in this test file
vi.mock('axios');

test('fetchUserEmail returns the user email on successful API call', async () => {
    // 2. Define what the mocked axios.get should return for this specific test
    var response = {
        data: {            
            results: [{ email: 'hello@vitest.dev', name: {first:'jhon', last:'smith'}}]
        }
    }

    vi.mocked(axios.get).mockResolvedValue(response);

    // 3. Call the function. It will hit the mock instead of the real internet.
    await renderProfile( document.createElement('div'));

    //expect(email).toBe('hello@vitest.dev');
    expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/');
});

test('fetchUserEmail returns fallback string when API fails', async () => {
    // 2. Simulate a network/server failure easily
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));

    var response = await renderProfile( document.createElement('div'));

    expect(response).toBe('Email unavailable');
});