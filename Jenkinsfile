pipeline {
    agent any
    stages {
        stage('Install Dependancies') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                'npm run build'
            }
        }

        stage('Test'){
            steps {
                sh 'npm run test'
            }
        }
        
        stage('Linting Checks') {
            steps {
                'npm run lint'
            }
        }
    }
}