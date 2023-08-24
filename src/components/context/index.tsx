import { createContext, useContext, useEffect, useState } from 'react';
import { Settings } from '../../libs';
import { invokeRustFunction } from '../../libs/invoke-rust-fn';

interface IRootContext {
    settings: Settings
    getSettings: () => Promise<void>
}

const defaultSettings: Settings = {
    categories: [],
    authors: []
}
const defaultValue: IRootContext = {
    settings: defaultSettings,
    getSettings: () => { throw new Error('Not implemented') }
}
export const RootContext = createContext(defaultValue);

export const useRootContext = () => useContext(RootContext)

const useRootState = (): IRootContext => {
    const [settings, setSettings] = useState(defaultSettings)
    const getSettings = async () => {
        const currentSettings = await invokeRustFunction<Settings>('get_settings', {})
        setSettings(currentSettings)
    }
    useEffect(() => {
        getSettings()
    }, [])
    return { settings, getSettings }
}

export const RootContextProvider = ({ children }: { children: React.ReactNode }) => {
    const values = useRootState()
    return (
        <RootContext.Provider value={values}>
            {children}
        </RootContext.Provider>
    )
}