import { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom';

const VerifyEmail=()=>{
    const [searchParams]=useSearchParams();
    const token=searchParams.get("token");
    const [message,setMessage]=useState("Verifying your EMail");

    useEffect(()=>{
        const verifyEmail=async ()=>{
        if(!token){
            setMessage("Invalid verification link.");
            return;
        }

        try{
            const response= await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`,{
                method: 'GET'
            });
            const data=await response.json();
            if (response.ok) {
                setMessage("✅ Email verified successfully! You can now log in.");
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage("❌ Error verifying email. Please try again.");
        }};
        verifyEmail();
    },[token]);

    return(
        <div className="cont" style={{backgroundColor: 'orange', padding: '200px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: "center", gap: '30px'}}>
        <h2>Email Verification</h2>
        <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
