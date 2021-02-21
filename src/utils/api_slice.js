import { useClient, useQuery } from 'jsonapi-react';
export const fetchCompanies = createAsyncThunk('companies', async () => {
  const client = useClient();
  const {response, error } = await client.fetch('companies')
  return response
})

const postsSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})
