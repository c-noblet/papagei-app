#!/bin/bash
read -e -p "Enter the release version : " VERSION
yarn run build:android && \
cp ./platforms/android/app/build/outputs/apk/debug/app-debug.apk ./bin/papagei.apk && \
git checkout develop && \
git flow release start $VERSION && \
git flow release finish $VERSION
git push origin --all
