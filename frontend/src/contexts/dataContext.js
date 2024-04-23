const { createContext, useState } = require("react");

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [query,setQUery] = useState("");
    return (
        <DataContext.Provider value={{
            connectionStatus,
            setConnectionStatus,
            query,
            setQUery
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;