pipeline {
    agent any
    environment {
        CI = 'true'
        HEROKU_API_KEY = credentials('HerokuJenkins')
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
                    bat 'cat ~/.netrc'
                    bat 'heroku git:remote -a todolist-app'
                    bat 'git push heroku main'
                }
            }
        }
    }
}