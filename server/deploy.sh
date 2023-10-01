sudo docker stop my-unsplash || true && sudo docker rm my-unsplash || true &&
sudo docker image build -t my-unsplash . &&
sudo docker container run --name my-unsplash -d -p 3000:8000 my-unsplash