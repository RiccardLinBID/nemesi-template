FROM node:22.19-bullseye

RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@latest eslint prettier

WORKDIR /workspace

COPY . .

CMD ["bash"]
