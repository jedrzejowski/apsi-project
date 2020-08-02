#!/usr/bin/env bash

url=ec2-3-83-215-2.compute-1.amazonaws.com

ssh -i "./virutal_machine_key_first.pem" "ubuntu@$url" \
    -R 6000:localhost:6000
