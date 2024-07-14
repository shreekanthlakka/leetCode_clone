import { URI } from "./userService";

const addProblemApi = async (formData) => {
    try {
        const res = await fetch(`${URI}/author/problems`, {
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

const getAllProblemsApi = async () => {
    try {
        const res = await fetch(`${URI}/problems`, {
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

const getBoilerPlateCodeApi = async (id) => {
    try {
        const res = await fetch(`${URI}/problems/${id}/boilerplatecode`, {
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

export {
    addProblemApi,
    getAllProblemsApi,
    getBoilerPlateCodeApi,
    submitProblemApi,
};
