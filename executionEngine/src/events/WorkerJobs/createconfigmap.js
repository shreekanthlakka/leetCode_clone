import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const LanguageFileExtensions = Object.freeze({
    javascript: "js",
    rust: "rs",
    cplusplus: "cpp",
    python: "py",
});

const createConfigMap = async (data) => {
    const { typedCode, language } = data;
    const configMapName = `script-${language}-${Math.random()}`;
    const configMap = {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
            name: configMapName,
        },
        data: {
            [`function.${LanguageFileExtensions[language]}`]: typedCode,
        },
    };

    try {
        const res = await k8sCoreApi.createNamespacedConfigMap(
            "default",
            configMap
        );
        console.log("Config Map created==> ", res.body.metadata.name);
        return res.body.metadata.name;
    } catch (err) {
        console.error(err.body.message);
        return null;
    }
};

export { createConfigMap };
