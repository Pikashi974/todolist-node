pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                //
                bat 'npm install' 
            }
        }
        stage('Test') {
            steps {
                //
                bat 'npm test'
            }
        }
        stage('Deploy') { 
            steps {
                withEnv(['heroku=C:/Program Files/heroku/bin']) {
                    bat 'heroku whoami'
                    bat 'heroku git:remote -a todolist-app && git add . && git commit -am "Update from Jenkins" && git push heroku main'
                }
            }
        }
    }
}