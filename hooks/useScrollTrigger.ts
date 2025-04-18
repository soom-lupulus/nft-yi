'use client'
import { useState, useEffect } from 'react';
import { throttle } from 'lodash/fp'

export default function useScrollTrigger(threshold = 10) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = throttle(150)(() => {
            console.log(6987);

            setScrolled(window.scrollY > threshold);
        });

        // 立即执行一次以检测初始状态
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return {
        scrolled
    };
}