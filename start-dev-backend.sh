#!/usr/bin/env bash
set -e

export JAVA_HOME=/usr/lib/jvm/java-11-openjdk/

cd ../apsi-project-back/
git pull
gradle -Dskip.tests build

$JAVA_HOME/bin/java -jar build/libs/smartthingsDashboardApp-0.0.1-SNAPSHOT.jar
