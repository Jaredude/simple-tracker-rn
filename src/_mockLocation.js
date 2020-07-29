import * as Location from 'expo-location';

const tenMeterswithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0.05070092901587486,
            heading: 43.778236389160156,
            accuracy: 4,
            altitudeAccuracy: 5,
            altitude: 267.3999938964844,
            longitude: -118.7572142 + ((increment%3)? -0.25: 0.25) * increment * tenMeterswithDegrees,
            latitude: 34.2868666 + increment * 0.25 * tenMeterswithDegrees
        }
    }
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);