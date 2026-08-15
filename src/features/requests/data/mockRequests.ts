import { ExcuseRequest } from "../types";

export const MOCK_REQUESTS: ExcuseRequest[] = [
    {
        id: "1",
        type: "late-arrival",
        title: "Late Arrival",
        date: "Nov 15, 2023",
        timeRange: "08:00 AM - 09:30 AM",
        reason: "Attending a family wedding out of state.",
        status: "pending",
        createdAt: "2023-11-14T10:00:00Z",
    },
    {
        id: "2",
        type: "early-leave",
        title: "Early Leave",
        date: "Oct 10, 2023",
        timeRange: "03:00 PM - 05:00 PM",
        reason: "Medical appointment in the afternoon.",
        status: "approved",
        createdAt: "2023-10-09T10:00:00Z",
    },
];