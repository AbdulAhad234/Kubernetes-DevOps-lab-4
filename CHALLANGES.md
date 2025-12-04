# Kubernetes Playground Challenges - Completion Report

**Completed by:** [Your Name]  
**Date:** [Today's Date]

## Challenge 1: Scale Your Application ✅
**Task:** Scale deployment from 2 → 5 → 2 pods

**Commands Used:**
```bash
kubectl scale deployment kube-lab-deployment --replicas=5
kubectl scale deployment kube-lab-deployment --replicas=2
```

**Learning:** Kubernetes maintains desired state automatically. Scaling is instant and seamless with no downtime.

---

## Challenge 2: Rolling Updates & Rollbacks ✅
**Task:** Update app to v2, observe rolling update, rollback to v1

**Commands Used:**
```bash
docker build -t kube-lab-app:v2 .
kubectl set image deployment/kube-lab-deployment kube-lab-container=kube-lab-app:v2
kubectl rollout status deployment/kube-lab-deployment
kubectl rollout undo deployment/kube-lab-deployment
kubectl rollout history deployment/kube-lab-deployment
```

**Learning:** Rolling updates happen gradually with zero downtime. Kubernetes tracks full revision history and rollback is instant.

---

## Challenge 3: Use LoadBalancer Service ✅
**Task:** Convert NodePort to LoadBalancer

**Commands Used:**
```bash
kubectl edit svc kube-lab-service
# Changed type: NodePort → LoadBalancer
kubectl get svc
```

**Learning:** LoadBalancer provides external IP access. In cloud environments, this creates actual cloud load balancers.

---

## Challenge 4: Limit Resources on Pods ✅
**Task:** Add CPU and memory limits

**Configuration Added:**
```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "200m"
    memory: "256Mi"
```

**Commands Used:**
```bash
kubectl apply -f k8s/deployment.yaml
kubectl describe pod <pod-name>
kubectl top pods
```

**Learning:** Resource requests guarantee minimum resources; limits prevent overconsumption. Helps Kubernetes make smart scheduling decisions.

---

## Challenge 5: ConfigMap for Environment Variables ✅
**Task:** Inject configuration via ConfigMap

**Commands Used:**
```bash
kubectl create configmap app-config --from-literal=APP_ENV=dev --from-literal=APP_VERSION=1.0.0
kubectl get configmap
kubectl describe configmap app-config
kubectl exec -it <pod-name> -- printenv | grep APP
```

**Learning:** ConfigMaps separate configuration from code. Enables same image across environments with different configs.

---

## Challenge 6: Liveness & Readiness Probes ✅
**Task:** Add health checks

**Configuration Added:**
```yaml
livenessProbe:
  httpGet:
    path: /
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 5
```

**Commands Used:**
```bash
kubectl apply -f k8s/deployment.yaml
kubectl describe pod <pod-name>
```

**Learning:** Liveness probes restart unhealthy containers. Readiness probes prevent traffic to unready pods. Automatic self-healing.

---

## Challenge 7: Self-Healing Demo ✅
**Task:** Delete pod and watch Kubernetes recreate it

**Commands Used:**
```bash
kubectl get pods
kubectl delete pod <pod-name>
kubectl get pods -w
```

**Learning:** Kubernetes deployment controller constantly reconciles actual vs desired state. Deleting pods triggers automatic recreation.

---

## Challenge 8: Pause and Resume Deployment ✅
**Task:** Batch multiple changes before rolling out

**Commands Used:**
```bash
kubectl rollout pause deployment/kube-lab-deployment
kubectl apply -f k8s/deployment.yaml  # Made 3 changes
kubectl rollout resume deployment/kube-lab-deployment
kubectl get pods -w
```

**Learning:** Pausing allows batching multiple config changes into single rollout. Reduces update churn and maintains stability.

---

## Challenge 9: Inspect Cluster Resources ✅
**Task:** Examine node capacity and resource usage

**Commands Used:**
```bash
kubectl get nodes
kubectl describe node docker-desktop
kubectl top node
kubectl top pods
kubectl get all
kubectl api-resources
kubectl cluster-info
```

**Learning:** Understanding cluster capacity crucial for capacity planning. Resource inspection essential for troubleshooting.

---

## Challenge 10: Delete and Recreate ✅
**Task:** Full lifecycle management

**Commands Used:**
```bash
kubectl get all  # Before
kubectl delete -f k8s/
kubectl get pods  # Verify deletion
kubectl apply -f k8s/
kubectl get all  # After
```

**Learning:** Declarative configuration makes infrastructure reproducible. Single command can tear down or rebuild entire application.

---

## Summary

**Total Challenges Completed:** 10/10 ✅

**Key Takeaways:**
- Kubernetes provides self-healing and auto-scaling capabilities
- Declarative configuration enables Infrastructure as Code
- Rolling updates ensure zero-downtime deployments
- Health probes and resource limits ensure reliability
- ConfigMaps enable environment-agnostic deployments

**Skills Demonstrated:**
- Scaling deployments dynamically
- Managing rolling updates and rollbacks
- Configuring services (NodePort, LoadBalancer)
- Implementing resource management
- Externalizing configuration with ConfigMaps
- Adding health checks and probes
- Understanding Kubernetes self-healing
- Pausing and resuming deployments
- Cluster resource inspection
- Full application lifecycle management