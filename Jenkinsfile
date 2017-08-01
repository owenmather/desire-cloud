pipeline {
    agent any
    tools {
        nodejs 'nodeJenkins'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                npm install
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
