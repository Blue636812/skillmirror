import React from 'react';
import { LoginForm } from '../../components/LoginForm';

// Wraps the functionality of LoginForm into a page for routing
const SignIn: React.FC = () => {
    // State management is handled within LoginForm or by the parent Context
    // This wrapper ensures it's treated as a Page in the router
    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-100px)]">
            <LoginForm
                interactionState="idle"
                onInteractionChange={() => { }}
                onLoginSuccess={() => { }}
            />
            {/* Note: props are passed but state is largely internal or via Context now */}
        </div>
    );
};

export default SignIn;
