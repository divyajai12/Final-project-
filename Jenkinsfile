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
            emailext(
                subject: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The pipeline completed successfully.\n\nCheck details: ${env.BUILD_URL}",
                to: "divyajai207@gmail.com"  // <-- Replace this with your actual email if needed
            )
        }

        failure {
            echo 'Pipeline failed!'
            bat 'docker-compose down'
            emailext(
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The pipeline failed.\n\nCheck details: ${env.BUILD_URL}",
                to: "divyajai207@gmail.com"
            )
        }
    }
}
