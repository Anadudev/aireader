# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.14.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

COPY . .
# Run the dependency installation script.
RUN yarn install
# Run the build script.
RUN yarn run build

# RUN yarn prisma db push && yarn prisma generate

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD yarn prisma db push && yarn prisma generate && node dist/src/main
