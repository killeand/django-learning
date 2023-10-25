import { TanQuery } from "../Query";
import { Axios } from "../Axios";

export const ListUsers = {
    queryKey: ['users'],
    queryFn: () => Axios.get("/api/users").then((resp) => resp.data),
    staleTime: 5 * 60 * 1000
};

export const CreateUsers = (callbackFn) => ({
    mutationFn: (userData) => Axios.post("/api/users/", userData).then((resp) => resp.data),
    onMutate: () => {
        TanQuery.invalidateQueries({ queryKey: ['users'] });
        if (callbackFn) callbackFn();
    },
    onSuccess: () => {
        TanQuery.invalidateQueries({ queryKey: ['users'] });
        if (callbackFn) callbackFn();
    },
});

export const DeleteUsers = (callbackFn) => ({
    mutationFn: (id) => Axios.delete("/api/users/" + id).then((resp) => resp.data),
    onMutate: () => {
        TanQuery.invalidateQueries({ queryKey: ['users'] });
        if (callbackFn) callbackFn();
    },
    onSuccess: () => {
        TanQuery.invalidateQueries({ queryKey: ['users'] });
        if (callbackFn) callbackFn();
    },
});