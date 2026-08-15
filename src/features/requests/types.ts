export type RequestStatus = "all" | "pending" | "approved" | "rejected";

export type RequestType = "early-leave" | "late-arrival" | "full-day" | "expense";

export interface ExcuseRequest {
    id: string;
    type: RequestType;
    title: string;
    date: string;
    timeRange?: string;
    reason: string;
    status: Exclude<RequestStatus, "all">;
    createdAt: string;
}