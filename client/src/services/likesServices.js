import { URI } from "./userService";

const like_dislikeCommentApi = async (status, problemId, commentId) => {
    try {
        const res = await fetch(`${URI}/likes/${problemId}/${commentId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status,
            }),
        });
        const data = await res.json();
        console.log(" ==> ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { like_dislikeCommentApi };
