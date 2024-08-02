import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
const deletePod = async (podName) => {
    try {
        await k8sCoreApi.deleteNamespacedPod(podName, "default");
        console.log(`Pod ==>${podName} deleated`);
    } catch (error) {
        console.log("Error deleting pod", error);
    }
};

export { deletePod };
