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

Install yarn package manager
"https://yarnpkg.com/lang/en/docs/install/#windows-stable"

Clone repository using the below command line:
git clone "https://github.com/brajeshjaishwal/family-tree.git"

go to the directory
cd family-tree

Install dependencies, follow below steps
1) npm install or yarn install

Run server (nodejs)
1) in a terminal or command prompt run "yarn server" command

                            Or

Run server (dotnet)
0) cd Server.Net
1) dotnet restore
#2) dotnet ef migrations add InitialCreate (checkin have database attached)
#3) dotnet ef database update (checkin have database attached)
4) in a terminal or command prompt run "dotnet run" command

Run client
1) in a terminal or command prompt run "yarn start" command

Now head over to "http://localhost:3000"
1) register a user (or use brij/brij to login)
2) after register please login
3) now you should be able to create family tree, save it and reload it