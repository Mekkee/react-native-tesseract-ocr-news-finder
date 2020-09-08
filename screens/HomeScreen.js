import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  View,
  TouchableNativeFeedback,
  PixelRatio,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {gibberish} from '../api/gibberish';

const {width} = Dimensions.get('window');

const imagePickerOptions = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

const tessOptions = {
  whitelist: null,
  blacklist: null,
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      extractedText: null,
      hasErrored: false,
      imageSource: null,
      isLoading: false,
      articleId: null,
    };

    this.selectImage = this.selectImage.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  //  Image Picker for selecting Image or taking picture
  selectImage() {
    this.setState({isLoading: true});
    ImagePicker.showImagePicker(imagePickerOptions, res => {
      // if canceled stop loading
      if (res.didCancel) {
        this.setState({isLoading: false});
      } else if (res.error) {
        this.setState({
          isLoading: false,
          hasErrored: true,
          errorMessage: res.error,
        });
      } else {
        const source = {uri: res.uri};
        this.setState({
          imageSource: source,
          hasErrored: false,
          errorMessage: null,
        });
        this.extractedTextFromImage(res.path);
      }
    });
  }

  // Tesseract OCR analysing the image from phone, then creating the query string from the OCR result to run against monoks API
  extractedTextFromImage(imagePath) {
    RNTesseractOcr.recognize(imagePath, 'LANG_ENGLISH', tessOptions)
      .then(result => {
        //console.log('result', result);
        //first match the text after the minimum 2 word-character regex, then filter away all words that include one of the gibberish bigrams
        let queryToMonok = result
          .match(/\w{2,}/gi)
          .filter(word => !gibberish.find(bad => word.includes(bad)))
          .join(' ');
        this.setState({isLoading: false, extractedText: queryToMonok});
        this.getArticle(queryToMonok);
      })
      .catch(err => {
        this.setState({hasErrored: true, errorMessage: err.message});
      });
  }

  // running query string against monoks api and selecting the first newsarticle ID that fits the search result the best
  getArticle = searchQuery => {
    let monokApi = `https://www.monok.com/api/v1/search/?q=${searchQuery}&sort=relevant`;

    fetch(monokApi, {
      headers: {
        'Content-type': 'application/json',
        'x-api-token':
          '5dcc40f6be636ad41b148345e9485e61c3d4e4892bf3d727239a3928f5573e24',
      },
    })
      .then(res => res.json())
      .then(resJson => {
        //console.log('data', typeof resJson.feed[0].id); // string
        let articleId = resJson.feed[0].id.substring(3);
        //console.log('id sub', articleId); // en/ removed
        this.setState({articleId: articleId});
      })
      .catch(err => console.log('error', err));
  };

  sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  // open in app browser with search result from getArticle()
  async openLink() {
    const {articleId, extractedText} = this.state;

    try {
      //const url = `https://www.monok.com/search?hl=en&q=${extractedText}&sort=relevant`; //getting full list of most relevant articles atm.
      const url =
        articleId === null
          ? `https://www.monok.com/en`
          : `https://www.monok.com/puff/${articleId}`;
      //console.log('articleUrl', url);
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // Android Properties
          showTitle: true,
          toolbarColor: 'white',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
        });
        // A delay to show an alert when the browser is closed
        /* await this.sleep(800);
        Alert.alert(JSON.stringify(result)); */
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  render() {
    const {
      errorMessage,
      extractedText,
      hasErrored,
      imageSource,
      isLoading,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textLarge}>
            Recognize text by either using camera or already existing image
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.textExtractionContainer}>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={'#9B9B9B'} />
            ) : hasErrored ? (
              <Text style={styles.textSmall}>{errorMessage}</Text>
            ) : (
              <Text style={styles.textSmall}>{extractedText}</Text>
            )}
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Image
            source={require('../../android/app/src/main/assets/monoklogo.png')}
            style={styles.logo}
          />
          <View style={styles.buttonContainer}>
            <TouchableNativeFeedback onPress={this.selectImage}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Detect Text</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.openLink}>
              <View style={styles.button}>
                <Text style={styles.textButton}>News Search</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
  },
  headerContainer: {
    backgroundColor: '#ececec',
    paddingVertical: 4,
    borderColor: '#AFAFAF',
    borderWidth: 1 / PixelRatio.get(),
  },
  mainContainer: {
    elevation: 2,
  },
  textExtractionContainer: {},
  textLarge: {
    fontSize: 34,
    textAlign: 'center',
    margin: 10,
    color: '#808080',
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#808080',
  },
  textSmall: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    overflow: 'hidden',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D83D38',
    paddingTop: 2,
  },
  logo: {
    width: 99,
    height: 60,
    marginBottom: 2,
    backgroundColor: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: width / 2,
    backgroundColor: '#ececec',
    paddingVertical: 4,
    borderColor: '#AFAFAF',
    borderWidth: 1 / PixelRatio.get(),
  },
});
