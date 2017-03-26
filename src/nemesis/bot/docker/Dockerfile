FROM python:3

COPY . /nemesis
WORKDIR /nemesis

RUN set -ex \
 && apt-get update -y \
 && pip3 install . \
 && rm -rf /root/.cache

CMD ["nemesis_bot", "--conf", "nemesis.cfg"]
