# OLD VERSION || react-native-tesseract-ocr-news-finder
## Want to read your physical news article in a digital format? Open the app, snap a photo of the article title, and make a search for it.

### 1. Go through all the steps and install React Native CLI
 https://facebook.github.io/react-native/docs/getting-started
 
### 2. Setup your Android-unit
https://facebook.github.io/react-native/docs/running-on-device

### 3. Installation of libs and dependencies
(Linking is not needed with React Native CLI version >= 0.60)

#### React native tesseract OCR
https://github.com/jonathanpalma/react-native-tesseract-ocr

#### Wrapper of Tess-two which uses Leptonica for Image Processing
https://github.com/rmtheis/tess-two
https://github.com/DanBloomberg/leptonica

#### Tess-two needs:
	Android version 2.3+
	Trainingdata version 3.04+
https://github.com/tesseract-ocr/tessdata/tree/3.04.00
Place the trainingdata within the projects Android map:
	android/app/src/main/assets/tessdata.
Data file/files must also be copied and added to a subfolder named "tessdata" within the Android-unit that can be located in:
	My Files > Internal Storage > Android > data.
In the data map there will be multiple "com." folders, go to "com.<projectName>". In this case its "com.testocr", transfer the map given the name "tessdata" with the trainingdata.
	
#### React native image picker
After the installation you need to modify the AndroidManifest.xml file, open the file and add the following lines for camera and storage permissions:

`<uses-permission android:name="android.permission.CAMERA" />`

`<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>`

You'll find AndroidManifest.xml in android/app/src/main/AndroidManifest.xml.
https://github.com/react-native-community/react-native-image-picker

You can use React Native Camera also:
https://github.com/react-native-community/react-native-camera

#### React native inAppBrowser
https://github.com/proyecto26/react-native-inappbrowser

### 4. Run the App on Smartphone
Open two terminals, connect the phone with USB, then run:
1. npm run start	(starts the server)
2. npx react-native run-android		(installs and launch app)

### Credit to https://github.com/jonathanpalma for the orignal lib, I'v only made some modifications for this use case!
