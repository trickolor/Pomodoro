import React from "react"
import { IIconPreset } from "../Icon"
import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";

export function Arrow({ width = 16, height = 10 }: IIconPreset) {
    const isDark = useSelector<TCombinedState, boolean>(state => state.mode.isDark);

    return (
        <svg width={width} height={height} viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Rectangle 2" d="M1 9L8 2L15 9" stroke={typeof window === 'object' && isDark ? '#30C1DD' : '#DC3E22'} strokeWidth="2" />
        </svg>
    )
}