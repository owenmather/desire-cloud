pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs('nodeJenkins') {
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
