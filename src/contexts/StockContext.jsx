import { createContext, useState } from "react";
import PropTypes, { object } from "prop-types"

export const StockContext = createContext({});

StockContextProvider.propTypes = {
    children: PropTypes.node
  };

export function StockContextProvider({ children }){
    const [items, setItems] = useState(() => {

        const storedItems = localStorage.getItem('obc-react-stock');

        if(!storedItems) return [];

        const items = JSON.parse(storedItems);

        items.forEach(element => {
            element.createdAt = new Date(element.createdAt);
            element.updatedAt = new Date(element.updatedAt);
        });

        return items;
    })

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId);
    }

    const addItem = (item) => {
        setItems(currentState => {
            
            const updatedItems = [item, ...currentState];
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems));
            return updatedItems;
        })
    }

    const updateItem = (itemId, newAttributes) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === +itemId);
            const updatedItems = [...currentState];
            Object.assign(updatedItems[itemIndex], newAttributes, { updatedAt: new Date() });
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems));
            return updatedItems;
        })
    }
    
    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId);
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems));
            return updatedItems;
        })
    }

    const stock = {
        items,
        getItem,
        addItem,
        updateItem,
        deleteItem
    }

    return(
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}