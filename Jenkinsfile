pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build commands here
                // Example: bat 'mvn clean install' for a Maven build on Windows
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here
                // Example: bat 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Add deploy commands here
            }
        }
    }
}
