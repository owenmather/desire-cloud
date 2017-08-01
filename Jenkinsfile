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
        stage('Run') {
            steps {
                echo 'Running....'
                nodejs('nodeJenkins') {
                    bat 'npm start'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
