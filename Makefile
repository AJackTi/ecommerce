# Targets and Commands
run:
	node --watch ./server.js

install:
	npm install

docker-up:
	docker-compose -f docker-compose.yml up -d

docker-down:
	docker-compose down

.PHONY: run install docker-up docker-down
