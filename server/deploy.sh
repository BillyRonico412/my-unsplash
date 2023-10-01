sudo docker stop my-unsplash &&
sudo docker rm my-unsplash &&
sudo docker image build -t my-unsplash . &&
sudo docker container run --name my-unsplash -d -p 3000:8000 my-unsplash