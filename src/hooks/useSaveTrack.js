import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
    const { saveTrack } = useContext(TrackContext);
    const { state: { locations, trackname}, reset} = useContext(LocationContext);

    const saveTrackHook = async () => {
        await saveTrack(trackname, locations);
        reset();
        navigate('TrackList');
    }

    return [saveTrackHook];
}