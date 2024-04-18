const { createContext, useState } = require("react");

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [connectionStatus, setConnectionStatus] = useState(false);
    return (
        <DataContext.Provider value={{
            connectionStatus,
            setConnectionStatus
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;