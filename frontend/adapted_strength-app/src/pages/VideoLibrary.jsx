import logo from '../assets/logo.png';
import React from 'react';
import ReactPlayer from 'react-player'
import Footer from '../components/footer';
import PageContainer1 from "../components/PageContainer"

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

export default function VideoLibrary() {
    return (
        <PageContainer1 title='Video Library'>
        <div>
            <ReactPlayer consule url="https://youtu.be/YB-BbfJ699c"></ReactPlayer>
        </div>
        </PageContainer1>
    );
}