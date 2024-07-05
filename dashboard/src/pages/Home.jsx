import React from 'react'
import './css/Home.css'

export default function Home() {
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <>
            <div className="home">WELCOME 
            </div>
        </>
    )
}
