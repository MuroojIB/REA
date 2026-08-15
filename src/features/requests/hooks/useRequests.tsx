import React, { createContext, useContext, useState, ReactNode } from "react";
import { ExcuseRequest } from "../types";
import { MOCK_REQUESTS } from "../data/mockRequests";

interface RequestsContextType {
    requests: ExcuseRequest[];
    addRequest: (newRequest: ExcuseRequest) => void;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export const RequestsProvider = ({ children }: { children: ReactNode }) => {
    const [requests, setRequests] = useState<ExcuseRequest[]>(MOCK_REQUESTS);

    const addRequest = (newRequest: ExcuseRequest) => {
        setRequests((prevRequests) => [newRequest, ...prevRequests]);
    };

    return (
        <RequestsContext.Provider value={{ requests, addRequest }}>
            {children}
        </RequestsContext.Provider>
    );
};

export const useRequests = () => {
    const context = useContext(RequestsContext);
    if (!context) {
        throw new Error("useRequests must be used within a RequestsProvider");
    }
    return context;
};