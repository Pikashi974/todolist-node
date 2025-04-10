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
                withCredentials([usernameColonPassword(credentialsId: 'HerokuJenkins', variable: 'PASS')]) {
                    withEnv(['PATH=/use/local/bin/']) {
                        bat 'heroku git:remote -a todolist-app'
                        bat 'git push heroku main'
                    }
                }
            }
        }
    }
}