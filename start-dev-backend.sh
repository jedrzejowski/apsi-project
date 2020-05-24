#!/usr/bin/env bash

set -e
cd ../apsi-project-back/
git pull
gradle build
java -jar build/libs/smartthingsDashboardApp-0.0.1-SNAPSHOT.jar
