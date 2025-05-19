import { Client, Account } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('682b77e7002d46678fe5')
    .setPlatform('com.movies.reactNative');
