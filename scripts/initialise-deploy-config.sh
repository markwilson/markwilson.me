#!/usr/bin/env bash

cp capistrano/deploy.rb.dist capistrano/deploy.rb && \
sed -i "s|DEPLOY_HOST|$DEPLOY_HOST|g;s|DEPLOY_PATH|$DEPLOY_PATH|g" ./capistrano/deploy.rb