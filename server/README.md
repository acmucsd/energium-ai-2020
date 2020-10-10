# Updating Container Registry

Build the image

```bash
docker build -t kingofthehill-ai-2020 .
```

Then tag and push the image to the google container registry

```bash
docker tag kingofthehill-ai-2020 gcr.io/kingofthehill-ai-2020/kingofthehill-ai-2020:latest
docker push gcr.io/kingofthehill-ai-2020/kingofthehill-ai-2020:latest
```
