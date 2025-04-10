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
                bat 'npm install -g heroku'
                withCredentials([usernameColonPassword(credentialsId: 'HerokuJenkins', variable: 'PASS')]) {
                    bat 'npm install -g heroku && heroku git:remote -a todolist-app && git push heroku main'
                }
            }
        }
    }
}