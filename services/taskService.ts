import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    getDocs,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Task {
    id?: string;
    userId: string;
    title: string;
    description: string;
    status: 'pending' | 'completed' | 'deferred';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    createdAt?: any;
}

export const taskService = {
    /**
     * Create a new task
     */
    createTask: async (task: Omit<Task, 'id' | 'createdAt'>) => {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), {
                ...task,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            return { id: docRef.id, ...task };
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    },

    /**
     * Get tasks for a specific user
     */
    getUserTasks: async (userId: string) => {
        try {
            const q = query(
                collection(db, 'tasks'),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Task[];
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error;
        }
    },

    /**
     * Update a task
     */
    updateTask: async (taskId: string, updates: Partial<Task>) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
            return { id: taskId, ...updates };
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    },

    /**
     * Delete a task
     */
    deleteTask: async (taskId: string) => {
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
            return true;
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    }
};
