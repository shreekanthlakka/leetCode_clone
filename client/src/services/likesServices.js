import { URI } from "./userService";

const like_dislikeCommentApi = async (problemId, commentId, liked) => {
    try {
        const res = await fetch(`${URI}/likes/${problemId}/${commentId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                liked,
            }),
        });
        const data = await res.json();
        // console.log(" ==> ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const totalLikesApi = async (problemId) => {
    try {
        const res = await fetch(`${URI}/likes/all/${problemId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        // console.log(" Total Likes ==> ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { like_dislikeCommentApi, totalLikesApi };
