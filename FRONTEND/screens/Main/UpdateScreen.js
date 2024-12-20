import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button';
import { COLORS } from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';
import { getFormulaires, updateFormulaire, createFormulaire } from '../../services/apiService';
import { useUser } from '../../services/Usercontext';
import { v4 as uuidv4 } from 'uuid'; // Import UUID pour générer des IDs uniques

const UpdateScreen = ({ navigation }) => {
    const { userId } = useUser(); // Identifiant de l'utilisateur connecté
    const [loading, setLoading] = useState(true);
    const [formulaireId, setFormulaireId] = useState(null); // ID du formulaire (null par défaut)
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [trimester, setTrimester] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [supplements, setSupplements] = useState('');
    const [doctorRemarks, setDoctorRemarks] = useState('');
    const [specialDiet, setSpecialDiet] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const formData = await getFormulaires(); // Charger tous les formulaires
                console.log('Form data:', userId);
                const userForm = formData.find(form => form.utilisateur === userId); // Trouver le formulaire de l'utilisateur

                if (userForm) {
                    // Si un formulaire existe, charger ses données
                    setFormulaireId(userForm._id);
                    setHeight(userForm.taille || '');
                    setWeight(userForm.poidsActuel || '');
                    setTrimester(userForm.trimestre || '');
                    setActivityLevel(userForm.ActivitePhysique || '');
                    setSupplements(userForm.recommandations || '');
                    setDoctorRemarks(userForm.doctorRemarks || '');
                    setSpecialDiet(userForm.regimeSpecial || '');
                } else {
                    // Sinon, préparer un nouveau formulaire
                    setFormulaireId(uuidv4()); // Générer un ID unique
                }
            } catch (error) {
                console.error('Error fetching form data:', error);
                alert('Failed to load data. Please try again.');
            }
            setLoading(false);
        };

        fetchInitialData();
    }, [userId]);

    const handleSubmit = async () => {
        const formData = {
            _id: formulaireId,
            utilisateur: userId,
            taille: height,
            poidsActuel: weight,
            trimestre: trimester,
            ActivitePhysique: activityLevel,
            recommandations: supplements,
            doctorRemarks: doctorRemarks,
            regimeSpecial: specialDiet,
        };

        try {
            if (formulaireId) {
                // Mise à jour ou création selon l'état du formulaire
                const existingForm = await getFormulaires(); // Recharger les formulaires pour vérifier
                const isExisting = existingForm.some(form => form._id === formulaireId);

                if (isExisting) {
                    await updateFormulaire(formulaireId, formData); // Mise à jour
                } else {
                    await createFormulaire(formData); // Création
                }
            }
            alert('Information saved successfully!');
            navigation.navigate('Main');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to save data. Please try again.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={COLORS.primary.dark} />;
    }

    return (
        <LinearGradient
            colors={COLORS.gradients.background.colors}
            locations={COLORS.gradients.background.locations}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.header}>
                <Header date="2 May, Monday" navigation={navigation} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.filterContainer}>
                    <Text style={styles.title}>Your information</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Height</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="in cm"
                            value={height}
                            onChangeText={setHeight}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Weight</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="in Kg"
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Pregnancy trimester</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={trimester}
                                onValueChange={(itemValue) => setTrimester(itemValue)}
                                style={styles.picker}
                            >

                                <Picker.Item label="First trimester" value="1" />
                                <Picker.Item label="Second trimester" value="2" />
                                <Picker.Item label="Third trimester" value="3" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Regular physical activity level</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={activityLevel}
                                onValueChange={(itemValue) => setActivityLevel(itemValue)}
                                style={styles.picker}
                            >

                                <Picker.Item label="Sedentary" value="sedentary" />
                                <Picker.Item label="Light" value="light" />
                                <Picker.Item label="Moderate" value="moderate" />
                                <Picker.Item label="Active" value="active" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nutritional supplements taken</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter supplements"
                            value={supplements}
                            onChangeText={setSupplements}
                            multiline
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Doctor's Remarks</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter remarks"
                            value={doctorRemarks}
                            onChangeText={setDoctorRemarks}
                            multiline
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Special Diet</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={specialDiet}
                                onValueChange={(itemValue) => setSpecialDiet(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="No special diet" value="" />
                                <Picker.Item label="Diabetic" value="diabetic" />
                                <Picker.Item label="Gluten Free" value="glutenFree" />
                                <Picker.Item label="Lactose Free" value="lactoseFree" />
                                <Picker.Item label="Vegan" value="vegan" />
                            </Picker>
                        </View>
                    </View>

                    <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary.dark,
        marginBottom: 20,
        textAlign: 'center',
    },
    header: {
        marginTop: 15,
    },
    filterContainer: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        backgroundColor: 'white',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        backgroundColor: 'white',
    },
    picker: {
        height: 50,
    },
    submitButton: {
        marginTop: 20,
    },
});

export default UpdateScreen;