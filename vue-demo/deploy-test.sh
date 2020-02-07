#!/bin/bash
git checkout develop
npm run build:test
scp -i ~/.ssh/zxr -r ./dist/. root@104.168.204.89:/data/www/deploy-auto

