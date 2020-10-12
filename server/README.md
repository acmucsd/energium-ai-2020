# Updating Container Registry

Build the image

```bash
docker build -t energium-ai-2020 .
```

Then tag and push the image to the google container registry

```bash
docker tag energium-ai-2020 gcr.io/energium-ai-2020/energium-ai-2020:latest
docker push gcr.io/energium-ai-2020/energium-ai-2020:latest
```
