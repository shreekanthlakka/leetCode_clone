import k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const createJob = async (data, configMapName, inputs) => {
    const { language, title } = data;

    const jobManifest = {
        apiVersion: "batch/v1",
        kind: "Job",
        metadata: {
            name: `job${language}-${Date.now()}`,
        },
        spec: {
            template: {
                spec: {
                    containers: [
                        {
                            name: title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-"),
                            image: "node:alpine",
                            command: ["node", "/scripts/index.js"],
                            args: inputs,
                            volumeMounts: [
                                {
                                    name: "scripts",
                                    mountPath: "/scripts",
                                },
                            ],
                        },
                    ],
                    restartPolicy: "Never",
                    volumes: [
                        {
                            name: "scripts",
                            configMap: {
                                name: configMapName,
                            },
                        },
                    ],
                },
            },
        },
    };

    try {
        const res = await k8sBatchApi.createNamespacedJob(
            "default",
            jobManifest
        );
        // console.log("====> ", res.body.message);
        return res.body.metadata.name;
    } catch (err) {
        console.error(err.body.message);
    }
};

export { createJob };
