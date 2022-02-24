export function getSinglesList(state) {
    return state.singles.singles
}

export const getSinglesError = (state) => state.singles.error;

export const getSinglesLoading = (state) => state.singles.request;