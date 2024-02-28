import React from "react"
import { IIconPreset } from "../Icon"
import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";

export function Check({ width = 16, height = 16 }: IIconPreset) {
    const isDark = useSelector<TCombinedState, boolean>(state => state.mode.isDark);

    return (
        <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
            <g>
                <polygon fill={typeof window === 'object' && isDark ? '#CCCCCC' : '#333333'} points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587    289.878,367.055 512,144.945  " />
            </g>
        </svg>
    )
}