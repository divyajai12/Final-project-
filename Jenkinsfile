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
                bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker-compose.exe" up -d'
                bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker-compose.exe" ps'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker-compose.exe" down'
        }
        failure {
            echo 'Pipeline failed!'
            bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker-compose.exe" down'
        }
    }
}
