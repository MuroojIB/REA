import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { AppState } from "react-native";
import { FACILITY } from "../../../constants/facility";
import { getDistanceInMeters } from "../utils/distance";

export type LocationStatus =
    | "loading"
    | "permission-denied"
    | "unavailable"
    | "inside"
    | "outside";

export function useLocation() {
    const [status, setStatus] = useState<LocationStatus>("loading");
    const [distance, setDistance] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

    const evaluateDistance = (latitude: number, longitude: number) => {
        //Calculate distance between user and facility using Haversine formula
        const calculatedDistance = getDistanceInMeters(
            latitude,
            longitude,
            FACILITY.latitude,
            FACILITY.longitude,
        );

        setDistance(calculatedDistance);

        setStatus(
            calculatedDistance <= FACILITY.allowedRadiusMeters ? "inside" : "outside"
        );
    };

    const startWatching = async () => {
        try {
            setStatus("loading");

            //Request location permission from the device
            const { status: permissionStatus } =
                await Location.requestForegroundPermissionsAsync();

            if (permissionStatus !== "granted") {
                setStatus("permission-denied");
                setErrorMessage("Please allow the app to access your location");
                return;
            }

            subscriptionRef.current?.remove();

            //Continuously watch the device's GPS coordinates
            subscriptionRef.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,   
                    distanceInterval: 10, 
                },
                (currentLocation) => {
                    const { latitude, longitude } = currentLocation.coords;
                    evaluateDistance(latitude, longitude);
                }
            );
        } catch (error) {
            setStatus("unavailable");
            setErrorMessage("Unable to determine your location\nMake sure the location service is enabled");
        }
    };

    const revalidatePermission = async () => {
        const { status: permissionStatus } =
            await Location.getForegroundPermissionsAsync();

        if (permissionStatus !== "granted") {
            subscriptionRef.current?.remove();
            setStatus("permission-denied");
            setErrorMessage("Location access was turned off. Please re-enable it in settings.");
        } else {
            startWatching();
        }
    };

    //Start watching when the hook mounts
    useEffect(() => {
        startWatching();

        const appStateSubscription = AppState.addEventListener("change", (nextState) => {
            if (nextState === "active") {
                revalidatePermission();
            }
        });

        return () => {
            subscriptionRef.current?.remove();
            appStateSubscription.remove();
        };
    }, []);

    return {
        status,
        distance,
        errorMessage,
        refetchLocation: startWatching,
    };
}