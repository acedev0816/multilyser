# All-in-one summarize tool
https://multilyser.com

## Running the app

1. Build the server

   ~~~
   pip3 install -r requirements.txt
   ~~~

2. Run the server

   ~~~
   python server.py
   ~~~
3. Create wsgi server.
      
   -Edit wgsi.py
    
   -Test server in vps
   ~~~
     gunicorn --bind 0.0.0.0:5000 wsgi:app
   ~~~

4. Build the client app

   ~~~
   npm install
   ~~~

5. Run the client app

   ~~~
   npm start
   ~~~

6. Nginx install in vps.
   
   Reference this:https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04.
   
7. Configure nginx file communicating between frontend and backend in our vps.

   ~~~
   sudo nano /etc/nginx/sites-available/multilyser
   ~~~
   
   ~~~
     server{
     listen 80;
     server_name app.multilyser.com;
     return 301 https://$server_name$request_uri;
     }
     
     server{
     listen 443 ssl default_server;
     ssl on;
     sst_certificate /root/multilyser/multilyser.crt;
     sst_certificate_key /root/multilyser/mutlilyser.key;
     server_name app.multilyser.com;
     location  /  {
     include proxy_params;
     proxy_pass http://127.0.0.1:5000;
     }
     }
   ~~~

8.Create systemctl service to autostart web server.

   -Enter this command
   
   ~~~
   sudo nano /etc/systemd/system/multilyser_backend.service
   ~~~
   
   -Edit ini file.
   
   ~~~
   [Unit]
      Description=Mutlilyser backend service
   [Service]
      ExecStart=/root/multilyser/venv/bin/gunicorn --bind 0.0.0.0:5000 wsgi:app
      WorkingDirectory=/root/multilyser
      Environment="PATH=/root/multilyser/venv/bin"
      Restart=always
   [Install]
      WantedBy=multi-user.target
   ~~~
   
   -Reload Systemd:
   ~~~
   sudo systemctl daemon-reload
   ~~~
   
   -Enable and Start the Service
   
   ~~~
   sudo systemctl enable multilyser_backend.service
   sudo systemctl start multilyser_backend.service
   ~~~

9. Create systemctl service to autostart redis worker.

   -Enter this command
   
   ~~~
   sudo nano /etc/systemd/system/redis_worker.service
   ~~~
   
   -Edit ini file.
   
   ~~~
   [Unit]
   Description=Redis Job Queue Worker
   After=network.target
   
   [Service]
   ExecStart=/root/multilyser/venv/bin/python /root/multilyser/worker.py
   WorkingDirectory=/root/multilyser
   Restart=always
   User=root
   
   [Install]
   WantedBy=multi-user.target
   ~~~
   
   -Reload Systemd:
   
   ~~~
   sudo systemctl daemon-reload
   ~~~
   
   -Enable and Start the Service
   
   ~~~
   sudo systemctl enable redis_worker.service
   sudo systemctl start redis_worker.service
   ~~~
10.Reference this.

   https://rameshponnusamy.medium.com/setup-flask-nginx-ssl-89bbc854a40a
