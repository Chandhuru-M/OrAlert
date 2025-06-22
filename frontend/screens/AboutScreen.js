import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About</Text>

      <View style={styles.item}>
        <Text style={styles.name}>Gingivitis</Text>
        <Text style={styles.desc}>Inflammation of the gums causing redness and swelling.</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.name}>Hypodontia</Text>
        <Text style={styles.desc}>Congenital lack of one or more teeth in the mouth.</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.name}>Oral Cancer</Text>
        <Text style={styles.desc}>Malignant growth or lesions in the oral cavity.</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.name}>Dental Caries</Text>
        <Text style={styles.desc}>Decay of the tooth structure due to bacterial activity.</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.name}>Calculus</Text>
        <Text style={styles.desc}>Hardened dental plaque accumulating on teeth.</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.name}>Mouth Ulcer</Text>
        <Text style={styles.desc}>Painful sores forming on the interior surface of the mouth.</Text>
      </View>

      <Text style={styles.note}>
        ⚠️ Only these diseases can be predicted by the OrAlert application. Please upload cropped images of the affected area only.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  desc: {
    fontSize: 15,
    color: '#334155',
  },
  note: {
    fontSize: 14,
    marginTop: 24,
    color: '#dc2626',
    textAlign: 'center',
  },
});
