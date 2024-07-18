import { URI } from "./userService";

const getAllSubmissionsApi = async (problemId) => {
    try {
        const res = await fetch(`${URI}/problems/submit/${problemId}`, {
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

const submitProblemApi = async (formData, problemId) => {
    try {
        const res = await fetch(`${URI}/problems/submit/${problemId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllSubmissionsApi, submitProblemApi };
