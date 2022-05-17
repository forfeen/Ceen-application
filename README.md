# Ceen : Mobile Application for Providing Information About COVID-19 Vaccine

Ceen, a mobile application that provides information. Not only broad vaccination information, but also knowledge gained via user sharing, questioning, and exchanging of real-life experiences. To create an application based on the COVID-19 pandemic. It has the ability to deliver vaccination information. Users can also ask questions, offer expertise, and discuss real-life immunization experiences with others.

## Prerequisite
- React 18.1.0 or newer
- React-Native 0.68.2 or newer
- Expo 45.0.4 or newer

## Getting Started
1. Clone the repository.
    ```
    $ git clone https://github.com/forfeen/Ceen-application.git
    ```

2. Change directory to the directory that contain _app.json_ directory.
    ```
    cd Ceen-application
    ```
3. Create .env for your local app environment settings to access the vaccination locations and firebase

    ```
        // googlemap
        iOSMapsApiKey = AIzaSyCZ8jEf2e-qrB0HEzjnQ8K32BtKykBMqIg
        AndroidMapsApiKey = AIzaSyCwYcXlWu1bP9NtmFSMScut43PWxahgTJ8

        // firebase
        API_KEY = AIzaSyDyki7qnYY_L2qwZvp2Pko3U5DvJX7_CVw
        AUTH_DOMAIN = ceen-2cf8b.firebaseapp.com
        PROJECT_ID = ceen-2cf8b
        STORAGE_BUCKET = ceen-2cf8b.appspot.com
        MESSAGING_SENDER_ID = 595555477576
        APP_ID = 1:595555477576:web:d8b3c1bb7d28e6d69a507d
        MEASUREMENT_ID = G-F41GTH3BZX

        // vaccination locations API
        X_CLIENT_ID = 0813562681
        X_CLIENT_SECRET  = a7CUZSx0fKcJePwtDQU3boVhwno7u6q15TeLM2XIE5y9FjAb4tNFJmNLcuG8WmHa
    ```

4. Install all required packages and then run.

    ```
    $ npm install
    $ yarn start // or expo start
    ```
    Note: If you want to run on your device simulator, try 


    On iOS device

    ```
    $ expo start --ios
    ```

     On Android device

    ```
    $ expo start --android
    ```

    Please make sure that your device simulator is running.