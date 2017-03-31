FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

RUN set -ex \
    && apt-get update \
    && apt-get install --qyy \
       -o APT::Install-Recommends=false -o APT::Install-Suggests=false \
       curl nodejs build-essential && \
    curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /root/.cache && \
    npm install && \
    npm run build && \
    cp -r ./build/* ./

WORKDIR /usr/share/nginx/html
