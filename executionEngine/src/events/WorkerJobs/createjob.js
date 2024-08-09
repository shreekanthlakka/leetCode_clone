import k8s from "@kubernetes/client-node";
import { BaseImages, Commend } from "@shreekanthlakka/common";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const createJob = async (data, configMapName, inputs) => {
    const { language, title } = data;
    console.log("inputs =====>", inputs);
    const inputStr = inputs.join(" ");

    let image = "";
    let command = [];
    let exeCommand = [];
    switch (language) {
        case "javascript":
            image = BaseImages.javascript;
            command = Commend.javascript;
            break;
        case "cplusplus":
            image = BaseImages.cplusplus;
            command = Commend.cplusplus;
            console.log("COMMEND +++++   =====> ", command);
            break;
        case "rust":
            image = BaseImages.rust;
            command = Commend.rust;
            break;
        case "python":
            image = BaseImages.python;
            command = Commend.python;
        default:
            image = "";
            command = [];
            break;
    }
    // ==> tmp/function 1 1
    if (language === "cplusplus" || language === "rust") {
        const compileCommand = command[command.length - 1].split("&&")[0];
        const runCommand = `${
            command[command.length - 1].split("&&")[1]
        } ${inputStr}`;
        exeCommand = ["/bin/sh", "-c", `${compileCommand} && ${runCommand}`];
    } else {
        exeCommand = command;
    }
    console.log(" <---------- Image ------------>", image);
    console.log(" <---------- Command ------------>", command);
    console.log(" <---------- exeCommand ------------>", exeCommand);

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
                            // image: "node:alpine",
                            // command: ["node", "/scripts/index.js"],
                            image: image,
                            command: exeCommand,
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
