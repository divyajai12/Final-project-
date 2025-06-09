pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs\\;${env.PATH}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/divyajai12/Final-project-.git'
            }
        }

        stage('Check npm') {
            steps {
                bat 'npm --version'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application with Docker Compose...'
                bat 'docker-compose up -d'
                bat 'docker-compose ps'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            bat 'docker-compose down'
        }
        failure {
            echo 'Pipeline failed!'
            bat 'docker-compose down'
        }
    }
}
