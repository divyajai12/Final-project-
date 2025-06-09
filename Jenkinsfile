pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Select environment to deploy')
    }

    environment {
        PATH = "C:\\Program Files\\Git\\bin;C:\\Program Files\\nodejs\\;${env.PATH}"
        APP_VERSION = ''
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
                echo "Deploying application to ${params.ENVIRONMENT} with Docker Compose, tagging image as ${env.APP_VERSION}..."
                bat "docker build -t admin-app:${env.APP_VERSION} ."

                // Use environment-specific docker-compose file
                def composeFile = "docker-compose-${params.ENVIRONMENT}.yml"
                bat "docker-compose -f ${composeFile} up -d"
                bat "docker-compose -f ${composeFile} ps"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            def composeFile = "docker-compose-${params.ENVIRONMENT}.yml"
            bat "docker-compose -f ${composeFile} down"
            emailext(
                subject: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The pipeline completed successfully.\n\nCheck details: ${env.BUILD_URL}",
                to: "divyajai207@gmail.com"
            )
        }

        failure {
            echo 'Pipeline failed!'
            def composeFile = "docker-compose-${params.ENVIRONMENT}.yml"
            bat "docker-compose -f ${composeFile} down"
            emailext(
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The pipeline failed.\n\nCheck details: ${env.BUILD_URL}",
                to: "divyajai207@gmail.com"
            )
        }
    }
}
