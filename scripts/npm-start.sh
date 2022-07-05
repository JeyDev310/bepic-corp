#!/bin/bash
cd /var/www/html/corp
yarn build
pm2 restart corp
