#!/bin/bash

#kubectl patch pvc auth-pvc -p '{"metadata":{"finalizers":null}}'
#kubectl patch pv auth-pv -p '{"metadata":{"finalizers":null}}'

#kubectl patch pvc author-pvc -p '{"metadata":{"finalizers":null}}'
#kubectl patch pv author-pv -p '{"metadata":{"finalizers":null}}'

#kubectl patch pvc comments-pvc -p '{"metadata":{"finalizers":null}}'
#kubectl patch pv comments-pv -p '{"metadata":{"finalizers":null}}'

#kubectl patch pvc likes-pvc -p '{"metadata":{"finalizers":null}}'
#kubectl patch pv likes-pv -p '{"metadata":{"finalizers":null}}'

#kubectl patch pvc main-pvc -p '{"metadata":{"finalizers":null}}'
#kubectl patch pv main-pv -p '{"metadata":{"finalizers":null}}'

#kubectl patch pvc payments-pvc -p '{"metadata":{"finalizers":null}}'
#kubectl patch pv payments-pv -p '{"metadata":{"finalizers":null}}'

if kubectl get pv payments-pv; then
    kubectl delete pv payments-pv --grace-period=0 --force
else
    echo "PersistentVolume payments-pv not found, skipping deletion."
fi


if kubectl get pv payments-pv; then
    kubectl delete pv payments-pv --grace-period=0 --force
else
    echo "PersistentVolume payments-pv not found, skipping deletion."
fi

# Force delete PVC and check if deletion is successful
kubectl delete pvc --all --grace-period=0 --force

# Wait for the PVC to be fully deleted
for i in {1..10}; do
  remaining_pvcs=$(kubectl get pvc --no-headers | wc -l)
  if [ "$remaining_pvcs" -eq "0" ]; then
    echo "All PVCs deleted successfully."
    break
  fi
  echo "Waiting for PVCs to be deleted..."
  sleep 5
done



# Clean up other resources
kubectl delete all --all --grace-period=0 --force
kubectl delete namespace <your-namespace> --grace-period=0 --force
kubectl create namespace <your-namespace>

# Run Skaffold
skaffold delete
skaffold dev

