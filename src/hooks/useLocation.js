import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    let LocationSubscriber;
    const [errPermissions, setErrPermissions] = useState(null);

    useEffect(() => {
        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                LocationSubscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 10000,
                    distanceInterval: 10
                }, callback
                );
            } catch (err) {
                setErrPermissions(err);
            }
        }
    
        if (shouldTrack) {
            startWatching();
        } else {
            if (LocationSubscriber) LocationSubscriber.remove();
            LocationSubscriber = null; //cleanup
        }

        return () => {
            if (LocationSubscriber) {
                LocationSubscriber.remove();
            }
        }
    }, [shouldTrack, callback]);

    return [errPermissions];
};