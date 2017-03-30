FROM python:3

COPY . /nemesis
WORKDIR /nemesis

RUN set -ex \
 && apt-get update -y \
 && pip install -e . \
 && rm -rf /root/.cache

RUN sed -i -- 's/host=localhost/host=mongodb/g' nemesis.cfg

ENTRYPOINT ["nemesis_api"]
CMD ["--conf", "nemesis.cfg"]
