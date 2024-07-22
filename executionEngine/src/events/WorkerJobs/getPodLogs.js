import k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const getPodLogs = async (podName) => {
    try {
        const log = await k8sCoreApi.readNamespacedPodLog(podName, "default");
        console.log("Job output: ==> ", log.body);
        return log.body;
    } catch (err) {
        console.error("Error reading pod logs:", err.body.message);
    }
};

export { getPodLogs };
