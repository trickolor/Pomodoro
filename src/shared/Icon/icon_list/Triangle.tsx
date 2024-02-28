import React from "react"
import { IIconPreset } from "../Icon"
import { useSelector } from "react-redux";
import { TCombinedState } from "../../redux_store/store";

export function Triangle({ width = 10, height = 10 }: IIconPreset) {
    const isDark = useSelector<TCombinedState, boolean>(state => state.mode.isDark);

    return (
        <svg width={width} height={height} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
            fill={typeof window === 'object' && isDark ? '#333333' : '#FFFFFF'}
            stroke={typeof window === 'object' && isDark ? '#333333' : '#FFFFFF'}
            transform="rotate(90)">

            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

            <g id="SVGRepo_iconCarrier"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="drop" fill={typeof window === 'object' && isDark ? '#333333' : '#FFFFFF'} transform="translate(32.000000, 42.666667)"> <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape"> </path> </g> </g> </g>

        </svg>
    )
}