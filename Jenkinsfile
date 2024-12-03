pipeline {
    agent any
    tools { 
        nodejs 'NodeJS'
    }
    environment {
        EC2_HOST = 'ec2-54-198-243-129.compute-1.amazonaws.com'  // Replace with your actual EC2 public IP or DNS
    }
    stages {
        stage('Install Dependancies') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }

        stage ('Test code') {
            steps {
                sh 'npm run test'
            }
        }

        stage ('Check for linting') {
            steps {
                sh 'npm run lint'
            }
        }

        stage ('Build Code') {
            steps {
                sh 'npm run build'
            }
        }

        stage ('Archive code') {
            steps {
                sh 'zip -r app.zip . -x ".git/*"'
                archiveArtifacts artifacts: 'app.zip', fingerprint: true
            }
            
        }

        stage ('Deploy to App') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY_PATH', usernameVariable: 'SSH_USERNAME')]) {
                    sh '''
                        # Get Archived code into ec2
                        scp -o StrictHostKeyChecking=no -i $SSH_KEY_PATH app.zip ec2-user@$EC2_HOST:/tmp/

                        ssh -i $SSH_KEY_PATH ec2-user@$EC2_HOST

                        # Install npm and pm2
                        sudo yum install -y nodejs
                        npm -v
                        sudo npm install pm2@latest -g --no-save
                        pm2 -v

                        # Deploy code to EC2 
                        cd ../../
                        unzip -o /tmp/app.zip -d /home/ec2-user/app

                        # Go to App
                        cd ~/home/ec2-user/app

                        # Install dependancies and save
                        npm install next@latest
                        npm install
                        pm2 start npm --name "next-app" -- run start

                        # ensures processes are restored after restart/reboot
                        pm2 save 
                    '''
                }
            }
        }
    }
}