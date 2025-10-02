FROM node:22.19-bullseye

RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@latest eslint prettier
# RUN npm install -g yarn
RUN npm install -g pnpm

RUN curl -fsSL https://bun.sh/install | bash \
    && mv /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /workspace

COPY . .

CMD ["bash"]
