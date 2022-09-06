=======
![Doubtfire Logo](http://puu.sh/lyClF/fde5bfbbe7.png)
# Dream Big

Dream big aims to provide students with an overview of their progress from enrolment to graduation. The idea is to create a work-ready student who can assimilate into the workplace.

[Windows Installation instructions](#windows-11-installation-instructions)

[Mac Installation instructions](#mac-installation-instruction)

## **Windows 11 Installation instructions**

1. Install the chocolatey package manager, this is an optional step but is very useful for installing various software packages such as Python and NodeJs(Which we will be Chocolatey to install) on Windows systems. To install Chocolatey, [click here](https://chocolatey.org/install) and follow the instructions. Once you have Chocolatey installed, open up an elevated terminal prompt and type in the following: `choco install nodejs --version=16.16.0` in PowerShell with administrator mode and then hit enter to proceed with NodeJs installation. Be sure to have NodeJs uninstalled beforehand.

2. We need to have the latest stable version of NodeJs installed as Angular is dependent on it to run. If you wish to install NodeJs separately, click [here](https://nodejs.org/en/) and follow the [instruction](#nodejs-installation-instruction) provided below. 


3. Once NodeJs has been installed, create a folder for where you want the DreamBig project to be stored.

4. If you have chocolatey installed, run the command: `choco install git.install` in PowerShell with administrator mode to get the newest version of git. Run `git --version` to verify the installation. If you wish to download git separately, install git from [here](https://git-scm.com/download/win). Extra [instruction](#git-installation-instruction) provided below.

5. Open a terminal window at that location then type in and run `git clone https://github.com/maddernd/dream-big`

6. The DreamBig project should now be copied into the folder you created earlier, open this folder in Visual Code or another code editor of your choice.

7. Navigate a terminal to where the dream-big directory is, then type in and run `npm install -g @angular/cli@latest`, this will install Angular globally onto your system.

8. Navigate your terminal to dream-big\dream-big-ui and then enter `npx ng serve`, this should start a local development server on your machine which you can use to see how the project is coming along, a few messages will appear and then one like this should show near the bottom: `Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/`

9. Open your browser to the address referenced by your terminal, this will allow you to see what the project looks like in its current state, if you make changes to the project and then save it, the browser should update the contents of the page depending on the changes you have made.

10. Either use chocolatey to install Docker `choco install docker-desktop` or navigate to the [Docker website](https://www.docker.com/get-started/), download [instructions](#docker-installation-instruction)  provided below.

11. Docker requires a Linux system to run, follow the [instruction](#wsl-installation-instruction) provided below to download WSL. If you have WSL installed previously, Docker may ask you to upgrade it with a pop-up window. Just follow the steps it is showing.

12. Open a terminal window and navigate to the root folder of the DreamBig project, enter and run the following line `docker compose up`, this will create a docker container that simulates the backend of the project, you can now also start this container by going directly to the Docker GUI program and run the dream-big container in the **Containers/Applications** tab on the left.

## **Extra Installation Instruction for Windows**

If you wish to download Node.js, WSL, Docker or Git separately, please follow the instruction below. 

## Git Installation Instruction

You need Git installed locally for almost all the GitHub commands. If you have chocolatey installed, run the command: `choco install git.install` in PowerShell with administrator mode to get the newest version of git. If you wish to download it separately, follow the instruction below:

1. Navigate to [Git’s official website](https://git-scm.com/download/win).

2. Scroll down to your device’s system and follow the instructions. For Linux and macOS, you can choose to either run a command or download an installer. For windows, click the hyperlink for the downloaded installer.

3. Select the suitable installer, download and run it locally. 

4. Restart your command prompt and run git -v to verify the download.

## Node.js Installation Instruction

If your device cannot run the `choco install node.js --version=16.16.0` command to download the node.js with chocolatey, you might want to download it separately. Click [here](https://nodejs.org/dist/v16.16.0/) and select a suitable one for your device to download it. If the link doesn’t work above, follow the instruction below:

1. Go to [Nodejs’s official website](https://nodejs.org/en/).

2. Click “Other Downloads” to see more options.

3. Scroll your page down and click “All download options”.

4. There should be a list of download options. Click the “../” option on the top to view all the versions. We need the **16.16.0** version, click it.

5. You will see a list of different download options. Download the suitable one for your device and run it locally to install Nodejs.

6. Restart your command prompt and run `node -v`  to verify the version. You should have the following line `v16.16.0` for a successful download.

## Docker Installation Instruction

If you can’t install Docker with chocolatey, you might have to download Docker separately, here’s an instruction for you.

1. As mentioned in the above steps, go to [Docker’s official website](https://www.docker.com/get-started/) and select the suitable one for your device.

2. Run the download file locally to install. This may take a while. 

3. Run the Docker application to verify the download.

## WSL Installation Instruction

Docker application requires a Linux system to run, therefore, WSL (Windows Subsystem for Linux) is needed to enable Docker’s functionality on a Windows machine. You can simply follow the prompt Docker provides to you or follow the instruction here.

1. Open PowerShell, and use the command `wsl --list --online` to view all the available versions of the Linux system. Select your preferred one and download it with `wsl --install -d <name of the machine>`. For example, if you wish to install Ubuntu, just type `wsl --install -d Ubuntu`. This may take a while.

2. If it is your first-time downloading WSL, you might have to enable some features. You can navigate to  “*Control Panel*” => “*Programs*” => “*Programs and Features*” => “*Turn Windows features on or off*”, and find “*Virtual Machine Platform*” and "*Windows Subsystem for Linux*”. Turn both of them on and restart your machine.

3. Follow the [link](https://aka.ms/wsl2kernel) to download an update package. Find the suitable one for your machine and run the downloaded file locally to install the update. 

4. Run the application for your just downloaded Linux machine, and follow the prompts  to create a new user. Now you can run your Docker application to verify, if there’s no error message showing then you should have your WSL installed successfully.

*Note: The WSL feature (‘Virtual Machine Platform’ and ‘Windows Subsystem for Linux’) clashes with some virtual machine programs. If you wish to turn the features on and off, please navigate to “Control Panel” => “Programs” => “Programs and Features” => “Turn Windows features on or off”, find “Virtual Machine Platform” and Windows Subsystem for Linux”.*

You might have to re-install WSL service updates after turning the features back on. Please follow step 3 above or the prompt Docker’s providing to you for download.

## **Mac Installation Instruction**

1. Download and install node.js on the following link: https://nodejs.org/en/download/

2. After installing node.js, type in `node –version` in your terminal to check your node.js version and make sure it is installed properly.

3. Open the terminal and type in `sudo npm install -g @angular/cli` to install angular.

4. Wait a few seconds and type in `ng version` to check the angular version and make  sure it is installed properly.

5. Clone the directory from GitHub using the GitHub desktop app.

6. Navigate to your terminal until you reach dream-big-ui.

7. Type in `ng serve` in your terminal after and you will see some messages show up one of which is `Angular Live Development Server is listening on localhost:4200`, open your browser on http://localhost:4200/ **

8. Go to your preferred browser and type in http://localhost:4200/

9. You can now see how the project looks in its current state.

10. You can open the code using visual studio code by typing in code. after navigating to dream-big-ui

11. Install the docker app for mac depending on which mac you are using ( intel mac or mac with apple chip) on this link: https://docs.docker.com/desktop/install/mac-install/

12. Open a terminal window and navigate to the DreamBig project, enter and run the following line `docker compose up`.

13. You can now go to the Docker app and run the dream big container.