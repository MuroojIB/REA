import { useState, useEffect } from "react";
import * as Location from "expo-location";
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

    const checkUserLocation = async () => {
        try {
            setStatus("loading");

            // Request location permission from the device
            const { status: permissionStatus } =
                await Location.requestForegroundPermissionsAsync();

            if (permissionStatus !== "granted") {
                setStatus("permission-denied");
                setErrorMessage("يرجى السماح للتطبيق بالوصول إلى موقعك.");
                return;
            }

            // Get current device GPS coordinates
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const { latitude, longitude } = currentLocation.coords;

            // Calculate distance between user and facility using Haversine formula
            const calculatedDistance = getDistanceInMeters(
                latitude,
                longitude,
                FACILITY.latitude,
                FACILITY.longitude,
            );

            setDistance(calculatedDistance);

            // Check if user is within the allowed radius (e.g., 200m)
            if (calculatedDistance <= FACILITY.allowedRadiusMeters) {
                setStatus("inside");
            } else {
                setStatus("outside");
            }
        } catch (error) {
            setStatus("unavailable");
            setErrorMessage("تعذر تحديد موقعك. تأكد أن خدمة الموقع تعمل.");
        }
    };

    //Run location check when the hook mounts
    useEffect(() => {
        checkUserLocation();
    }, []);

    return {
        status,
        distance,
        errorMessage,
        refetchLocation: checkUserLocation,
    };
}
