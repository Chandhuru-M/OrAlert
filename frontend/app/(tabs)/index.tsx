import Header from '@/components/Header';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image, ImageBackground, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


type Prediction = {
  prediction: string;
  confidence: string;
};

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const predictDisease = async () => {
    if (!image) {
      Alert.alert("No image selected", "Please select or take a photo first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    // Fetch the image as a blob
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append("image", blob, "oral.jpg");

      const apiResponse = await axios.post("https://oralert.onrender.com/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(apiResponse.data);
    } catch (error) {
      Alert.alert("Prediction Error", "Could not get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <ImageBackground
  source={require('../../assets/images/bg17.jpg')}
  style={styles.background}
  resizeMode="cover"
  >
    <View style={styles.overlay}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>🦷 HOME</Text>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>📁 Choose File</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>📷 Take Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.predictButton} onPress={predictDisease}>
          <Text style={styles.predictText}>Predict</Text>
        </TouchableOpacity>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Don’t upload full mouth image.{"\n"}
            Upload damaged part image only.{"\n"}
            Crop the image before uploading.
          </Text>
        </View>

        {image && (
          <View style={styles.imageContainer}>
            <Text style={styles.resultLabel}>📸 Selected Image:</Text>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </View>
        )}

        {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

        {prediction && (
  <View style={styles.resultContainer}>
    <Text style={styles.resultLabel}>🧾 Result:</Text>
    <Text style={styles.resultText}>
  Disease: <Text style={styles.diseaseName}>{prediction.prediction}</Text>
</Text>

    <Text style={styles.resultText}>Confidence: {prediction.confidence}</Text>

    <Text style={styles.resultLabel}>🩺 Recommendations:</Text>
    <Text style={styles.resultText}>
      {prediction.prediction === 'Gingivitis' && `• Brush twice a day with a soft-bristled toothbrush.\n• Use an antimicrobial mouthwash.\n• Floss daily.\n• Visit a dentist regularly.`}
      {prediction.prediction === 'Hypodontia' && `• Regular dental check-ups.\n• Consult for implants or bridges.\n• Maintain good oral hygiene.`}
      {prediction.prediction === 'Oral Cancer' && `• Avoid tobacco & limit alcohol.\n• Eat antioxidant-rich food.\n• Self-examine monthly.\n• Schedule screenings.`}
      {prediction.prediction === 'Caries' && `• Brush with fluoride toothpaste.\n• Limit sugary/acidic food.\n• Floss daily.\n• Consider fluoride treatment.`}
      {prediction.prediction === 'Calculus' && `• Brush and floss daily.\n• Use tartar-control toothpaste.\n• Dental cleanings every 6 months.`}
      {prediction.prediction === 'Mouth Ulcer' && `• Avoid spicy/acidic food.\n• Use saltwater rinses.\n• Soft brush hygiene.\n• Consult if persistent.`}
      {prediction.prediction === 'Discoloration' && `• Avoid coffee/tea/tobacco.\n• Brush after staining food.\n• Use whitening toothpaste.`}
    </Text>
  </View>
)}

{/* 
        <TouchableOpacity onPress={() => router.push("/about")} style={{ marginTop: 24 }}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Go to About Page →</Text>
        // </TouchableOpacity> */}
      </ScrollView>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: '#ffff',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.0)', 
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#0ea5e9',
    borderRadius: 10,
    padding: 12,
    width: '90%',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#e0f2fe',
  },
  buttonText: {
    fontSize: 16,
    color: '#0369a1',
    fontWeight: '500',
  },

  predictButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 10,
    padding: 12,
    width: '90%',
    alignItems: 'center',
    marginVertical: 16,
  },

  predictText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    width: '90%',
  },

  warningText: {
    color: '#92400e',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagePreview: {
    width: 260,
    height: 260,
    borderRadius: 12,
    marginTop: 10,
  },
  resultContainer: {
    backgroundColor: '#ecfdf5',
    borderColor: '#34d399',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: '90%',
    alignItems: 'flex-start',
  },

  resultLabel: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#065f46',
  },

  resultText: {
    fontSize: 20,
    marginBottom: 4,
  },
  diseaseName: {
  color: '#dc2626', 
  fontWeight: 'bold',
},
});
