'use client'

import React from 'react'
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

const AuthMiddleware = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            router.push('/signin');
        }
        });

        return () => unsubscribe();
    }, [router]);

  return (
    <div>

    </div>
  )
}

export default AuthMiddleware