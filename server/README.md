# Updating Container Registry

Build the image

```bash
docker build -t energium-ai-2020 .
```

Then tag and push the image to the google container registry

```bash
docker tag energium-ai-2020 gcr.io/acm-ai-proto-code/energium-ai-2020:latest
docker push gcr.io/acm-ai-proto-code/energium-ai-2020:latest
```

Test locally through API:

```bash
docker run -d --rm -p 9000:9000 -p 80:80 -v /var/run/docker.sock:/var/run/docker.sock energium-ai-2020
```
