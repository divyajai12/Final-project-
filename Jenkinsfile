pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/divyajai12/Final-project-.git'
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
                bat 'docker-compose up -d'    // Start containers in detached mode
                bat 'docker-compose ps'       // List running containers
                // Optionally, add more deployment steps here
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            bat 'docker-compose down'       // Clean up after success if desired
        }
        failure {
            echo 'Pipeline failed!'
            bat 'docker-compose down'       // Clean up after failure to avoid dangling containers
        }
    }
}
