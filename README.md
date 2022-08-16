=======
![Doubtfire Logo](http://puu.sh/lyClF/fde5bfbbe7.png)
# Dream Big

Dream big aims to provide students with an overview of their progress from enrolment to graduation. The idea is to create a work ready student who can asimilate into the workplace.

## Windows 11 Installation instructions

0. Install the chocolatey package manager, this is an optional step but is very useful for installing various software packages such as Python, NodeJs(Which we will be Chocolatey to install) on Windows systems. To install Chocolatey, [click here](https://chocolatey.org/install) and follow the instructions. Once you have Chocolatey installed, open up an elevated terminal prompt and type in the following: `choco install nodejs --version=16.16.0` and then hit enter to proceed with NodeJs installation. Be sure to have NodeJs uninstalled beforehand.

1. We need to have the latest stable version of NodeJs installed as Angular is dependent on it to run. If you have skipped installing Chocolatey and do not have NodeJs version 16.16.0 already installed, click [here](https://nodejs.org/en/) and make sure to download the installer for 16.16.0, run the installer and follow it's instructions to proceed.

2. Once NodeJs has been installed, create a folder for where you want the DreamBig project to be stored.

3. Open a terminal window at that location then type in and run `git clone https://github.com/maddernd/dream-big`

4. The DreamBig project should now be copied into the folder you created earlier, open this folder in Visual Code or another code editor of your choice.

5. Navigate a terminal to where the dream-big directory is, then type in and run `npm install -g @angular/cli@latest`, this will install Angular globally onto your system.

6. Navigate your terminal to dream-big\dream-big-ui and then enter `npx ng serve`, this should start a local development server on your machine which you can use to see how the project is coming along, a few messages will appear and then one like this should show near the bottom: `Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/`

7. Open your browser to the address referenced by your terminal, this will allow you to see what the project looks like at its current state, if you make changes to the project and then save, the browser should update the contents of the page depending on the changes you have made.

8. Either use chocolatey to install Docker `choco install docker-desktop` or navigate to the [Docker website](https://www.docker.com/get-started/), download the Windows version, run the installer and follow the instructions.

9. Open a terminal window and navigate to the root folder of the DreamBig project, enter and run the following line `docker compose up`, this will create a docker container that simulates the backend of the project, you can now also start this container by going directly to the Docker GUI program and run the dream-big container in the **Containers/Applications** tab on the left.

## Mac Installation Instruction

1. Download and install node.js on the following link: https://nodejs.org/en/download/

2. After installing node.js, type in node –version in your terminal to check your node.js version and making sure it is installed properly.

3. Open terminal and type in sudo npm install -g @angular/cli to install angular.

4. Wait a few seconds and type in ng version to check angular version and making sure it is installed properly.

5. Clone the directory from GitHub using the GitHub desktop app.

6. Navigate in your terminal until you reach dream-big-ui.

7. Type in ng serve in your terminal after and you will see some messages show up one of which is Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **

8. Go to your prefer browser and type in http://localhost:4200/

9. You can now see how the project looks in its current state.

10. You can open the code using visual studio code by typing in code . after navigating to dream-big-ui

11. Install docker app for mac depending which mac you are using ( intel mac or mac with apple chip) on this link: https://docs.docker.com/desktop/install/mac-install/

12. Open a terminal window and navigate to the DreamBig project, enter and run the following line docker compose up.

13. You can now go to Docker app and run the dream big container.