import {
    getSinglesSuccess,
    GET_SINGLES_SUCCESS,
    getSinglesThunk,
    getSinglesRequest,
    getSinglesFailure
} from "../actions";

describe('getSinglesSuccess', () => {
    test('returns object with type and payload', () => {
        const data = [];
        const expected = {
            type: GET_SINGLES_SUCCESS,
            payload: {
                data
            }
        };
        const recieved = getSinglesSuccess(data);
        expect(expected).toEqual(recieved);
    });
});

describe('getSinglesThunkTest', () => {
    test('calls fn passed as an arg with getSinglesRequest', () => {
        const mockDispatch = jest.fn();
        getSinglesThunk()(mockDispatch);
        expect(mockDispatch).toHaveBeenCalledWith(getSinglesRequest())
    });

    test("calls fn passed as an arg with getSinglesSuccess if fetch was successful", async () => {
        const mockDispatch = jest.fn();
        const result = ["test"];
        // eslint-disable-next-line no-undef
        fetchMock.mockResponseOnce(JSON.stringify(result));
        await getSinglesThunk()(mockDispatch);
        expect(mockDispatch).toHaveBeenLastCalledWith(getSinglesSuccess(result));
    });

    test("calls fn passed as an arg with getSinglesFailure if fetch was unsuccessful", async () => {
        const mockDispatch = jest.fn();
        const error = new Error("some fetch error");
        // eslint-disable-next-line no-undef
        fetchMock.mockRejectOnce(error);
        await getSinglesThunk()(mockDispatch);
        expect(mockDispatch).toHaveBeenLastCalledWith(getSinglesFailure(error));
      });
});