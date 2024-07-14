import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const createConfigMap = async (data) => {
    const { typedCode, language } = data;
    const configMap = {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
            name: `script-${language}-${Date.now()}`,
        },
        data: {
            "index.js": typedCode,
        },
    };

    try {
        const res = await k8sCoreApi.createNamespacedConfigMap(
            "default",
            configMap
        );
        return res.body.metadata.name;
    } catch (err) {
        console.error(err.body.message);
        return null;
    }
};

export { createConfigMap };
