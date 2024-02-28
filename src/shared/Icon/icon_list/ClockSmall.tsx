import React from "react"
import { IIconPreset } from "../Icon"
import { useSelector } from "react-redux"
import { TCombinedState } from "../../redux_store/store"

export function ClockSmall({ width = 24, height = 24 }: IIconPreset) {
    const isDark = useSelector<TCombinedState, boolean>(state => state.mode.isDark);

    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

            <g id="SVGRepo_iconCarrier"> <path d="M3 5.5L5 3.5M21 5.5L19 3.5M9 12.5L11 14.5L15 10.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke={typeof window === 'object' && isDark ? '#30C1DD' : '#DC3E22'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>

        </svg>
    )
}
