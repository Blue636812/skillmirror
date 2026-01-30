import React from 'react';
import { SignUpForm } from '../../components/SignUpForm';

const SignUp: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-100px)]">
            <SignUpForm />
        </div>
    );
};

export default SignUp;
