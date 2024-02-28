import React from "react"
import { IIconPreset } from "../Icon"
import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";

export function Stats({ width = 24, height = 24 }: IIconPreset) {
    const isDark = useSelector<TCombinedState, boolean>(state => state.mode.isDark);

    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="equalizer" clipPath="url(#clip0_21909_214)">
                <path id="Vector" d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill={typeof window === 'object' && isDark ? '#30C1DD' : '#DC3E22'} />
            </g>
            <defs>
                <clipPath id="clip0_21909_214">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}