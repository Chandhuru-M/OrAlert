import Header from '@/components/Header';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/bg7.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🦷 ABOUT</Text>

          <View style={styles.item}>
            <Text style={styles.name}>🦠 Gingivitis</Text>
            <Text style={styles.desc}>
              Inflammation of the gums causing redness and swelling.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.name}>🦷 Hypodontia</Text>
            <Text style={styles.desc}>
              Congenital lack of one or more teeth in the mouth.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.name}>🧬 Oral Cancer</Text>
            <Text style={styles.desc}>
              Malignant growth or lesions in the oral cavity.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.name}>🧫 Dental Caries</Text>
            <Text style={styles.desc}>
              Decay of the tooth structure due to bacterial activity.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.name}>🪥 Calculus</Text>
            <Text style={styles.desc}>
              Hardened dental plaque accumulating on teeth.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.name}>😖 Mouth Ulcer</Text>
            <Text style={styles.desc}>
              Painful sores forming on the interior surface of the mouth.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.name}>🎨 Tooth Discoloration</Text>
            <Text style={styles.desc}>
              Staining or color change of the teeth due to various causes like diet, hygiene, or medication.
            </Text>
          </View>

          <Text style={styles.note}>
            ⚠️ Only these diseases can be predicted by the OrAlert application.{"\n"}
            Upload clear, cropped images of the affected area only.
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: 30,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#1e293b',
  },
  item: {
    marginBottom: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  desc: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  note: {
    marginTop: 30,
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
  },
});
