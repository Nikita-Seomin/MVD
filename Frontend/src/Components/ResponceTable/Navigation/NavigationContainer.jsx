import React, {useEffect} from "react";
import {useState} from "react/cjs/react.development";
import {respTableRows} from "../../../AxiosAPI/RespTableRows";
import Navigation from "./Navigation";


const NavigationContainer = () => {

    const [containerState, setContainerState] = useState({
        loading: true,
        rows: [],
    })

    useEffect(
        () => {
            setContainerState({loading: true})
            respTableRows.getRows('root2').then(data => {
                setContainerState({
                    loading: false,
                    rows: data
                });
            })
        },
        [setContainerState]
    )


    if (!containerState.loading) return <Navigation rows={containerState.rows} />
    else return <h1>Подождите, данные загружаются!</h1>

}

export default NavigationContainer
