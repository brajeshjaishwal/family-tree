Web application to provision create and view a family tree.
a) server 1: node.js, mongodb, mongoose.
b) server 2: dotnetcore, entity framework, inmemory database (it needs some finishing touch)
b) client: semantic-ui, react, redux, axios.

to run the application

we must have these installed on your machine

Install nodejs by following below url:
"https://nodejs.org/en/download/"

install dotnetcore 2.1 by follow below url:
"https://www.microsoft.com/net/download/dotnet-core/2.1"

Clone repository using the below command line:
git clone "https://github.com/brajeshjaishwal/family-tree.git"

go to the directory

Install dependencies, follow below steps
1) yarn install
2) dotnet restore

Run server
1) in one terminal or command prompt run "yarn server" command

Run client
1) in other terminal or command prompt run "yarn client" command

Now head over to "http://localhost:3000"
1) it will ask to register
2) then login
3) now you are able to create family tree, save it and reload it
    
