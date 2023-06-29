export const initialState = {
    user: {
        photo: null,
        login: "",
        email: "",
    },
    publications: {
        items: [],
        isLoading: false,
        error: null,
    },
    post: {
        photo: photo,
        comments: [],
    }
}