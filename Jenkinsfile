pipeline {
    agent any
    tools { 
        nodejs 'NodeJS'
    }
    environment {
        EC2_HOST = 'ec2-54-173-231-27.compute-1.amazonaws.com'  // Replace with your actual EC2 public IP or DNS
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
                sh 'zip -r app.zip . -x "node_modules/*"'
                archiveArtifacts artifacts: 'app.zip', fingerprint: true
            }
            
        }

        stage ('Deploy to App') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY_PATH', usernameVariable: 'SSH_USERNAME')]) {
                    sh '''
                        # Get Archived code into ec2
                        scp -o StrictHostKeyChecking=no -i $SSH_KEY_PATH app.zip ec2-user@ec2-54-173-231-27.compute-1.amazonaws.com:/tmp/

                        ssh -i $SSH_KEY_PATH ec2-user@$EC2_HOST

                        # Deploy code to EC2
                        unzip -o /tmp/app.zip -d /home/ec2-user/app

                        # Go to App
                        cd /home/ec2-user/app

                        # Install dependancies and save
                        npm install   
                        pm2 start npm --name "next-app" -- run start
                        pm2 save
                    '''
                }
            }
        }
    }
}