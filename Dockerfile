FROM ubuntu:latest

COPY . /nemesis
WORKDIR /nemesis

RUN set -ex \
 && apt-get update -y \
 && apt-get install -y python3-pip python3-dev build-essential \
 && pip3 install -r requirements.txt \
 && pip3 install . \
 && rm -rf /root/.cache

ENTRYPOINT ["nemesis_bot"]
CMD ["--conf", "nemesis.cfg"]
