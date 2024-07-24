import { URI } from "./userService";

const createCommentApi = async (id, commentObj) => {
    try {
        const res = await fetch(`${URI}/comments/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentObj),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getCommentsByProblemIdApi = async (problemId) => {
    try {
        const res = await fetch(`${URI}/comments/${problemId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { createCommentApi, getCommentsByProblemIdApi };
