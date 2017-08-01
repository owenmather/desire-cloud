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
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                   nodejs('nodeJenkins') {
                    bat 'npm start'
                }
            }
        }
        stage('Cleanup'){

         echo 'Cleaning....'
         nodejs('nodeJenkins') {
            bat 'npm prune'
         }
         bat 'rmdir node_modules -s -q'
       }
    }
}
