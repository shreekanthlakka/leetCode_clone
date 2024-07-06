import k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const startJob = async (data, msg) => {
    const { typedCode, language, problemId, userId, title } = data;
    try {
        const configMap = await createConfigMap(data);
        if (configMap) {
            const jobName = await createJob(data, configMap);
            if (jobName) {
                const podName = await waitForJobCompletion(jobName);
                if (podName) {
                    const result = await getPodLogs(podName);
                    if (result) {
                        await deleteJob(jobName);
                    }
                }
            }
        }
    } catch (error) {
        console.log(" ===> ", error.body.message);
    } finally {
        msg.ack();
    }
};

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

const createJob = async (data, configMapName) => {
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

const waitForJobCompletion = async (jobName) => {
    let completed = false;
    let podName = null;

    while (!completed) {
        const res = await k8sCoreApi.listNamespacedPod(
            "default",
            undefined,
            undefined,
            undefined,
            undefined,
            `job-name=${jobName}`
        );
        const pod = res.body.items[0];
        if (pod) {
            podName = pod.metadata.name;
            if (
                pod.status.phase === "Succeeded" ||
                pod.status.phase === "Failed"
            ) {
                completed = true;
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before checking again
    }

    return podName;
};

const getPodLogs = async (podName) => {
    try {
        const log = await k8sCoreApi.readNamespacedPodLog(podName, "default");
        console.log("Job output: ==> ", log.body);
        return log;
    } catch (err) {
        console.error("Error reading pod logs:", err.body.message);
    }
};

const deleteJob = async (jobName) => {
    try {
        await k8sBatchApi.deleteNamespacedJob(jobName, "default", undefined, {
            propagationPolicy: "Background",
        });
        console.log(`Job ${jobName} deleted`);
    } catch (err) {
        console.error(`Error deleting job ${jobName}:`, err.body.message);
    }
};

export { startJob };

/**
 *
 *
 * 
 * fs.writeFileSync("./index.js", typedCode);


    const jobManifast = {
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
                            name: title,
                            image: "node:alpine",
                            command: ["node"],
                            args: ["./index.js"],
                        },
                    ],
                    restartPolicy: "Never",
                },
            },
        },
    };
    try {
        const res = await k8sBatchApi.createNamespacedJob(
            "default",
            jobManifast
        );
        console.log("====> ", res.body);
    } catch (err) {
        console.error(err.body.message);
    }
 *
 *
 */
