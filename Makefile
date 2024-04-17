JSON_FLAGS="{\"version\": \"$(shell git describe --tags --always --dirty)\", \"build_time\": \"$(shell date +%Y-%m-%d:%H:%M:%S)\", \"commit\": \"$(shell git rev-parse HEAD)\"}"

DOCKER_IMAGE=registry1.ctdn.net/cubetiq/timesync-telegram

build-flags:
	@echo $(JSON_FLAGS) > dist/build.json

build:
	npm run build && make build-flags

docker-amd64:
	make build-flags && docker build --build-arg JSON_FLAGS=$(JSON_FLAGS) -t $(DOCKER_IMAGE):latest -f Dockerfile .
	docker push $(DOCKER_IMAGE):latest

docker-arm64:
	make build-flags && docker buildx build --build-arg JSON_FLAGS=$(JSON_FLAGS) --platform linux/arm64 -t $(DOCKER_IMAGE):arm -f Dockerfile.arm --push .