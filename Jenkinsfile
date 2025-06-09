pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs\\;${env.PATH}"
        APP_VERSION = ''  // will be set dynamically
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/divyajai12/Final-project-.git'
            }
        }

        stage('Set Version') {
            steps {
                script {
                    // Get short git commit hash on Windows using bat + PowerShell
                    def gitCommit = bat(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    def buildNum = env.BUILD_NUMBER
                    env.APP_VERSION = "1.0.${buildNum}-${gitCommit}"
                    echo "App version: ${env.APP_VERSION}"
                }
            }
        }

        stage('Check npm') {
            steps {
                bat 'npm --version'
            }
        }

        stage('Build') {
            steps {
                echo "Building the project with version ${env.APP_VERSION}..."
                bat 'npm install'

                // You can pass version as an environment variable if your build script supports it
                // Or update a file here if needed before build
                bat "set APP_VERSION=${env.APP_VERSION} && npm run build"
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
                echo "Deploying application with Docker Compose, tagging image as ${env.APP_VERSION}..."
                // Build Docker image with version tag
                bat "docker build -t admin-app:${env.APP_VERSION} ."

                // Run docker-compose with tagged image (adjust your docker-compose.yml accordingly!)
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
                to: "divyajai207@gmail.com"
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
