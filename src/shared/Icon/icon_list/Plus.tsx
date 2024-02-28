import React from "react"
import { IIconPreset } from "../Icon"
import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";

export function Plus({ width = 50, height = 50 }: IIconPreset) {
    const isDark = useSelector<TCombinedState, boolean>(state => state.mode.isDark);

    return (
        <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill={isDark ? '#999999' : '#C4C4C4'} />
            <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill={isDark ? '#333333' : '#FFFFFF'} />
        </svg>
    )
}