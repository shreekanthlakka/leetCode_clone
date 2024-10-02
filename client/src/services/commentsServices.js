import { URI } from "./userService";
// const URI =
//     window.location.origin === "https://leetcode.dev"
//         ? "https://leetcode.dev/api/v1"
//         : "http://www.leetcode-dev.store/api/v1";

const createCommentApi = async (id, commentObj) => {
    console.log("problemObj =>", id, "comment obj =>", commentObj);
    try {
        const res = await fetch(`${URI}/comments/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentObj),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status !: ${res.status}`);
        }
        const data = await res.json();
        console.log("DATA ==> Comments Api ==>", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getCommentsByProblemIdApi = async (problemId) => {
    try {
        console.log("URI ==> ", URI);
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

const deleteCommentApi = async (problemId, commentId) => {
    try {
        const res = await fetch(`${URI}/comments/${problemId}/${commentId}`, {
            method: "DELETE",
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

const updateCommentApi = async (updateObj, problemId, commentId) => {
    try {
        const res = await fetch(`${URI}/comments/${problemId}/${commentId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export {
    createCommentApi,
    getCommentsByProblemIdApi,
    deleteCommentApi,
    updateCommentApi,
};
