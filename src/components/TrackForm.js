import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { trackname, isRecording, locations}, 
        startRecording, 
        stopRecording, 
        changeName
    } = useContext(LocationContext);
    const [saveTrackHook] = useSaveTrack();

    return (
        <>
            <Spacer>
                <Input placeholder="Enter Name" onChangeText={changeName} value={trackname} />
            </Spacer>
            <Spacer>
            {
                (isRecording)
                    ? <Button title="Stop" onPress={stopRecording}/>
                    : <Button title="Start Recording" onPress={startRecording} />
            }
            </Spacer>
            <Spacer>
            {
                (!isRecording && locations.length)
                    ? <Button title="Save Recording" onPress={saveTrackHook} />
                    : null
            }
            </Spacer>
        </>
    );
};

export default TrackForm;