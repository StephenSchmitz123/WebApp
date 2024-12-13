pipeline {
    agent any
    tools { 
        nodejs 'NodeJS'
    }
    environment {
        EC2_HOST = 'ec2-54-221-244-82.compute-1.amazonaws.com'  // Replace with your actual EC2 public IP or DNS
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
                sh 'zip -r app.zip .'
                archiveArtifacts artifacts: 'app.zip', fingerprint: true
            }
            
        }

        stage ('Deploy to App') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY_PATH', usernameVariable: 'SSH_USERNAME')]) {
                    sh '''
                        # Copy the zip file to the EC2 instance
                        scp -o StrictHostKeyChecking=no -i $SSH_KEY_PATH app.zip ec2-user@$EC2_HOST:/tmp/app.zip

                        # SSH into EC2 and execute the deployment commands
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY_PATH ec2-user@$EC2_HOST '
                            mkdir -p /home/ec2-user/app && 
                            unzip -o /tmp/app.zip -d /home/ec2-user/app &&
                            cd /home/ec2-user/app &&
                            npm install --legacy-peer-deps &&
                            npm install next@latest --save-dev &&
                            npm run build &&
                            pm2 start npm --name "next-app" -- run start &&
                            pm2 save
                        '
                    '''
                }
            }
        }

    }
}