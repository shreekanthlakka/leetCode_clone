import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const deleteJob = async (jobName) => {
    try {
        await k8sBatchApi.deleteNamespacedJob(jobName, "default", undefined, {
            propagationPolicy: "Background",
        });
        console.log(`Job ==> ${jobName} deleted`);
    } catch (err) {
        console.error(`Error deleting job ${jobName}:`, err);
    }
};

export { deleteJob };
