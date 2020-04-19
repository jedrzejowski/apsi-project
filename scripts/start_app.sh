#!/bin/bash

old_dir=$(pwd)
cd /var/dashboard_frontend/
npm run dev-server
cd old_dir
