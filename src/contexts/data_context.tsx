import React, { createContext, useEffect, useState, ReactNode } from "react";
import * as d3 from "d3";
import Dexie from "dexie";

// Assuming your data is an array of objects
type CsvDataType = Array<Record<string, unknown>>;
// Extending the type to include the columns array
type CsvDataWithColumnsType = {
    data: CsvDataType; // Original data array
    columns: string[]; // Array of column names
};

// Adjust the context type accordingly
type MyContextType = CsvDataWithColumnsType | null;

// Context type
// type MyContextType = CsvDataType | null;

// Create context with initial value as null
export const MyContext = createContext<MyContextType>(null);

const db = new Dexie("MyDatabase");
db.version(1).stores({
  csvData: "++id, data",
});

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [value, setValue] = useState<MyContextType>(null);
  // const [selectedTab, setSelectedTab] = useState<string>("intro");

  useEffect(() => {
    const loadData = async () => {
    let dataWithColumns: CsvDataWithColumnsType | null = null;
    const cachedData = await db.table("csvData").toArray();

    if (cachedData.length === 0) {
        // fetch and save to IndexedDB
        const response = await d3.csv("https://va-2.vercel.app/cleaned.csv");
        // Assuming response includes a columns property after fetching
        dataWithColumns = { data: response, columns: response.columns };
        await db.table("csvData").put({ data: response, columns: response.columns });
    } else {
        // Adjust based on how you store and retrieve the cached data
        console.log('Cached data: ',  cachedData)
        dataWithColumns = cachedData[0] as CsvDataWithColumnsType;
    }

    console.log("Context Value Set:", dataWithColumns);

    setValue(dataWithColumns);
};


    loadData();
  }, []);

  return <MyContext.Provider value={ value}>{children}</MyContext.Provider>;
};

// src/contexts/data_context.tsx