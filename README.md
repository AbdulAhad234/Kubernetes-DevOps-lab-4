# Kubernetes Lab Application

Simple Node.js app for Kubernetes deployment practice.

## Local Run
```
docker build -t kube-lab-app:v1 .
docker run -p 8080:8080 kube-lab-app:v1
```

Visit: http://localhost:8080
```

4. **Save**

### **Step 8: Verify Your Files**

In VS Code left sidebar, you should see:
```
kubernetes-lab/
├── app.js
├── package.json
├── Dockerfile
├── .gitignore
└── README.md