for i in {1..10}; do
  remaining_pvcs=$(kubectl get pvc --no-headers 2>/dev/null | wc -l)
  if [ "$remaining_pvcs" -eq "0" ]; then
    echo "All PVCs deleted successfully."
    break
  fi
  echo "Waiting for PVCs to be deleted... ($i/10)"
  sleep 5
done

# Cleanup other resources
echo "Deleting all other resources..."
kubectl delete all --all --grace-period=0 --force


# Run Skaffold
echo "Running Skaffold..."
skaffold delete
kubectl delete pods --all
