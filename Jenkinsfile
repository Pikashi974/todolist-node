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
                    bat 'heroku git:remote -a todolist-app'
                    bat 'git add .'
                    bat 'git commit -am "Update from Jenkins"'
                    bat 'git push heroku main'
                }
            }
        }
    }
}