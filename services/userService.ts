import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface UserPreferences {
    voiceEnabled: boolean;
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
}

export const userService = {
    /**
     * Update general user profile data
     */
    updateProfile: async (uid: string, data: any) => {
        try {
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, {
                ...data,
                updatedAt: new Date()
            });
            return { success: true };
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    },

    /**
     * Update specific user preferences
     */
    updatePreferences: async (uid: string, preferences: Partial<UserPreferences>) => {
        try {
            const userRef = doc(db, 'users', uid);
            // using dot notation for nested fields if they are nested, 
            // but for now let's assume they are top-level or under a 'preferences' map
            // Based on Implementation Plan, they are under a 'preferences' object.

            // We need to construct the update object to target nested fields
            const updates: any = {};
            Object.keys(preferences).forEach(key => {
                updates[`preferences.${key}`] = preferences[key as keyof UserPreferences];
            });
            updates['updatedAt'] = new Date();

            await updateDoc(userRef, updates);
            return { success: true };
        } catch (error) {
            console.error("Error updating preferences:", error);
            throw error;
        }
    },

    /**
     * Get user profile
     */
    getUserProfile: async (uid: string) => {
        try {
            const userRef = doc(db, 'users', uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw error;
        }
    }
};
