import React from 'react';
import Hero from '../../components/Hero';
import Header from '../../components/Header';
import Recommended from '../../components/Recomendar';
import './Styles.css';

export default function HomePage() {
    return (
        <div>
            <Header />
            <Hero />
            <Recommended /> 
        </div>
    )   
}

