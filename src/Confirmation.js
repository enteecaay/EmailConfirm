import React, { useEffect, useState } from 'react';

const Confirmation = () => {
    const [message, setMessage] = useState('');

    // Function to get URL parameters
    const getUrlParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            email: params.get('email'),
            code: params.get('code')
        };
    };

    // Function to confirm email
    const confirmEmail = async (email, code) => {
        const response = await fetch(`https://localhost:7062/api/Account/ConfirmEmail/${email}/${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setMessage('Email confirmed successfully!');
        } else {
            setMessage('Email confirmation failed. Please try again.');
        }
    };

    // On component mount
    useEffect(() => {
        const { email, code } = getUrlParams();
        if (email && code) {
            confirmEmail(email, code);
        } else {
            setMessage('Invalid confirmation link.');
        }
    }, []);

    return (
        <div>
            <h1>Email Confirmation</h1>
            <p>{message}</p>
        </div>
    );
};

export default Confirmation;
