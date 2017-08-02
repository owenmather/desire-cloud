pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs('nodeJenkins') {
                    sh 'npm install'
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
                    sh 'npm start'
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
