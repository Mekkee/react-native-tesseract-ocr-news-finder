# react-native-tesseract-ocr-news-finder
## Want to read your physical news article in a digital format? Open the app, snap a photo of the article title, and make a search for it.

### 1. Gå igenom alla steg och installera React Native CLI
 https://facebook.github.io/react-native/docs/getting-started
### 2. Setup fysisk Android-enhet
https://facebook.github.io/react-native/docs/running-on-device
### 3. Installation av bibliotek och dependencies
(Linking behövs inte med React Native CLI version >= 0.60)
React native tesseract OCR
https://github.com/jonathanpalma/react-native-tesseract-ocr
Wrapper på Tess-two vilket använder sig av Leptonica för Image Processing
https://github.com/rmtheis/tess-two
https://github.com/DanBloomberg/leptonica
Tess-two kräver:
	Android 2.3 eller högre
	3.04 version av träningsdata
https://github.com/tesseract-ocr/tessdata/tree/3.04.00
Måste placeras inuti projektets Android mapp android/app/src/main/assets/tessdata.
Data filen/filerna måste även kopieras och adderas i en sub mapp namngiven ”tessdata” inuti Android-enheten som går att lokalisera inuti My Files > Internal Storage > Android > data.
I data mappen kommer det finnas ett flertal ”com.” mappar, leta upp com.ProjektsNamn. I detta fall com.testocr och överför en mapp namngiven ”tessdata” med träningsdatan.
React native image picker
Efter installationen måste vi bara ett litet steg till, öppna AndroidManifest.xml filen och addera två rader för kamera och lagrings tillstånd:
<uses-permission android:name="android.permission.CAMERA" /> 
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
AndroidManifest.xml hittar du i android/app/src/main/AndroidManifest.xml.
https://github.com/react-native-community/react-native-image-picker
Kan använda React native camera med för finare/bättre lösning
https://github.com/react-native-community/react-native-camera
React native inAppBrowser
https://github.com/proyecto26/react-native-inappbrowser
### 4. Kör app på mobil
Öppna 2 terminaler, koppla upp mobilen med USB, kör sen:
1. npm run start	(startar servern)
2. npx react-native run-android	(installera & launch app)

### Credit to https://github.com/jonathanpalma for the orignal lib, I'v only made some modifications for this use case!
