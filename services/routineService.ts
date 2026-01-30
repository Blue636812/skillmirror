import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface RoutineStep {
    task: string;
    time: string; // "HH:MM"
    duration?: number; // minutes
}

export interface Routine {
    id?: string;
    userId: string;
    name: string;
    steps: RoutineStep[];
    isActive: boolean;
    createdAt?: any;
}

export const routineService = {
    /**
     * Create a new routine
     */
    createRoutine: async (routine: Omit<Routine, 'id' | 'createdAt'>) => {
        try {
            const docRef = await addDoc(collection(db, 'routines'), {
                ...routine,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            return { id: docRef.id, ...routine };
        } catch (error) {
            console.error("Error creating routine:", error);
            throw error;
        }
    },

    /**
     * Get routines for a specific user
     */
    getUserRoutines: async (userId: string) => {
        try {
            const q = query(
                collection(db, 'routines'),
                where('userId', '==', userId)
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Routine[];
        } catch (error) {
            console.error("Error fetching routines:", error);
            throw error;
        }
    },

    /**
     * Update a routine
     */
    updateRoutine: async (routineId: string, updates: Partial<Routine>) => {
        try {
            const routineRef = doc(db, 'routines', routineId);
            await updateDoc(routineRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
            return { id: routineId, ...updates };
        } catch (error) {
            console.error("Error updating routine:", error);
            throw error;
        }
    },

    /**
     * Delete a routine
     */
    deleteRoutine: async (routineId: string) => {
        try {
            await deleteDoc(doc(db, 'routines', routineId));
            return true;
        } catch (error) {
            console.error("Error deleting routine:", error);
            throw error;
        }
    }
};
