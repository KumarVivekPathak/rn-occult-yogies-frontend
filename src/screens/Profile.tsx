import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserProfile, logout, updateUserProfile } from '../service/APIFunctions';
import { UserDTO } from '../service/types';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import { z, ZodError } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../../navigation/types';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits').max(10, 'Mobile number must be at most 10 digits'),
});

type ProfileErrors = {
  name?: string;
  mobileNumber?: string;
  general?: string;
};

const Profile = () => {
  const navigation = useNavigation<RootStackNavigation>(); 
    const {token} = useAuth();
    const [userData, setUserData] = useState<UserDTO>({
        id: '',
        name: '',
        email: '',
        creationDate: '',
        mobileNumber: '',
    });
    const [errors, setErrors] = useState<ProfileErrors>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getDateString = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const getUserDetails = async() =>{
        try {
            const response = await getUserProfile(token || '');
            const responseData = response.data.user;
            const creationDate =  getDateString(responseData.created_at);
            const userDataObj : UserDTO = {
                  id: responseData.id,
                  name: responseData.name || '',
                  email: responseData.email || '',
                  creationDate: creationDate || '',
                  mobileNumber: responseData.mobileNumber || '',
            }
            setUserData(userDataObj); 
        } catch (error) {
            console.log(error);
        }
    }

    const validateProfile = () => {
      try {
        profileSchema.parse({ name: userData.name, mobileNumber: userData.mobileNumber || '' });
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          const zodError = error as ZodError;
          const fieldErrors: ProfileErrors = {};
          (zodError.issues as Array<{ path: (keyof ProfileErrors)[], message: string }>).forEach((err) => {
            const field = err.path[0];
            if (field) {
              fieldErrors[field] = err.message;
            }
          });
          setErrors(fieldErrors);
        }
        return false;
      }
    };

    const handleUpdateProfile = async () => {
      if (!validateProfile()) return;
      setLoading(true);
      try {
        const body = {
                name: userData.name,
                email: userData.email,
                phone: userData.mobileNumber || '', 
        }
        const responseData = await updateUserProfile(token || '', body);
        console.log("respons of profile update is : ",responseData);
        Alert.alert('Profile updated successfully!');
        setErrors({});
      } catch (error) {
        Alert.alert('Failed to update profile. Please try again.');
        setErrors({ general: 'Failed to update profile. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    const handleLogout = async () => {
      try {
        const responseData = await logout(token || '');
        console.log("respons of logout is : ",responseData);
        Alert.alert('Logout successfully!');
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 2000);
      } catch (error) {
        Alert.alert('Failed to logout. Please try again.');
      }
    }

    return (
        <SafeAreaView  style={styles.container}>
             <KeyboardAvoidingView
                   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                 > 
                 <View style={styles.profileImage}>
                    <Text style={styles.profileName}>{userData?.name?.charAt(0)?.toUpperCase() || ''}</Text>
                 </View>

                <CustomInput
                    label="Name"
                    value={userData.name}
                    onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
                    containerStyle={styles.input}
                    error={errors.name}
                />
                <CustomInput
                    label="Email"
                    value={userData.email}
                    disabled
                    containerStyle={styles.input}
                />
                <CustomInput
                    label="Mobile Number"
                    value={userData.mobileNumber || ''}
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={(text) => setUserData(prev => ({ ...prev, mobileNumber: text }))}
                    containerStyle={styles.input}
                    error={errors.mobileNumber}
                />
                <CustomInput
                    label="Creation Date"
                    value={userData.creationDate}
                    disabled
                    containerStyle={styles.input}
                />   

                <CustomButton
                    title={loading ? 'Updating...' : 'Update Profile'}
                    onPress={handleUpdateProfile}
                    style={{marginTop : 8}}
                    loading={loading}
                />


                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
               </KeyboardAvoidingView>  
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    paddingHorizontal: 24
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'magenta',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    profileName: {
        fontSize: 48,
        fontWeight: '500',
        color : '#fff',
        alignSelf:'center',
    
    },
    input: {
        marginVertical: 8,
    },
    errorText: {
      color: 'red',
      marginTop: 5,
    },
    successText: {
      color: 'green',
      marginTop: 5,
    },
    logoutButton: {
      marginTop: 40,
      alignItems: 'center',
    },
    logoutText: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });