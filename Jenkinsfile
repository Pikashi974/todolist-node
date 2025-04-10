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
                    bat 'heroku git:remote -a todolist-app'
                    bat 'git remote -v'
                    bat 'git push heroku HEAD:refs/heads/main'
                }
            }
        }
    }
}