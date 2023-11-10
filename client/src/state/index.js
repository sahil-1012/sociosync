import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
    user: 'null',
    userPhoto: 'null',
    token: 'null',
    posts: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload.user
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.userPhoto = action.payload.userPhoto
            state.token = action.payload.token
        },
        setLogout: (state, action) => {
            state.user = null;
            state.userPhoto = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("User friends don't exist")
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts?.map((post) => {
                if (post._id === action.payload.post._id) { return action.payload.post; }
                return post;
            })
            state.posts = updatedPosts;
        },
    }
})

export const { setMode, setCurrentUser, setLogin, setLogout, setPost, setPosts, setFriends } = authSlice.actions;
export default authSlice.reducer;