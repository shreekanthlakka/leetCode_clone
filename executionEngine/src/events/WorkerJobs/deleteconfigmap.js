import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const deleteConfigMap = async (configMap) => {
    try {
        await k8sCoreApi.deleteNamespacedConfigMap(configMap, "default");
        console.log(`ConfigMap ==>${configMap} deleated`);
    } catch (error) {
        console.log("Error deleting configmap", error);
    }
};

export { deleteConfigMap };
