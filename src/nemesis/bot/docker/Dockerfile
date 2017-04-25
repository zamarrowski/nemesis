FROM python:3

COPY . /nemesis
WORKDIR /nemesis

RUN set -ex \
 && apt-get install --qyy \
    -o APT::Install-Recommends=false -o APT::Install-Suggests=false \
 && pip install -e . \
 && rm -rf /var/lib/apt/lists/*  \
 && rm -rf /root/.cache

RUN sed -i -- 's/host=localhost/host=mongodb/g' nemesis.cfg

CMD ["nemesis_bot", "--conf", "nemesis.cfg"]
