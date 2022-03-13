import {
    getSinglesFailure,
    getSinglesRequest
} from '../actions';
import singlesReducer from './../reducer';
import {
    getSinglesSuccess
} from './../actions';

describe("Singles reducer tests", () => {

    test("returns correct state after GET_SINGLES_REQUEST action", () => {
        const singlesStore = singlesReducer([], getSinglesRequest());
        expect(singlesStore).toMatchSnapshot();
    });

    test("returns correct state after GET_SINGLES_FAILURE action", () => {
        const singlesStore = singlesReducer([], getSinglesFailure("err"));
        expect(singlesStore).toMatchSnapshot();
    });

    test("returns correct state after GET_SINGLES_SUCCESS action", () => {
        const singlesStore = singlesReducer([], getSinglesSuccess("test"));
        expect(singlesStore).toMatchSnapshot();
    });

});