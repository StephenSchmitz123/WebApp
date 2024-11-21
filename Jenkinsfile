pipeline {
    agent any
    tools {
        nodejs 'NodeJS 23.3.0'  // Use the version configured in Global Tool Configuration
    }
    stages {
        stage('Install Dependancies') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test'){
            steps {
                sh 'npm run test'
            }
        }
        
        stage('Linting Checks') {
            steps {
                sh 'npm run lint'
            }
        }
    }
}