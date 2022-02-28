import { useEffect } from 'react';
import { getSinglesThunk } from '../../store/singles/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSinglesError, getSinglesList } from './../../store/singles/selector';
import { shallowEqual } from 'react-redux';
import { getSinglesLoading } from './../../store/singles/selector';
import Singles from './singles';
import { useCallback } from 'react';

const SinglesContainer = () => {
    const dispatch = useDispatch();
    const singlesList = useSelector(getSinglesList, shallowEqual);
    const singlesLoading = useSelector(getSinglesLoading, shallowEqual);
    const singlesError = useSelector(getSinglesError, shallowEqual);

    const getSingles = useCallback(() => {
        dispatch(getSinglesThunk());
    });

    useEffect(() => {
        getSingles();
    }, []);

    return (
        <Singles singlesList={singlesList} singlesLoading={singlesLoading} singlesError={singlesError} getSingles={getSingles} />
    )
}
export default SinglesContainer;