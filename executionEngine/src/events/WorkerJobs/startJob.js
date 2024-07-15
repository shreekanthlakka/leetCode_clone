import k8s from "@kubernetes/client-node";
import { createConfigMap } from "./createconfigmap.js";
import { createJob } from "./createjob.js";
import { getPodLogs } from "./getPodLogs.js";
import { deleteJob } from "./deleteJob.js";
import { deletePod } from "./deletepod.js";
import { deleteConfigMap } from "./deleteconfigmap.js";
import { JobCompletedStatusPublisher } from "../publishers/jobcompleted-status-publisher.js";
import { natsWrapper } from "../../nats-wrapper.js";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const startJob = async (data, inputs, output) => {
    const { typedCode, language, problemId, userId, title } = data;
    let STATUS = "FAILED";
    try {
        var configMap = await createConfigMap(data);
        var jobName = await createJob(data, configMap, inputs);
        var podName = await waitForJobCompletion(jobName);
        const result = await getPodLogs(podName);
        if (output.split("=")[1].toString() === result.toString()) {
            STATUS = "PASSED";
        }
        //publish an event
        /**
         * {
         *      problemId,
         *      inputs,
         *      output
         *      result,
         *      status: PASSED/FAILD
         *      typedCode
         *
         * }
         */
        new JobCompletedStatusPublisher(natsWrapper.client).publish({
            problemId,
            inputs,
            output,
            result,
            status: STATUS,
            typedCode,
        });

        console.log("Data =>", data);
        console.log("Result <===> ", result);
    } catch (error) {
        console.log(" ===> ", error);
        process.exit();
    } finally {
        await deleteConfigMap(configMap);
        await deleteJob(jobName);
        await deletePod(podName);
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

/**
 *
 *
 *
 */
